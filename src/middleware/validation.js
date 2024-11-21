const { body, validationResult } = require('express-validator');

const validateBboxType = [
  body('type')
    .isIn(['word', 'line', 'paragraph', 'block', 'page'])
    .withMessage('Invalid bbox type. Must be one of: word, line, paragraph, block, page'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateBboxType
};