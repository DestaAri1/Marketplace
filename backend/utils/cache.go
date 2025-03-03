package utils

import (
	"sync"
	"time"

	"github.com/DestaAri1/models"
)

// UserCache structure untuk menyimpan data user
type UserCache struct {
	sync.RWMutex
	users map[uint]*models.User
	ttl   time.Duration
}

var (
	// Global instance of UserCache
	GlobalUserCache = &UserCache{
		users: make(map[uint]*models.User),
		ttl:   5 * time.Minute,
	}
)

// GetUser gets user from cache if exists
func (c *UserCache) GetUser(userID uint) (*models.User, bool) {
	c.RLock()
	user, exists := c.users[userID]
	c.RUnlock()
	return user, exists
}

// SetUser sets user in cache with TTL
func (c *UserCache) SetUser(userID uint, user *models.User) {
	c.Lock()
	c.users[userID] = user
	c.Unlock()

	// Setup cleanup timer
	go func() {
		time.Sleep(c.ttl)
		c.Lock()
		delete(c.users, userID)
		c.Unlock()
	}()
} 