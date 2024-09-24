

const express = require('express');
const { SpotImage, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Delete an existing image for a Spot
router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const { imageId } = req.params;
  const userId = req.user.id;

  try {
    const spotImage = await SpotImage.findByPk(imageId, {
      include: {
        model: Spot,
        attributes: ['ownerId']
      }
    });

    // Check if SpotImage exists
    if (!spotImage) {
      return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    // Check ownership
    if (spotImage.Spot.ownerId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Delete the image
    await spotImage.destroy();

    res.json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
