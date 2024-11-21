# Tesseract OCR API Server

This is a Node.js server that provides REST APIs for text extraction and bounding box detection using Tesseract OCR.

## Prerequisites

1. Node.js (v14 or higher)
2. Tesseract OCR v5.0.0
3. npm or yarn

## Installation

### 1. Install Tesseract OCR

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install tesseract-ocr
sudo apt install libtesseract-dev
```

#### macOS
```bash
brew install tesseract
```

#### Windows
Download and install the binary from [UB Mannheim](https://github.com/UB-Mannheim/tesseract/wiki)

### 2. Install Node.js dependencies

```bash
npm install
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### 1. Extract Text
- **URL**: `/get-text`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**: 
  - image: Image file (PNG, JPEG, TIFF)

### 2. Get Bounding Boxes
- **URL**: `/get-bboxes`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**:
  - image: Image file (PNG, JPEG, TIFF)
  - type: One of ["word", "line", "paragraph", "block", "page"]

## Running Tests

```bash
npm test
```

## Docker Support

Build the image:
```bash
docker build -t tesseract-ocr-server .
```

Run the container:
```bash
docker run -p 3000:3000 tesseract-ocr-server
```