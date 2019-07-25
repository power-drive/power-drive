const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const msg_outbox = require("../models/message_out");
const auth = require("../middleware/auth");

const communicationRoute = express.Router();

communicationRoute.use(bodyParser.urlencoded({ extended: false }));
communicationRoute.use(bodyParser.json());

// @route     POST api/communication/admin/send
// @desc      Send an email
// @access    Private

communicationRoute.post("/admin/send", function(req, res) {
  data = req.body;

  const msg = new msg_outbox();
  data.from = mongoose.Types.ObjectId(data.from);
  data.to = mongoose.Types.ObjectId(data.to);
  msg.collection
    .insertOne(data)
    .then(docs => {
      return res.json({
        success: true,
        email: docs.ops[0],
        msg: "Message successfully sent"
      });
    })
    .catch(err => {
      console.log(err);
    });
});

// @route     POST api/communication/admin/send
// @desc      Send an email
// @access    Private

communicationRoute.get("/admin/getsent", function(req, res) {
  data = req.body;

  msg_outbox
    .find()
    .sort("date_created -1")
    .then(docs => {
      return res.json({
        emails: docs
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = communicationRoute;
