const express = require('express');
const { Review, Spot, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateReview } = require('../../utils/validation');

const router = express.Router();

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

module.exports = router;