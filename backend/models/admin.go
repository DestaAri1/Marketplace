package models

import "context"

type FormRequestSeller struct{
	UserID	int		`json:"user_id" validate:"required,numeric"`
    Status  int     `json:"status"`
    Reason  string  `json:"reason"`
}


type SellerRequestResponse struct {
    ID        uint   `json:"id"`
    UserID    uint   `json:"user_id"`
    Username  string `json:"username"`
    Email     string `json:"email"`
    Status    int    `json:"status"`
    Reason    string `json:"reason"`
}

type AdminRepository interface {
    GetAllRequest(ctx context.Context)([]*SellerRequestResponse, error)
	AcceptRequest(ctx context.Context, requestData *FormRequestSeller, userId uint, requestId uint) (*User, error)
}

type FormRequestUpgradeUser struct{
    Role    *UserRole   `json:"role" validate:"required,numeric"`
    UserId  uint        `json:"user_id" validate:"required,numeric"`
}

type FormRequestDeleteUserByAdmin struct {
    UserId  uint    `json:"user_id" validate:"required,numeric"`
}

type AllUserResponse struct {
    ID       uint       `json:"id"`
    Username string     `json:"username"`
    Email    string     `json:"email"`
    Role     UserRole   `json:"role"`
}

type AdminUserRepository interface{
    GetAllUser(ctx context.Context)([]*AllUserResponse, error)
    UpgradeUser(ctx context.Context, requestData *FormRequestUpgradeUser, userId uint)(*User, error)
    DeleteUserByAdmin(ctx context.Context, requestData *FormRequestDeleteUserByAdmin, userId uint) (*User, error)
}