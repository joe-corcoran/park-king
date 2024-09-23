const express = require('express');
const { Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateSpot } = require('../../utils/validation');

const router = express.Router()

router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    try {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const newSpot = await Spot.create({
            ownerId: req.user.id,
            address,
            city, 
            state, 
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        res.status(201).json(newSpot);
    } catch (err) {
        next(err);
    }
});

module.exports = router