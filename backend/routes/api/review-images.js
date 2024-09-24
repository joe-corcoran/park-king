// routes/api/review-images.js

const express = require('express');
const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const { imageId } = req.params;
  const userId = req.user.id;

  try {
    // Find the image
    const reviewImage = await ReviewImage.findByPk(imageId, {
      include: {
        model: Review,
        attributes: ['userId'],
      },
    });

    // Check if the image exists
    if (!reviewImage) {
      return res.status(404).json({ message: "Review Image couldn't be found" });
    }

    // Check if the current user is the owner of the review
    if (reviewImage.Review.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Delete the image
    await reviewImage.destroy();

    res.json({ message: 'Successfully deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
