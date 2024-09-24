const express = require('express');
const { Review, ReviewImage, Spot, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateReview } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  try {
    const reviews = await Review.findAll({
      where: { userId },
      include: [
        {
          model: Spot,
          attributes: ['id', 'name', 'address', 'city', 'state', 'country']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    res.json({ Reviews: reviews });
  } catch (err) {
    next(err);
  }
});

router.get('/spots/:spotId/reviews', async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);

  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    res.json({ Reviews: reviews });
  } catch (err) {
    next(err);
  }
});

router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
  const { review, stars } = req.body;
  const reviewId = parseInt(req.params.reviewId);

  try {
    const existingReview = await Review.findByPk(reviewId);
    if (!existingReview) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (existingReview.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this review" });
    }

    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();

    res.json(existingReview);
  } catch (err) {
    next(err);
  }
});

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  const reviewId = parseInt(req.params.reviewId);

  try {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await review.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    next(err);
  }
});

//Add image to review
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { url } = req.body;
    const { reviewId } = req.params;
    const userId = req.user.id;
  
    try {
      // Check if the review exists
      const review = await Review.findByPk(reviewId);
  
      if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
      }
  
      // Check if the current user is the owner of the review
      if (review.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      // Check if the review already has 10 images
      const imageCount = await ReviewImage.count({ where: { reviewId } });
  
      if (imageCount >= 10) {
        return res.status(403).json({
          message: 'Maximum number of images for this resource was reached',
        });
      }
  
      // Create the new ReviewImage
      const newImage = await ReviewImage.create({
        reviewId,
        url,
      });
  
      // Return only the id and url as per requirements
      res.status(201).json({
        id: newImage.id,
        url: newImage.url,
      });
    } catch (error) {
      next(error);
    }
  });
  


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