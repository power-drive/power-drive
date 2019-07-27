const express = require("express");
const bodyParser = require("body-parser");
var multer = require("multer");

const uploadRoute = express.Router();

uploadRoute.use(bodyParser.urlencoded({ extended: false }));
uploadRoute.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single("file");

uploadRoute.post("/file", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ error: err, msg: "Failed to Upload the file. Try again " });
    } else if (err) {
      return res
        .status(500)
        .json({ error: err, msg: "Failed to Upload the file. Try again" });
    }
    return res
      .status(200)
      .json({ file: req.file, msg: "File Successfully Uploaded" });
  });
});
module.exports = uploadRoute;
