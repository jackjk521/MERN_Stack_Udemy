const Sequelize = require('sequelize');

// ENVIRONMENT VARIABLES
const { _DB_HOST, _DB_NAME, _DB_USER, _DB_LANG } = process.env;

// DB CONNECTION
const db = new Sequelize( _DB_NAME, _DB_USER, '', {
  host: _DB_HOST,
  dialect: _DB_LANG,
});
// console.log(db)
// ESTABLISH CONNECTION
const connectDb = async () => {
  try {
    await db.authenticate();
    const assoc = require('../models/sequelize_associations')
    assoc()
    return {
      message: 'Connection has been established successfully.',
    };
  } catch (err) {
    return {
      message: 'Unable to connect to the database',
      error: err,
    };
  }
}

module.exports = { connectDb, db };