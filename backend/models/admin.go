package models

import "context"

type FormRequestSeller struct{
	UserID	int		`json:"user_id" validate:"required,numeric"`
    Status  bool    `json:"status"`
    Reason  string  `json:"reason"`
}

type SellerRequestResponse struct {
    UserID    uint   `json:"user_id"`
    Username  string `json:"username"`
    Email     string `json:"email"`
    Status    bool   `json:"status"`
    Reason    string `json:"reason"`
}

type AdminRepository interface {
	GetAllRequest(ctx context.Context)([]*SellerRequestResponse, error)
	AcceptRequest(ctx context.Context, requestData *FormRequestSeller, userId uint) (*User, error)
}