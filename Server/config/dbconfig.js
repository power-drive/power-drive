const mongoose = require("mongoose");
const config = require("config");

dbconnection = () => {
  mongoose.connect(config.get("mongoURI"));
  let db = mongoose.connection;

  //Check for connection
  db.once("open", () => {
    useNewUrlParser: true;
    useCreateIndex: true;
  })
    .then(() => {
      console.log("Connected to the database");
    })
    .catch(err => console.log(err));
};

module.exports = dbconnection;

