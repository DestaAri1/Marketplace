package models

type User struct {
	Base
	Username	string 	`json:"username" gorm:"text;not null"`
	Email		string	`json:"email" gorm:"text;not null"`
	Role      	string 	`gorm:"type:enum('0','1','2');default:2" json:"role"`
	Password 	string  `json:"-"` //Do not compute the password in json
}