const tesseract = require('node-tesseract-ocr');

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3,
};

async function extractText(imageBuffer) {
  try {
    const text = await tesseract.recognize(imageBuffer, config);
    return text.trim();
  } catch (error) {
    console.error('Tesseract error:', error);
    throw new Error('Failed to extract text from image');
  }
}

async function extractBoundingBoxes(imageBuffer, type) {
  try {
    // Configure tesseract to output bounding box data
    const tsv = await tesseract.recognize(imageBuffer, {
      ...config,
      tsv: true
    });

    // Parse TSV output to extract bounding boxes based on type
    return parseTsvOutput(tsv, type);
  } catch (error) {
    console.error('Tesseract error:', error);
    throw new Error('Failed to extract bounding boxes from image');
  }
}

function parseTsvOutput(tsv, type) {
  // Implementation will depend on the TSV format output by Tesseract
  // This is a simplified example
  const lines = tsv.split('\n');
  const bboxes = [];

  lines.forEach(line => {
    const parts = line.split('\t');
    if (parts.length >= 12) {
      bboxes.push({
        text: parts[11],
        bbox: {
          x0: parseInt(parts[6]),
          y0: parseInt(parts[7]),
          x1: parseInt(parts[8]),
          y1: parseInt(parts[9])
        }
      });
    }
  });

  return bboxes;
}

module.exports = {
  extractText,
  extractBoundingBoxes
};