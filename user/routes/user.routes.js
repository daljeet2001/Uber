const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator")
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
// const blacklistTokenModel = require('../models/blacklistToken.model');
const { isTokenBlacklisted } = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

router.post('/check-token', [
    body('token').notEmpty().withMessage('Token is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { token } = req.body;
    const isBlacklisted = await isTokenBlacklisted(token);

    if (isBlacklisted) {
        return res.status(400).json({ message: 'Token is blacklisted' });
    }

    res.status(200).json({ message: 'Token is valid' });
});

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router;