const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "supplier",
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "admin",
    required: true
  },

  msg: {
    type: String,
    required: true
  },

  attachment: {
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

const msg_inbox = mongoose.model("msg_inbox", messageSchema);

module.exports = msg_inbox;
