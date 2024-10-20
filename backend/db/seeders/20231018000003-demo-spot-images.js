'use strict';

const { SpotImage, Spot } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      console.log('Starting SpotImages seeder...');
      
      // Fetch all existing Spot ids
      const spots = await Spot.findAll({ attributes: ['id'] });
      console.log(`Found ${spots.length} Spots`);
      
      if (spots.length === 0) {
        console.log('No Spots found. Please seed Spots table first.');
        return;
      }

      const spotIds = spots.map(spot => spot.id);
      console.log('Available Spot IDs:', spotIds);

      // Create SpotImages only for existing Spots
      const spotImages = [
          // Spot 1
          {
            spotId: spotIds[0],
            url: 'https://i.ibb.co/smGydz4/spot1-image3.jpg',
            preview: true
          },
          {
            spotId: spotIds[0],
            url: 'https://i.ibb.co/M9nQkym/spot1image0.jpg',
            preview: false
          },
          {
            spotId: spotIds[0],
            url: 'https://i.ibb.co/6mW3SCP/spot1-image4.jpg',
            preview: false
          },
          {
            spotId: spotIds[0],
            url: 'https://i.ibb.co/L9fQNPM/spot1-image2.jpg', 
            preview: false
          },
          {
            spotId: spotIds[0],
            url: 'https://i.ibb.co/Jrg4mmm/images-2.jpg', 
            preview: false
          },
        
          // Spot 2
          {
            spotId: spotIds[1],
            url: 'https://i.ibb.co/gwny486/spot2-image1.jpg',
            preview: true
          },
          {
            spotId: spotIds[1],
            url: 'https://i.ibb.co/1d070Y6/spot2-image2.jpg',
            preview: false
          },
          {
            spotId: spotIds[1],
            url: 'https://i.ibb.co/1d070Y6/spot2-image2.jpg',
            preview: false
          },
          {
            spotId: spotIds[1],
            url: 'https://i.ibb.co/2ZHMPnG/spot2-image4.jpg',
            preview: false
          },
          {
            spotId: spotIds[1],
            url: 'https://i.ibb.co/RyC0xGr/spot2-image5.jpg',
            preview: false
          },
        
          // Spot 3
          {
            spotId: spotIds[2],
            url: 'https://i.ibb.co/ZGxX5Fr/spot3-image1.jpg',
            preview: true
          },
          {
            spotId: spotIds[2],
            url: 'https://i.ibb.co/jWYrMyT/spot3-image2.jpg',
            preview: false
          },
          {
            spotId: spotIds[2],
            url: 'https://i.ibb.co/8m8MsvS/spot3-image3.jpg',
            preview: false
          },
          {
            spotId: spotIds[2],
            url: 'https://i.ibb.co/5BT5J36/spot3-image4.jpg',
            preview: false
          },
          {
            spotId: spotIds[2],
            url: 'https://i.ibb.co/Kbz4QQ9/spot3-image5.jpg',
            preview: false
          },
        
          // Spot 4
          {
            spotId: spotIds[3],
            url: 'https://i.ibb.co/gwr1HPk/spot4-image1.jpg',
            preview: true
          },
          {
            spotId: spotIds[3],
            url: 'https://i.ibb.co/KjLDDXb/spot4-image2.jpg',
            preview: false
          },
          {
            spotId: spotIds[3],
            url: 'https://i.ibb.co/GCLQjQ0/spot4-image3.jpg',
            preview: false
          },
          {
            spotId: spotIds[3],
            url: 'https://i.ibb.co/D7xpcnm/spot4-image4.jpg',
            preview: false
          },
          {
            spotId: spotIds[3],
            url: 'https://i.ibb.co/s1BtJSq/spot4-image5.jpg',
            preview: false
          },
        
          // Spot 5
          {
            spotId: spotIds[4],
            url: 'https://i.ibb.co/DkfLTHb/spot5-image1.jpg',
            preview: true
          },
          {
            spotId: spotIds[4],
            url: 'https://i.ibb.co/pdv3q43/spot5-image2.jpg',
            preview: false
          },
          {
            spotId: spotIds[4],
            url: 'https://i.ibb.co/bvdpGVr/spot5-image3.jpg',
            preview: false
          },
          {
            spotId: spotIds[4],
            url: 'https://i.ibb.co/bvdpGVr/spot5-image3.jpg', 
            preview: false
          },
          {
            spotId: spotIds[4],
            url: 'https://i.ibb.co/ZMBk3DQ/spot5-image5.jpg',
            preview: false
          },
        
          // Spot 6
          {
            spotId: spotIds[5],
            url: 'https://i.ibb.co/fxcQ2pL/spot6-image1.jpg',
            preview: true
          },
          {
            spotId: spotIds[5],
            url: 'https://i.ibb.co/QMc2DVD/spot6-image2.jpg',
            preview: false
          },
          {
            spotId: spotIds[5],
            url: 'https://i.ibb.co/S5L3d5W/spot6-image3.jpg',
            preview: false
          },
          {
            spotId: spotIds[5],
            url: 'https://i.ibb.co/8zmPMfv/spot6-image4.jpg',
            preview: false
          },
          {
            spotId: spotIds[5],
            url: 'https://i.ibb.co/fxcQ2pL/spot6-image1.jpg', 
            preview: false
          },
        
          // Spot 7
          {
            spotId: spotIds[6],
            url: 'https://i.ibb.co/m0yXJz5/spot7-image1.webp',
            preview: true
          },
          {
            spotId: spotIds[6],
            url: 'https://i.ibb.co/8j1L5Kh/spot7-image2.jpg',
            preview: false
          },
          {
            spotId: spotIds[6],
            url: 'https://i.ibb.co/tYf8VzM/spot7-image3.jpg',
            preview: false
          },
          {
            spotId: spotIds[6],
            url: 'https://i.ibb.co/GnLnsrp/spot7-image4.jpg',
            preview: false
          },
          {
            spotId: spotIds[6],
            url: 'https://i.ibb.co/TtPwG8t/spot7-image5.jpg',
            preview: false
          },
        
          // Spot 8
          {
            spotId: spotIds[7],
            url: 'https://i.ibb.co/2MdmcmW/spot8-image1.jpg',
            preview: true
          },
          {
            spotId: spotIds[7],
            url: 'https://i.ibb.co/4f8XwL8/spot8-image2.jpg',
            preview: false
          },
          {
            spotId: spotIds[7],
            url: 'https://i.ibb.co/xDRmkHh/spot8-image3.jpg',
            preview: false
          },
          {
            spotId: spotIds[7],
            url: 'https://i.ibb.co/jfJ6PxV/spot8-image4.jpg',
            preview: false
          },
          {
            spotId: spotIds[7],
            url: 'https://i.ibb.co/C8qfFsr/spot8-image5.jpg',
            preview: false
          }
        ];
        

      console.log(`Attempting to create ${spotImages.length} SpotImages`);
      
      for (let image of spotImages) {
        try {
          // Ensure we're not trying to access a non-existent spot
          if (image.spotId && spotIds.includes(image.spotId)) {
            await SpotImage.create(image);
            console.log(`Created SpotImage for Spot ID ${image.spotId}`);
          } else {
            console.log(`Skipping image creation for non-existent Spot ID ${image.spotId}`);
          }
        } catch (error) {
          console.error(`Failed to create SpotImage for Spot ID ${image.spotId}:`, error);
        }
      }

      console.log('SpotImages seeding completed');
    } catch (error) {
      console.error('Error in SpotImages seeder:', error);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    console.log('Undoing SpotImages seed...');
    await queryInterface.bulkDelete('SpotImages', null, {});
    console.log('SpotImages seed undone');
  }
};