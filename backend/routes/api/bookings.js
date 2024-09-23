const express = require('express');
const { Booking, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateBooking } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

//Book a spot
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

        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        const conflictingBooking = await Booking.findOne({
            where: {
                spotId,
                [Op.or]: [
                    { startDate: { [Op.between]: [parsedStartDate, parsedEndDate] } },
                    { endDate: { [Op.between]: [parsedStartDate, parsedEndDate] } },
                    {
                        [Op.and]: [
                            { startDate: { [Op.lte]: parsedStartDate } },
                            { endDate: { [Op.gte]: parsedEndDate } }
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
            startDate: parsedStartDate,
            endDate: parsedEndDate
        });

        res.status(201).json(newBooking);
    } catch (err) {
        next(err);
    }
});

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
  
    try {
      const bookings = await Booking.findAll({
        where: { userId },
        include: [
          {
            model: Spot,
            attributes: {
              exclude: ['description', 'createdAt', 'updatedAt']
            },
            include: [
              {
                model: SpotImage,
                where: { preview: true },
                attributes: ['url'],
                required: false
              }
            ]
          }
        ]
      });
  
      const bookingsList = bookings.map(booking => {
        const bookingJSON = booking.toJSON();
        if (bookingJSON.Spot.SpotImages && bookingJSON.Spot.SpotImages.length > 0) {
          bookingJSON.Spot.previewImage = bookingJSON.Spot.SpotImages[0].url;
        } else {
          bookingJSON.Spot.previewImage = null;
        }
        delete bookingJSON.Spot.SpotImages;
        return bookingJSON;
      });
  
      res.json({ Bookings: bookingsList });
    } catch (error) {
      next(error);
    }
  });

  // Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;
  
    const errors = {};
  
    const currentDate = new Date();
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
  
    if (isNaN(parsedStartDate.getTime())) {
      errors.startDate = "Invalid startDate";
    }
    if (isNaN(parsedEndDate.getTime())) {
      errors.endDate = "Invalid endDate";
    }
    if (parsedStartDate < currentDate) {
      errors.startDate = "startDate cannot be in the past";
    }
    if (parsedEndDate <= parsedStartDate) {
      errors.endDate = "endDate cannot be on or before startDate";
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "Bad Request", errors });
    }
  
    try {
      const booking = await Booking.findByPk(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
      }
  
      if (booking.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
  
      if (new Date(booking.endDate) < currentDate) {
        return res.status(403).json({ message: "Past bookings can't be modified" });
      }
  
      const conflictingBooking = await Booking.findOne({
        where: {
          spotId: booking.spotId,
          id: { [Op.ne]: bookingId },
          [Op.or]: [
            {
              startDate: { [Op.between]: [parsedStartDate, parsedEndDate] },
            },
            {
              endDate: { [Op.between]: [parsedStartDate, parsedEndDate] },
            },
            {
              [Op.and]: [
                { startDate: { [Op.lte]: parsedStartDate } },
                { endDate: { [Op.gte]: parsedEndDate } },
              ],
            },
          ],
        },
      });
  
      if (conflictingBooking) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking",
          },
        });
      }
  
      booking.startDate = parsedStartDate;
      booking.endDate = parsedEndDate;
      await booking.save();
  
      res.json(booking);
    } catch (error) {
      next(error);
    }
  });

  // Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params;
    const userId = req.user.id;
  
    try {
      const booking = await Booking.findByPk(bookingId, {
        include: [{ model: Spot }],
      });
  
      if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
      }
  
      if (booking.userId !== userId && booking.Spot.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
  
      const currentDate = new Date();
      if (new Date(booking.startDate) <= currentDate) {
        return res.status(403).json({
          message: "Bookings that have been started can't be deleted",
        });
      }
  
      await booking.destroy();
      res.json({ message: "Successfully deleted" });
    } catch (error) {
      next(error);
    }
  });
  
  

module.exports = router;