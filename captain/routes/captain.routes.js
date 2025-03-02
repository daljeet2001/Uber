const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator")
const authMiddleware = require('../middlewares/auth.middleware');
const { isTokenBlacklisted } = require('../middlewares/auth.middleware');
const captainModel = require('../models/captain.model');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

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

router.get('/captains-in-radius', captainController.getCaptainsInTheRadius);

router.get('/:captainId', async (req, res) => {
    try {
        const captain = await captainModel.findById(req.params.captainId);
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }
        res.status(200).json(captain);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;