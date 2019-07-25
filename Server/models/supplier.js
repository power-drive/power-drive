const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },
  cartegory: {
    type: String,
    required: true
  },

  reg_number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },

  director: {
    type: String,
    required: true
  },

  sales_contact: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  date_created: {
    type: Date,
    default: Date.now,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

const supplier = mongoose.model("supplier", supplierSchema);

module.exports = supplier;
