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
        {
          spotId: spotIds[0],
          url: 'https://www.sftravel.com/sites/default/files/styles/hero/public/2022-09/cars-parked-in-front-of-painted-ladies.jpg.webp?itok=Md-4x9wl',
          preview: true
        },
        {
          spotId: spotIds[0],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9dTBAeffMN2CVcBc82SsWEpHabFDXoWyjA&s',
          preview: false
        },
        {
          spotId: spotIds[0],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlmkRmq56VHwaXhaZRRXgtZDQfayiyrxKbRw&s',
          preview: false
        },
        {
          spotId: spotIds[0],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNTgAb-82glVdfwBVrkvgjwvUmD9_CS2cz3A&s',
          preview: false
        },
        {
          spotId: spotIds[0],
          url: 'https://rickspaving.com/wp-content/uploads/6910-N.-Mesa-finished--1024x768.jpg',
          preview: false
        },
      
        // Spot 2
        {
          spotId: spotIds[1],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyfV62ayS0LyOiKJv2KlyqDPVvvygoQHsjJA&s',
          preview: true
        },
        {
          spotId: spotIds[1],
          url: 'https://static01.nyt.com/images/2023/10/19/multimedia/19a2_insider-01-ftzl/19a2_insider-01-ftzl-superJumbo.jpg',
          preview: false
        },
        {
          spotId: spotIds[1],
          url: 'https://i0.wp.com/blog.spothero.com/wp-content/uploads/2015/11/NYC_parking.jpg?fit=2560%2C1920&ssl=1',
          preview: false
        },
        {
          spotId: spotIds[1],
          url: 'https://www.oandsassociates.com/wp-content/uploads/Parking-AdobeStock_493170734-1024x768.jpeg',
          preview: false
        },
        {
          spotId: spotIds[1],
          url: 'https://static01.nyt.com/images/2020/03/15/realestate/13parking3/merlin_170084595_b505b1d6-4347-47a6-9da4-b3d9638fd9a4-superJumbo.jpg',
          preview: false
        },
      
        // Spot 3
        {
          spotId: spotIds[2],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz9L9YDfgIIqNGCS4LiWRb_XI__lmp0oPr1Q&s',
          preview: true
        },
        {
          spotId: spotIds[2],
          url: 'https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt446aebec42a81ac1/61bc462885b59c201581b3fc/US_Carmel-by-the-Sea_US_Header.jpg',
          preview: false
        },
        {
          spotId: spotIds[2],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3XrokYgdZ055fQxbCVWo3c1nxNHZF4ZI_1Q&s',
          preview: false
        },
        {
          spotId: spotIds[2],
          url: 'https://i.redd.it/lnlql621q7va1.jpg',
          preview: false
        },
        {
          spotId: spotIds[2],
          url: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe',
          preview: false
        },
      
        // Spot 4
        {
          spotId: spotIds[3],
          url: 'https://d2syaugtnopsqd.cloudfront.net/wp-content/uploads/2019/08/16113225/IMG_0100.jpg',
          preview: true
        },
        {
          spotId: spotIds[3],
          url: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98',
          preview: false
        },
        {
          spotId: spotIds[3],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmWJniBHdczBuq5070AdBS2jnrIkzIxNzVPg&s',
          preview: false
        },
        {
          spotId: spotIds[3],
          url: 'https://d2syaugtnopsqd.cloudfront.net/wp-content/uploads/2020/04/22161225/IMG_0105.jpg',
          preview: false
        },
        {
          spotId: spotIds[3],
          url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a',
          preview: false
        },
      
        // Spot 5
        {
          spotId: spotIds[4],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFA4eFj8Kgu9qZM79iJxSVkR1YWNEUumj1kw&s',
          preview: true
        },
        {
          spotId: spotIds[4],
          url: 'https://maui-ready.thesnorkelstore.workers.dev/wp-content/uploads/2023/04/02112538/Ulua-beach-parking-lot-Maui-1200x683-1.jpg',
          preview: false
        },
        {
          spotId: spotIds[4],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsnzyq4kTbZMj06hliEymCAA7I8AhfPQLveg&s',
          preview: false
        },
        {
          spotId: spotIds[4],
          url: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe',
          preview: false
        },
        {
          spotId: spotIds[4],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRbfe_qALO2n0c_PhP9OJuoDdtRltD-QekEQ&s',
          preview: false
        },
      
        // Spot 6
        {
          spotId: spotIds[5],
          url: 'https://acadiaeastcampground.com/wp-content/uploads/2023/05/Gorham-Mountain-Trail-Acadia-National-Park-15.jpg',
          preview: true
        },
        {
          spotId: spotIds[5],
          url: 'https://images.squarespace-cdn.com/content/v1/6226f62738f4f73d2b353e79/891cb2d6-9c77-4bf3-92fd-c3a0fd70d364/IMG_6132.JPG',
          preview: false
        },
        {
          spotId: spotIds[5],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrYjFAfqZx42Bw4fMpbHbiwVHrtanZDp8VQ&s',
          preview: false
        },
        {
          spotId: spotIds[5],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3BzVsSdjWnsK5T4tBFWfXgfWXTyVTSt2xmw&s',
          preview: false
        },
        {
          spotId: spotIds[5],
          url: 'https://www.azcentral.com/gcdn/presto/2022/08/15/PPHX/792c6c33-8ea9-4340-9cbb-63a5a4ebb9e5-Library_-_27_of_34.jpeg',
          preview: false
        },
      
        // Spot 7
        {
          spotId: spotIds[6],
          url: 'https://i0.wp.com/www.saintgregtravel.com/wp-content/uploads/2019/05/IMG_3637.jpg?fit=1200%2C900&ssl=1',
          preview: true
        },
        {
          spotId: spotIds[6],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVVAp84QdL52hTRsImClRj6RhWWyfud0UIbA&s',
          preview: false
        },
        {
          spotId: spotIds[6],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-tYtr7JbMTUSqPLVypPnlR4KMPcw9-w_8jw&s',
          preview: false
        },
        {
          spotId: spotIds[6],
          url: 'https://bikeeasy.org/wp-content/uploads/2020/11/Bike-Parking-French-Quarter.jpg',
          preview: false
        },
        {
          spotId: spotIds[6],
          url: 'https://cf.bstatic.com/static/img/theme-index/bg_parking/c589ce705b17690d8a788064703af2071d568cbc.jpg',
          preview: false
        },
      
        // Spot 8
        {
          spotId: spotIds[7],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk3JHRerzCUxQZWEZKSCDON37ifWaKzJzezA&s',
          preview: true
        },
        {
          spotId: spotIds[7],
          url: 'https://parkmobile.io/wp-content/uploads/2022/02/tips-for-parking-in-downtown-chicago-parkmobile-7-scaled.jpg',
          preview: false
        },
        {
          spotId: spotIds[7],
          url: 'https://cdn.prod.website-files.com/5f19968b0957222e19dbbf28/66f094258806ba656bfc8278_Parking%20Meter%20Sign-272.jpg',
          preview: false
        },
        {
          spotId: spotIds[7],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbeLMuf4O7vo0o-Cw7ouzXgJbtNbU2lY3eFA&s',
          preview: false
        },
        {
          spotId: spotIds[7],
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASnuJvKccZq5x3ICsMt1KwZjB4iJ9GF9cBQ&s',
          preview: false
        },
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