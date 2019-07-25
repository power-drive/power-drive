const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  image: {
    type: String
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  // id_number: {
  //     type: String,
  //     required: true
  // },
  // ec_number:{
  //     type: String
  // },
  address: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  experience: {
    ecd: {
      type: String
    },
    other: {
      type: String
    }
  },
  school_id: {
    type: String,
    required: true
  },
  class_id: {
    type: String
  },
  internet_access: {
    type: String
  },
  devices: {
    type: Array()
  },
  date_created: {
    type: Date,
    required: true
  },

  date_modified: {
    type: Date
  },
  reset_code: {
    type: Number
  },
  token: {
    type: String
  },
  token_timestamp: {
    type: Date
  },
  token_live: {
    type: Boolean
  },

  active: {
    type: Boolean,
    required: true
  },
  design_type: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
