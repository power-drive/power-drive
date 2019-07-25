const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  country_id: {
    type: String,
    required: true
  },
  province_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  text: {
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



const district = mongoose.model("district", districtSchema);

module.exports = district;
