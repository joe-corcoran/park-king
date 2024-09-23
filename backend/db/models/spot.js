"use strict";

const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  console.log("Creating a spot...");
  class Spot extends Model {
    static associate(models) {
        Spot.belongsTo(models.User, { foreignKey: "ownerId", as: "Owner" });
        Spot.hasMany(models.Review, { foreignKey: 'spotId' });
        Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
        Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' });
      }
  }

  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: -90,
          max: 90,
        },
      },

      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: -180,
          max: 180,
        },
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Spot",
      timestamps: true,
    }
  );

  return Spot;
};
