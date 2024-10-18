// const config = require('./index');

// module.exports = {
//   development: {
//     storage: process.env.DB_FILE,
//     dialect: "sqlite",
//     seederStorage: "sequelize",
//     logQueryParameters: true,
//     typeValidation: true
//   },
// //   production: {
// //     use_env_variable: 'DATABASE_URL',
// //     dialect: 'postgres',
// //     seederStorage: 'sequelize',
// //     dialectOptions: {
// //       ssl: {
// //         require: true,
// //         rejectUnauthorized: false
// //       }
// //     },
// //     define: {
// //       schema: process.env.SCHEMA
// //     }
// //   }
// // };

// production: {
//   use_env_variable: 'DATABASE_URL',
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
// };


module.exports = {
  development: {
    storage: process.env.DB_FILE,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL', // Ensure this is set correctly in Render
    dialect: 'postgres',
    seederStorage: 'sequelize',
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
};
