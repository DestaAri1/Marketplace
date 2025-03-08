package models

import "context"

type Address struct {
	Base
	UserId     int    `json:"user_id"`
	User       User   `json:"user"`
	ProvinceId string `json:"province_id"`
	RegencyId  string `json:"regency_id"`
	DistrictId string `json:"district_id"`
	VillageId  string `json:"village_id"`
	Datils	   string `json:"details,omitempty" gorm:"type:text"`
}

type AddressResponse struct {
	Provinces []ProvinceWithRegencies `json:"provinces"`
}

type ProvinceWithRegencies struct {
	Id        string              `json:"id"`
	Name      string              `json:"name"`
}

type RegencyWithDistricts struct {
	Id        string             `json:"id"`
	Name      string             `json:"name"`
}

type DistrictWithVillages struct {
	Id       string    `json:"id"`
	Name     string    `json:"name"`
}

type Villages struct {
	Id		string	`json:"id"`
	Name	string	`json:"name"`
}

type AddressRepository interface {
	GetProvinces(context context.Context) ([]ProvinceWithRegencies, error)
	GetRegenciesByProvince(context context.Context, provinceId string) ([]RegencyWithDistricts, error)
	GetDistrictsByRegency(context context.Context, regencyId string) ([]DistrictWithVillages, error)
	GetVillagesByDistrict(context context.Context, districtId string) ([]Villages, error)
}