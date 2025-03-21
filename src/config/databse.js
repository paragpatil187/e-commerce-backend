const mongoose = require("mongoose");
require('dotenv').config()
mongoose.set('strictQuery', false) // for removing DeprecationWarning

const db_dev = process.env.DB_URL_DEV;

//databse connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db_dev);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
  }
};
module.exports = connectDB;
