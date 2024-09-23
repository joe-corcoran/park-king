const express = require('express');
const { Spot, Review, Booking, SpotImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateSpot, validateReview, validateBooking } = require('../../utils/validation');
const { Op } = require('sequelize');
const { User } = require('../../db/models');

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

 // Get all Spots with Query Filters
router.get('/', async (req, res, next) => {
    let {
      page = 1,
      size = 20,
      minLat,
      maxLat,
      minLng,
      maxLng,
      minPrice,
      maxPrice
    } = req.query;
  
    // Convert to integers
    page = parseInt(page);
    size = parseInt(size);
  
    // Validation
    const errors = {};
    if (isNaN(page) || page < 1) {
      errors.page = "Page must be greater than or equal to 1";
    }
    if (isNaN(size) || size < 1 || size > 20) {
      errors.size = "Size must be between 1 and 20";
    }
    if (minLat && isNaN(parseFloat(minLat))) {
      errors.minLat = "Minimum latitude is invalid";
    }
    if (maxLat && isNaN(parseFloat(maxLat))) {
      errors.maxLat = "Maximum latitude is invalid";
    }
    if (minLng && isNaN(parseFloat(minLng))) {
      errors.minLng = "Minimum longitude is invalid";
    }
    if (maxLng && isNaN(parseFloat(maxLng))) {
      errors.maxLng = "Maximum longitude is invalid";
    }
    if (minPrice && (isNaN(parseFloat(minPrice)) || parseFloat(minPrice) < 0)) {
      errors.minPrice = "Minimum price must be a positive number";
    }
    if (maxPrice && (isNaN(parseFloat(maxPrice)) || parseFloat(maxPrice) < 0)) {
      errors.maxPrice = "Maximum price must be a positive number";
    }
  
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Bad Request",
        errors
      });
    }
  
    const where = {};
  
    if (minLat) where.lat = { [Op.gte]: parseFloat(minLat) };
    if (maxLat) where.lat = { ...(where.lat || {}), [Op.lte]: parseFloat(maxLat) };
    if (minLng) where.lng = { [Op.gte]: parseFloat(minLng) };
    if (maxLng) where.lng = { ...(where.lng || {}), [Op.lte]: parseFloat(maxLng) };
    if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...(where.price || {}), [Op.lte]: parseFloat(maxPrice) };
  
    try {
      // Fetch spots with their average ratings and preview images
      const spots = await Spot.findAll({
        where,
        attributes: {
          include: [
            // Calculate avgRating
            [
              sequelize.literal(`(
                SELECT AVG("Reviews"."stars")
                FROM "Reviews"
                WHERE "Reviews"."spotId" = "Spot"."id"
              )`),
              'avgRating'
            ],
            // Get previewImage
            [
              sequelize.literal(`(
                SELECT "url"
                FROM "SpotImages"
                WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true
                LIMIT 1
              )`),
              'previewImage'
            ]
          ]
        },
        limit: size,
        offset: (page - 1) * size
      });
  
      res.json({
        Spots: spots,
        page,
        size
      });
    } catch (error) {
      next(error);
    }
  });

  // Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;
  
    try {
      const spot = await Spot.findByPk(spotId, {
        include: [
          {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
          },
          {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: Review,
            attributes: []
          }
        ],
        attributes: {
          include: [
            [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']
          ]
        },
        group: ['Spot.id', 'SpotImages.id', 'Owner.id']
      });
  
      // Check if spot exists
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
  
      res.json(spot);
    } catch (error) {
      next(error);
    }
  });
  
  // Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const { spotId } = req.params;
    const userId = req.user.id;
    const {
      address, city, state, country, lat, lng, name, description, price
    } = req.body;
  
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
  
      // Update spot
      await spot.update({
        address, city, state, country, lat, lng, name, description, price
      });
  
      res.json(spot);
    } catch (error) {
      next(error);
    }
  });
  
  
// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
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
  
      // Delete spot
      await spot.destroy();
  
      res.json({ message: "Successfully deleted" });
    } catch (error) {
      next(error);
    }
  });
  
module.exports = router