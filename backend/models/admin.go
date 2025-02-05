package models

import "context"

type FormRequestSeller struct{
	UserID	int		`json:"user_id" validate:"required,numeric"`
}

type SellerRequestResponse struct {
    UserID    uint   `json:"user_id"`
    Username  string `json:"username"`
    Email     string `json:"email"`
    Status    bool   `json:"status"`
}

type AdminRepository interface {
	GetAllRequest(ctx context.Context)([]*SellerRequestResponse, error)
	AcceptRequest(ctx context.Context, userId uint) (*User, error)
}