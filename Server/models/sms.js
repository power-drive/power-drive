const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "admin",
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "supplier",
    required: true
  },

  msg: {
    type: String,
    required: true
  },

  date_created: {
    type: Date,
    required: true
  },

  flag: {
    type: String
  }
});

const message = mongoose.model("massage", messageSchema);

module.exports = message;
