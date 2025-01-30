package models

type User struct {
	Base
	Username	string 	`json:"username" gorm:"text;not null"`
	Email		string	`json:"email" gorm:"text;not null"`
	Role      	*int 	`json:"role" gorm:"type:int;default:2;not null"`
	Password 	string  `json:"-"` //Do not compute the password in json
}