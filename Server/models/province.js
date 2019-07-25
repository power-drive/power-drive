const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  country_id: {
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



const province = mongoose.model("province", provinceSchema);

module.exports = province;
