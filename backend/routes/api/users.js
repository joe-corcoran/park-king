//backend/routes/api/users.js


const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required'),
    check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last name is required'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    // Add firstName and lastName to the User creation
    const user = await User.create({
      email,
      username,
      firstName,
      lastName,
      hashedPassword
    });

    // Include firstName and lastName in the safeUser object
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.status(201).json({
      user: safeUser
    });
  }
);

module.exports = router;