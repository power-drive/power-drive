const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const quotation = require("../models/quotation");
const invoice = require("../models/invoice");
const Nexmo = require("nexmo");
const admin_authRoute = express.Router();

admin_authRoute.use(bodyParser.urlencoded({ extended: false }));
admin_authRoute.use(bodyParser.json());

const nexmo = new Nexmo({
  apiKey: "605bc007",
  apiSecret: "6XK4wTYOkoe5fgJ8"
});

// @route     GET api/teacher/data
// @desc      Get User Profile
// @access    Private

admin_authRoute.post("/newquotation", (req, res) => {
  const data = req.body;

  const Q = new quotation(data);

  Q.save()
    .then(docs => {
      nexmo.message.sendSms(
        "PowerDrive",
        `${"+263"}772853166`,
        `QUOTATION REQUEST. Deadline: ${data.deadline}`,
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            if (responseData.messages[0]["status"] === "0") {
              console.log("Message sent successfully.");
            } else {
              console.log(
                `Message failed with error: ${
                  responseData.messages[0]["error-text"]
                }`
              );
              return res.status(400).json({
                msg: "Supplier Registered but failed to send an SMS"
              });
            }
          }
        }
      );
      return res.json({
        msg: "Quotation Successfully Requested"
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        msg: "Quotation Request Fail"
      });
    });
});

admin_authRoute.get("/getquotations", (req, res) => {
  quotation
    .find()
    .populate("supplier")
    .sort(" date_created -1")
    .then(docs => {
      return res.json(docs);
    })
    .catch(err => {
      console.log(err);

      return res.status(400).json({
        msg: "Server Error"
      });
    });
});

admin_authRoute.post("/updatequotation", (req, res) => {
  const _id = req.body._id;
  const response_path = req.body.response_path;

  quotation
    .findByIdAndUpdate(
      { _id },
      { $set: { responded: true, response_path: response_path } }
    )
    .then(docs => {
      return res.json({ msg: "Response Successfully Sent" });
    })
    .catch(err => {
      console.log(err);

      return res.status(400).json({
        msg: "Server Error"
      });
    });
});

admin_authRoute.post("/newinvoice", (req, res) => {
  const data = req.body;

  const Q = new invoice(data);

  Q.save()
    .then(docs => {
      nexmo.message.sendSms(
        "PowerDrive",
        `${"+263"}772853166`,
        `IVOICE REQUEST. Deadline: ${data.deadline}`,
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            if (responseData.messages[0]["status"] === "0") {
              console.log("Message sent successfully.");
            } else {
              console.log(
                `Message failed with error: ${
                  responseData.messages[0]["error-text"]
                }`
              );
              return res.status(400).json({
                msg: "Supplier Registered but failed to send an SMS"
              });
            }
          }
        }
      );
      return res.json({
        msg: "Invoice Successfully Requested"
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        msg: "Invoice Request Fail"
      });
    });
});

admin_authRoute.get("/getinvoices", (req, res) => {
  invoice
    .find()
    .populate("supplier")
    .sort(" date_created -1")
    .then(docs => {
      return res.json(docs);
    })
    .catch(err => {
      console.log(err);

      return res.status(400).json({
        msg: "Server Error"
      });
    });
});

admin_authRoute.post("/updateinvoice", (req, res) => {
  const _id = req.body._id;
  const response_path = req.body.response_path;

  invoice
    .findByIdAndUpdate(
      { _id },
      { $set: { responded: true, response_path: response_path } }
    )
    .then(docs => {
      return res.json({ msg: "Response Successfully Sent" });
    })
    .catch(err => {
      console.log(err);

      return res.status(400).json({
        msg: "Server Error"
      });
    });
});

module.exports = admin_authRoute;
