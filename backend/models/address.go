package models

import "context"

type Address struct {
	Base
	Sender	   string `json:"sender"`
	Reciver	   string `json:"recive"`
	Status	   bool	  `json:"status" gorm:"default:0"`
	UserId     int    `json:"user_id"`
	User       User   `json:"user"`
	ProvinceId string `json:"province_id"`
	RegencyId  string `json:"regency_id"`
	DistrictId string `json:"district_id"`
	VillageId  string `json:"village_id"`
	Datils	   string `json:"details,omitempty" gorm:"type:text"`
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

type RegionalAddressRepository interface {
	GetProvinces(context context.Context) ([]ProvinceWithRegencies, error)
	GetRegenciesByProvince(context context.Context, provinceId string) ([]RegencyWithDistricts, error)
	GetDistrictsByRegency(context context.Context, regencyId string) ([]DistrictWithVillages, error)
	GetVillagesByDistrict(context context.Context, districtId string) ([]Villages, error)
}

type AddressResponse struct {
	Id		  uint	  `json:"id"`
	Sender	  string  `json:"sender"`
	Reciver	  string  `json:"reciver"`
	Province  string  `json:"province"`	
	Regency	  string  `json:"regency"`
	District  string  `json:"district"`
	Village	  string  `json:"village"`
	Details	  string  `json:"details"`
	Status	  bool	  `json:"status"`
}

type AddressStatus int

const (
	Main  AddressStatus = 1
	Side  AddressStatus = 0
)

type FormAddress struct {
	Sender	  string  `json:"sender"`
	Reciver	  string  `json:"reciver"`
	Province  string  `json:"province"`	
	Regency	  string  `json:"regency"`
	District  string  `json:"district"`
	Village	  string  `json:"village"`
	Details	  string  `json:"details"`
	Status	  bool	  `json:"status"`
}

type FormStatusAddress struct {
	Status	  bool	  `json:"status"`
}

type AddressRepository interface {
	GetAllAddress(context context.Context) ([]*AddressResponse, error)
	CreateAddress(context context.Context, formData *FormAddress) error
	UpdateAddress(context context.Context, formData *FormAddress) error
	UpdateStatusAddress(context context.Context, formData *FormStatusAddress) error
	DeleteAddress(context context.Context, addressId uint) error
}