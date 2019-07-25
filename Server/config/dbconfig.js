const mongoose = require("mongoose");
const config = require("config");

dbconnection = () => {
  mongoose.connect(process.env.MONGOURI || config.get("mongoURI"));
  let db = mongoose.connection;

  //Check for connection
  db.then(() => {
    console.log("Connected to the database");
  }).catch(err => console.log(err));
};

module.exports = dbconnection;
