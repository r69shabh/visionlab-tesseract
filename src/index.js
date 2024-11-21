const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { validateBboxType } = require('./middleware/validation');
const { extractText, extractBoundingBoxes } = require('./services/ocr');

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for handling file uploads
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Extract text endpoint
app.post('/get-text', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const text = await extractText(req.file.buffer);
    res.json({ text });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// Extract bounding boxes endpoint
app.post('/get-bboxes', upload.single('image'), validateBboxType, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { type } = req.body;
    const bboxes = await extractBoundingBoxes(req.file.buffer, type);
    res.json({ bboxes });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});