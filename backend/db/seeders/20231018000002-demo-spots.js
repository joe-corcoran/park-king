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
        name: "Golden Gate Parking",
        description: "Easy-access parking spot near the Golden Gate Bridge, perfect for tourists and locals.",
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
        name: "Times Square Parking",
        description: "Prime parking location just a short walk from Times Square, ideal for city explorers.",
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
        name: "Tech Hub Parking",
        description: "Secure parking spot located in the heart of Silicon Valley, perfect for business travelers.",
        price: 199,
      },
      {
        ownerId: 1,
        address: "101 Redwood Road",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 47.6062095,
        lng: -122.3320708,
        name: "Downtown Seattle Parking",
        description: "Convenient parking in downtown Seattle, minutes away from popular attractions.",
        price: 180,
      },
      {
        ownerId: 2,
        address: "202 Sunshine Boulevard",
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 25.7616798,
        lng: -80.1917902,
        name: "Beachside Parking",
        description: "Easily accessible parking space just 300 feet from Miami Beach. Perfect for sunseekers.",
        price: 300,
      },
      {
        ownerId: 3,
        address: "303 Mountain View Drive",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 39.7392358,
        lng: -104.990251,
        name: "Downtown Denver Parking",
        description: "Prime parking spot located in downtown Denver, great for city visitors and business travelers.",
        price: 220,
      },
      {
        ownerId: 1,
        address: "404 Bayou Street",
        city: "New Orleans",
        state: "Louisiana",
        country: "United States of America",
        lat: 29.9510658,
        lng: -90.0715323,
        name: "French Quarter Parking",
        description: "Secure parking space near the French Quarter, perfect for exploring New Orleans culture.",
        price: 175,
      },
      {
        ownerId: 2,
        address: "505 Windy City Way",
        city: "Chicago",
        state: "Illinois",
        country: "United States of America",
        lat: 41.8781136,
        lng: -87.6297982,
        name: "Downtown Chicago Parking",
        description: "Convenient parking in downtown Chicago with easy access to the city's top attractions and the lake.",
        price: 280,
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Golden Gate Parking", "Times Square Parking", "Tech Hub Parking", "Downtown Seattle Parking", "Beachside Parking", "Downtown Denver Parking", "French Quarter Parking", "Downtown Chicago Parking"] }
    }, {});
  }
};