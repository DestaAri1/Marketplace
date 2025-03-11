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

func (r *AddressRepository) GetAllAddress(context context.Context, userId uint)([]*models.AddressResponse, error) {
	address := []*models.AddressResponse{}

	res := r.db.
		Table("addresses a").
		Select("a.id as id, a.sender as sender, a.reciver as recipient, " +
			"p.name as province, r.name as regency, d.name as district, v.name as village, " +
			"a.status as status, a.datils as details").
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

func (r *AddressRepository) CreateAddress(context context.Context, formData *models.FormAddress, userId uint) error {
	address := &models.Address{}

	tx := r.db.Begin()

	if tx.Error != nil {
		return tx.Error
	}
	
	if formData.Status != nil && *formData.Status {
		getData := tx.Where("status = ? AND user_id = ?", true, userId).First(&address)

		if errors.Is(getData.Error, gorm.ErrRecordNotFound) {
			// Tidak ada data dengan status true, lanjutkan
		} else if getData.Error != nil {
			tx.Rollback()
			return getData.Error
		} else if address.Id != 0 { // Pastikan ada data valid sebelum update
			tx.Model(&models.Address{}).Where("id = ?", address.Id).Update("status", false)
		}
	}

	res := tx.Create(&models.Address{
		Sender: formData.Sender,
		Reciver: formData.Recipient,
		Status: *formData.Status,
		UserId: int(userId),
		ProvinceId: formData.Province,
		RegencyId: formData.Regency,
		DistrictId: formData.District,
		VillageId: formData.Village,
		Datils: formData.Details,
	})

	if res.Error != nil {
		return res.Error
	}

	tx.Commit()
	return nil
}

func (r *AddressRepository) UpdateAddress(context context.Context, formData *models.FormAddress, addressId uint) error {
	return nil
}

func (r *AddressRepository) UpdateStatusAddress(context context.Context, formData *models.FormStatusAddress, addressId uint) error {
	return nil
}

func (r *AddressRepository) DeleteAddress(context context.Context, addressId uint) error {
	return nil
}

func NewAddressRepository(db *gorm.DB) models.AddressRepository{
	return &AddressRepository{
		db: db,
	}
}