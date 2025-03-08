package models

type Province struct {
	Id   string `json:"id" gorm:"column:id;type:CHAR(2);primaryKey"`
	Name string `json:"name" gorm:"column:name;type:VARCHAR(255) NOT NULL"`
}

type Regency struct {
	Id         string   `json:"id" gorm:"column:id;type:CHAR(4);primaryKey"`
	ProvinceId string   `json:"province_id" gorm:"column:province_id;type:CHAR(2) NOT NULL;index"`
	Province   Province `json:"province" gorm:"foreignKey:ProvinceId"`
	Name       string   `json:"name" gorm:"column:name;type:VARCHAR(255) NOT NULL"`
}

type District struct {
	Id        string  `json:"id" gorm:"column:id;type:CHAR(7);primaryKey"`
	RegencyId string  `json:"regency_id" gorm:"column:regency_id;type:CHAR(4) NOT NULL;index"`
	Regency   Regency `json:"regency" gorm:"foreignKey:RegencyId"`
	Name      string  `json:"name" gorm:"column:name;type:VARCHAR(255) NOT NULL"`
}

type Village struct {
	Id         string   `json:"id" gorm:"column:id;type:CHAR(10);primaryKey"`
	DistrictId string   `json:"district_id" gorm:"column:district_id;type:CHAR(7) NOT NULL;index"`
	District   District `json:"district" gorm:"foreignKey:DistrictId"`
	Name       string   `json:"name" gorm:"column:name;type:VARCHAR(255) NOT NULL"`
}