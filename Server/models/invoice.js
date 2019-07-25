const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new mongoose.Schema({
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "supplier",
    required: true
  },

  responded: {
    type: Boolean,
    required: true
  },

  request_path: {
    type: String,
    required: true
  },
  response_path: {
    type: String
  },

  date_created: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const invoice = mongoose.model("invoice", invoiceSchema);

module.exports = invoice;
