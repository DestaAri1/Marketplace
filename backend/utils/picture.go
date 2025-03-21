package utils

import (
	"errors"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"mime/multipart"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
	"github.com/nfnt/resize"
)

const (
	MaxImageSize      = 5 * 1024 * 1024 // 5MB
	ProfilePictureDir = "assets/profile-picture"
	AllowedImageTypes = ".jpg,.jpeg,.png"
	MaxWidth          = 400             // Maximum width in pixels
	MaxHeight         = 400             // Maximum height in pixels
)

// ValidateImageFile validates the uploaded image file
func ValidateImageFile(file *multipart.FileHeader) error {
	// Check file size
	if file.Size > MaxImageSize {
		return errors.New("image size too large (max 5MB)")
	}

	// Check file extension
	ext := strings.ToLower(filepath.Ext(file.Filename))
	if !strings.Contains(AllowedImageTypes, ext) {
		return errors.New("invalid image format (allowed: JPG, JPEG, PNG)")
	}

	return nil
}

// SaveProfilePicture saves the uploaded profile picture to the destination directory
// Now with proper SVG conversion and returning just the filename
func SaveProfilePicture(file *multipart.FileHeader) (string, error) {
	// Validate the image first
	if err := ValidateImageFile(file); err != nil {
		return "", err
	}

	// Create directory with full permissions if it doesn't exist
	if err := os.MkdirAll(ProfilePictureDir, 0777); err != nil {
		return "", fmt.Errorf("failed to create directory: %w", err)
	}

	// Open the uploaded file
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("failed to open uploaded file: %w", err)
	}
	defer src.Close()

	// Decode the image
	var img image.Image
	ext := strings.ToLower(filepath.Ext(file.Filename))
	switch ext {
	case ".jpg", ".jpeg":
		img, err = jpeg.Decode(src)
	case ".png":
		img, err = png.Decode(src)
	default:
		return "", fmt.Errorf("unsupported image format: %s", ext)
	}
	if err != nil {
		return "", fmt.Errorf("failed to decode image: %w", err)
	}

	// Resize the image
	resizedImg := resize.Thumbnail(MaxWidth, MaxHeight, img, resize.Lanczos3)

	// Generate unique filename
	newFileName := uuid.New().String()
	
	// Save the resized image as PNG temporarily
	tempPngPath := filepath.Join(ProfilePictureDir, newFileName+".png")
	tempFile, err := os.Create(tempPngPath)
	if err != nil {
		return "", fmt.Errorf("failed to create temporary file: %w", err)
	}
	
	if err := png.Encode(tempFile, resizedImg); err != nil {
		tempFile.Close()
		os.Remove(tempPngPath)
		return "", fmt.Errorf("failed to encode resized image: %w", err)
	}
	tempFile.Close()

	// Convert PNG to SVG using Potrace
	svgFileName := newFileName + ".svg"
	svgPath := filepath.Join(ProfilePictureDir, svgFileName)
	
	// Use the command-line tool ImageMagick + Potrace for conversion with improved settings
	// Create a temporary BMP file with better quality settings
	bmpPath := strings.TrimSuffix(tempPngPath, ".png") + ".bmp"
	
	// Convert PNG to BMP using ImageMagick with improved settings
	cmdConvert := exec.Command(
		"convert", 
		tempPngPath,
		"-posterize", "6",
		"-contrast-stretch", "0%x95%",
		"-normalize",
		bmpPath,
	)
	
	if err := cmdConvert.Run(); err != nil {
		os.Remove(tempPngPath)
		return "", fmt.Errorf("failed to convert to BMP: %w", err)
	}
	defer os.Remove(bmpPath)
	
	// Convert BMP to SVG using Potrace with better settings for photos
	cmdPotrace := exec.Command(
		"potrace",
		"-s",
		"-o", svgPath,
		"--turdsize", "3",
		"--alphamax", "1",
		"--opttolerance", "0.2",
		bmpPath,
	)
	
	if err := cmdPotrace.Run(); err != nil {
		os.Remove(tempPngPath)
		return "", fmt.Errorf("failed to convert to SVG: %w", err)
	}
	
	// Remove temporary PNG file
	os.Remove(tempPngPath)

	// Return just the filename, not the full path
	return svgFileName, nil
}

// SaveOptimizedImage is a fallback method with improved quality
func SaveOptimizedImage(file *multipart.FileHeader) (string, error) {
	// Validate the image
	if err := ValidateImageFile(file); err != nil {
		return "", err
	}

	// Create directory if needed
	if err := os.MkdirAll(ProfilePictureDir, 0777); err != nil {
		return "", fmt.Errorf("failed to create directory: %w", err)
	}

	// Open the file
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("failed to open uploaded file: %w", err)
	}
	defer src.Close()

	// Decode the image
	var img image.Image
	ext := strings.ToLower(filepath.Ext(file.Filename))
	switch ext {
	case ".jpg", ".jpeg":
		img, err = jpeg.Decode(src)
	case ".png":
		img, err = png.Decode(src)
	default:
		return "", fmt.Errorf("unsupported image format: %s", ext)
	}
	if err != nil {
		return "", fmt.Errorf("failed to decode image: %w", err)
	}

	// Resize the image with high quality
	resizedImg := resize.Thumbnail(MaxWidth, MaxHeight, img, resize.Lanczos3)

	// Save as JPG with unique filename
	newFileName := uuid.New().String() + ".jpg"
	filePath := filepath.Join(ProfilePictureDir, newFileName)
	
	// Create the output file
	out, err := os.Create(filePath)
	if err != nil {
		return "", fmt.Errorf("failed to create output file: %w", err)
	}
	defer out.Close()
	
	// Encode as JPEG with higher quality (95 instead of 80)
	opts := jpeg.Options{Quality: 95}
	if err := jpeg.Encode(out, resizedImg, &opts); err != nil {
		return "", fmt.Errorf("failed to encode as JPEG: %w", err)
	}

	// Return just the filename, not the full path
	return newFileName, nil
}

// DeleteProfilePicture deletes the profile picture
func DeleteProfilePicture(imagePath string) error {
	if imagePath == "" {
		return nil
	}
	
	// Check if file exists before attempting to delete
	if _, err := os.Stat(imagePath); os.IsNotExist(err) {
		return nil // File doesn't exist, no need to delete
	}
	
	return os.Remove(imagePath)
}