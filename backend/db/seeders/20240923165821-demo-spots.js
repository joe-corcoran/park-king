"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId: 2,
        address: "456 Coding Avenue",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.7127753,
        lng: -74.0059728,
        name: "Tech Hub",
        description: "A cozy spot for tech enthusiasts",
        price: 250,
      },
      {
        ownerId: 3,
        address: "789 Silicon Street",
        city: "San Jose",
        state: "California",
        country: "United States of America",
        lat: 37.3382082,
        lng: -121.8863286,
        name: "Startup Heaven",
        description: "Where innovation meets comfort",
        price: 199,
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["App Academy", "Tech Hub", "Startup Heaven"] }
    }, {});
  }
};