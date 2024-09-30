// backend/utils/validation.js
const { validationResult, check } = require('express-validator');


const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad Request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad Request.";
    next(err);
  }
  next();
};

const validateSpot = [
  check('address')
  .notEmpty()
  .withMessage('Street address is required'),

  check('city')
  .notEmpty()
  .withMessage('City is required'),

  check('state')
  .notEmpty()
  .withMessage('State is required'),

  check('country')
  .notEmpty()
  .withMessage('Country is required'),

  check('lat')
  .isFloat({ min: -90, max: 90 })
  .withMessage('Latitude must be within -90 and 90'),

  check('lng')
  .isFloat({ min: -180, max: 180 })
  .withMessage('Longitude must be within -180 and 180'),

  check('name')
  .isLength({ max: 50 })
  .withMessage('Name must be less than 50 characters'),

  check('description')
  .notEmpty()
  .withMessage('Description is required'),

  check('price')
  .isFloat({ min: 0})
  .withMessage(' Price per day must be a positive number'),

  handleValidationErrors
  
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

const validateBooking = [
  check('startDate')
      .isDate()
      .withMessage('Start date must be a valid date')
      .custom((value, { req }) => {
          if (new Date(value) < new Date()) {
              throw new Error('Start date cannot be in the past');
          }
          return true;
      }),
  check('endDate')
      .isDate()
      .withMessage('End date must be a valid date')
      .custom((value, { req }) => {
          if (new Date(value) <= new Date(req.body.startDate)) {
              throw new Error('End date must be after start date');
          }
          return true;
      }),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateSpot,
  validateReview,
  validateBooking
};