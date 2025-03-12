package repository

import (
	"context"
	"errors"

	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type AddressRepository struct {
	db *gorm.DB
}

func NewAddressRepository(db *gorm.DB) models.AddressRepository {
	return &AddressRepository{db: db}
}

func (r *AddressRepository) GetAllAddress(ctx context.Context, userId uint) ([]*models.AddressResponse, error) {
	address := []*models.AddressResponse{}

	res := r.db.
		Table("addresses a").
		Select("a.id as id, a.sender as sender, a.reciver as recipient, " +
			"p.name as province, r.name as regency, d.name as district, v.name as village, " +
			"a.status as status, a.details as details").
		Joins("LEFT JOIN provinces p ON p.id = a.province_id COLLATE utf8mb4_unicode_ci").
		Joins("LEFT JOIN regencies r ON r.id = a.regency_id COLLATE utf8mb4_unicode_ci").
		Joins("LEFT JOIN districts d ON d.id = a.district_id COLLATE utf8mb4_unicode_ci").
		Joins("LEFT JOIN villages v ON v.id = a.village_id COLLATE utf8mb4_unicode_ci").
		Where("a.user_id = ?", userId).
		Scan(&address)

	if res.Error != nil {
		return nil, res.Error
	}

	return address, nil
}

// setAddressAsMain mengatur alamat tertentu sebagai alamat utama dan semua alamat lain menjadi non-utama
func (r *AddressRepository) setAddressAsMain(tx *gorm.DB, userId, addressId uint) error {
	// Set semua alamat user menjadi non-utama
	if err := tx.Model(&models.Address{}).
		Where("user_id = ?", userId).
		Update("status", false).Error; err != nil {
		return err
	}

	// Set alamat yang dipilih menjadi utama
	if err := tx.Model(&models.Address{}).
		Where("id = ?", addressId).
		Update("status", true).Error; err != nil {
		return err
	}

	return nil
}

// ensureOneMainAddress memastikan selalu ada minimal satu alamat utama
func (r *AddressRepository) ensureOneMainAddress(tx *gorm.DB, userId uint) error {
	var count int64
	tx.Model(&models.Address{}).
		Where("user_id = ? AND status = ?", userId, true).
		Count(&count)

	if count == 0 {
		// Jika tidak ada alamat utama, ambil alamat pertama dan jadikan utama
		var firstAddress models.Address
		if err := tx.Where("user_id = ?", userId).First(&firstAddress).Error; err == nil {
			return tx.Model(&models.Address{}).
				Where("id = ?", firstAddress.Id).
				Update("status", true).Error
		}
	}

	return nil
}

func (r *AddressRepository) CreateAddress(ctx context.Context, formData *models.FormAddress, userId uint) error {
	tx := r.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Buat alamat baru
	newAddress := models.Address{
		Sender:     formData.Sender,
		Reciver:    formData.Recipient,
		Status:     false, // Default false, akan diubah nanti jika perlu
		UserId:     int(userId),
		ProvinceId: formData.Province,
		RegencyId:  formData.Regency,
		DistrictId: formData.District,
		VillageId:  formData.Village,
		Details:    formData.Details,
	}

	if err := tx.Create(&newAddress).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Jika status true atau belum ada alamat utama, jadikan alamat ini sebagai utama
	if formData.Status != nil && *formData.Status {
		if err := r.setAddressAsMain(tx, userId, uint(newAddress.Id)); err != nil {
			tx.Rollback()
			return err
		}
	} else {
		// Pastikan selalu ada minimal satu alamat utama
		if err := r.ensureOneMainAddress(tx, userId); err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit().Error
}

func (r *AddressRepository) UpdateStatusAddress(ctx context.Context, formData *models.FormStatusAddress, addressId, userId uint) error {
	tx := r.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Pastikan alamat ada dan milik user yang benar
	var address models.Address
	if err := tx.Where("id = ? AND user_id = ?", addressId, userId).First(&address).Error; err != nil {
		tx.Rollback()
		return err
	}

	if *formData.Status {
		// Set alamat ini sebagai utama
		if err := r.setAddressAsMain(tx, userId, addressId); err != nil {
			tx.Rollback()
			return err
		}
	} else if address.Status {
		// Jika ingin mengubah alamat utama menjadi non-utama
		var count int64
		tx.Model(&models.Address{}).
			Where("user_id = ? AND status = ?", userId, true).
			Count(&count)

		if count <= 1 {
			tx.Rollback()
			return errors.New("You need 1 main address")
		}


		if err := tx.Model(&models.Address{}).
			Where("id = ?", addressId).
			Update("status", false).Error; err != nil {
			tx.Rollback()
			return err
		}

		// Pastikan masih ada alamat utama
		if err := r.ensureOneMainAddress(tx, userId); err != nil {
			tx.Rollback()
			return err
		}
	} else {
		tx.Rollback()
		return errors.New("alamat ini sudah berstatus non-utama")
	}

	return tx.Commit().Error
}

func (r *AddressRepository) UpdateAddress(ctx context.Context, formData *models.FormAddress, addressId, userId uint) error {
	tx := r.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Pastikan alamat ada dan milik user yang benar
	var address models.Address
	if err := tx.Where("id = ? AND user_id = ?", addressId, userId).First(&address).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Buat map untuk update
	updateMap := map[string]interface{}{
		"sender":      formData.Sender,
		"reciver":     formData.Recipient,
		"province_id": formData.Province,
		"regency_id":  formData.Regency,
		"district_id": formData.District,
		"village_id":  formData.Village,
		"details":     formData.Details,
	}

	// Update alamat
	if err := tx.Model(&models.Address{}).Where("id = ?", addressId).Updates(updateMap).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Jika status ingin diubah
	if formData.Status != nil {
		newStatus := *formData.Status
		currentStatus := address.Status

		if newStatus && !currentStatus {
			// Jadikan alamat ini sebagai utama
			if err := r.setAddressAsMain(tx, userId, addressId); err != nil {
				tx.Rollback()
				return err
			}
		} else if !newStatus && currentStatus {
			// Cek apakah ini alamat utama satu-satunya
			var count int64
			tx.Model(&models.Address{}).
				Where("user_id = ? AND status = ?", userId, true).
				Count(&count)

			if count <= 1 {
				tx.Rollback()
				return errors.New("You need 1 main address")
			}

			// Ubah status menjadi false
			if err := tx.Model(&models.Address{}).
				Where("id = ?", addressId).
				Update("status", false).Error; err != nil {
				tx.Rollback()
				return err
			}

			// Pastikan masih ada alamat utama
			if err := r.ensureOneMainAddress(tx, userId); err != nil {
				tx.Rollback()
				return err
			}
		}
	}

	return tx.Commit().Error
}

func (r *AddressRepository) DeleteAddress(ctx context.Context, addressId uint, userId uint) error {
	address := &models.Address{}

	tx := r.db.Begin()

	find := tx.Where("id = ? AND user_id = ?", addressId, userId).First(address)

	if find.Error != nil {
		if find.Error == gorm.ErrRecordNotFound {
			tx.Rollback()
			return errors.New("cart not found")
		}
		tx.Rollback()
		return find.Error
	}

	if err := tx.Delete(address).Error; err != nil {
		tx.Rollback()
		return err
	}

	var count int64
	tx.Model(&models.Address{}).
		Where("user_id = ? AND status = ?", userId, true).
		Count(&count)

	if count == 0 {
		// Jika tidak ada, cari alamat pertama user yang tersedia
		var newAddress models.Address
		check := tx.Where("user_id = ?", userId).Order("id ASC").First(&newAddress)

		// Jika ada alamat lain, update status menjadi true
		if check.Error == nil {
			tx.Model(&newAddress).Update("status", true)
		}
	}

	tx.Commit()

	return nil
}