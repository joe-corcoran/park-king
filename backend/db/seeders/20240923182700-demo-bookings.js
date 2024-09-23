'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2023-11-19'),
        endDate: new Date('2023-11-21')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('2023-12-01'),
        endDate: new Date('2023-12-05')
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-20')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};