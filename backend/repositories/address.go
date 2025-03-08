package repository

import (
	"context"

	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type AddressRepository struct {
	db *gorm.DB
}

func (r *AddressRepository) GetProvinces(context context.Context) ([]models.ProvinceWithRegencies, error) {
	var provinces []models.Province
	err := r.db.Find(&provinces).Error
	if err != nil {
		return nil, err
	}

	result := make([]models.ProvinceWithRegencies, len(provinces))
	for i, province := range provinces {
		result[i] = models.ProvinceWithRegencies{
			Id:   province.Id,
			Name: province.Name,
		}
	}
	return result, nil
}

func (r *AddressRepository) GetRegenciesByProvince(context context.Context, provinceId string) ([]models.RegencyWithDistricts, error) {
	var regencies []models.Regency
	err := r.db.Where("province_id = ?", provinceId).Find(&regencies).Error
	if err != nil {
		return nil, err
	}

	result := make([]models.RegencyWithDistricts, len(regencies))
	for i, regency := range regencies {
		result[i] = models.RegencyWithDistricts{
			Id:   regency.Id,
			Name: regency.Name,
		}
	}
	return result, nil
}

func (r *AddressRepository) GetDistrictsByRegency(context context.Context, regencyId string) ([]models.DistrictWithVillages, error) {
	var districts []models.District
	err := r.db.Where("regency_id = ?", regencyId).Find(&districts).Error
	if err != nil {
		return nil, err
	}

	result := make([]models.DistrictWithVillages, len(districts))
	for i, district := range districts {
		result[i] = models.DistrictWithVillages{
			Id:   district.Id,
			Name: district.Name,
		}
	}
	return result, nil
}

func (r *AddressRepository) GetVillagesByDistrict(context context.Context, districtId string) ([]models.Villages, error) {
	var villages []models.Village
	err := r.db.Where("district_id = ?", districtId).Find(&villages).Error
	if err != nil {
		return nil, err
	}

	result := make([]models.Villages, len(villages))
	for i, village := range villages {
		result[i] = models.Villages{
			Id:   village.Id,
			Name: village.Name,
		}
	}
	return result, nil
}

func NewAddressRepository(db *gorm.DB) *AddressRepository {
	return &AddressRepository{
		db: db,
	}
}