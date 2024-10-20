const path = require('path');
const config = require('./index');

module.exports = {
  development: {
    storage: path.resolve(__dirname, 'backend/backend/dev.db'), // Update this path
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
    seedersPath: path.resolve(__dirname, '../db/seeders')
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    seedersPath: path.resolve(__dirname, '../db/seeders'),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
}
//   },
// production_url: {
//   dialect: 'postgres',
//   seederStorage: 'sequelize',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   },
//   define: {
//     schema: process.env.SCHEMA
//   }
// },
// production_url_ssl: {
//   dialect: 'postgres',
//   seederStorage: 'sequelize',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   },
//   define: {
//     schema: process.env.SCHEMA
//   }
// }
// }
