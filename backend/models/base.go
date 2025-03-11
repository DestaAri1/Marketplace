package models

import "time"

type Base struct {
	Id        uint      `json:"id" gorm:"primarykey"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type BaseRepository interface {
	IsValidID(tableName string, id string) bool
}