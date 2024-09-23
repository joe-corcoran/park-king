const express = require('express');
const { Spot, Review, Booking, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateSpot, validateReview, validateBooking } = require('../../utils/validation');
const { Op } = require('sequelize');

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

//Add a review to a spot
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;
    const spotId = parseInt(req.params.spotId);
    const userId = req.user.id;

    try {
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        const existingReview = await Review.findOne({
            where: { userId, spotId }
        });

        if (existingReview) {
            return res.status(403).json({ message: "User already has a review for this spot" });
        }

        const newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
        });

        res.status(201).json(newReview);
    } catch (err) {
        next(err);
    }
});

//add a booking to a spot
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const spotId = parseInt(req.params.spotId);
    const userId = req.user.id;

    try {
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        if (spot.ownerId === userId) {
            return res.status(403).json({ message: "You can't book your own spot" });
        }

        const conflictingBooking = await Booking.findOne({
            where: {
                spotId,
                [Op.or]: [
                    { startDate: { [Op.between]: [startDate, endDate] } },
                    { endDate: { [Op.between]: [startDate, endDate] } },
                    {
                        [Op.and]: [
                            { startDate: { [Op.lte]: startDate } },
                            { endDate: { [Op.gte]: endDate } }
                        ]
                    }
                ]
            }
        });

        if (conflictingBooking) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            });
        }

        const newBooking = await Booking.create({
            spotId,
            userId,
            startDate,
            endDate
        });

        res.status(201).json(newBooking);
    } catch (err) {
        next(err);
    }
});

//get all spots
router.get('/', async (req, res, next) => {
    try {
      const spots = await Spot.findAll({
        include: [
          {
            model: Review,
            attributes: []
          },
          {
            model: SpotImage,
            where: { preview: true },
            required: false,
            attributes: ['url']
          }
        ],
        attributes: {
          include: [
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'previewImage']
          ]
        },
        group: ['Spot.id', 'SpotImages.url']
      });
  
      res.json({ Spots: spots });
    } catch (err) {
      next(err);
    }
  });

  // Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { url, preview } = req.body;
    const userId = req.user.id;
  
    try {
      const spot = await Spot.findByPk(spotId);
  
      // Check if spot exists
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
  
      // Check ownership
      if (spot.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
  
      // Create new SpotImage
      const newImage = await SpotImage.create({
        spotId,
        url,
        preview
      });
  
      // Return the required response
      res.status(201).json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router