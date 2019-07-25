const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({

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

const countries = [
  {name: "South Africa", text: "", date_created : new Date(), flag: ""},
  {name: "Zimbabwe", text: "", date_created : new Date(), flag: ""},
  {name: "LeSotho", text: "", date_created : new Date(), flag: ""},
  {name: "Tanzania", text: "", date_created : new Date(), flag: ""},
]

const country = mongoose.model("country", countrySchema);

module.exports =  country;
