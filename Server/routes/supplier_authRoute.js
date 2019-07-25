const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const supplier = require("../models/supplier");
const regValidation = require("../components/validation/register");
const loginValidation = require("../components/validation/login");
const auth = require("../middleware/auth");
const supplier_authRoute = express.Router();
const Nexmo = require("nexmo");
supplier_authRoute.use(bodyParser.urlencoded({ extended: false }));
supplier_authRoute.use(bodyParser.json());

const nexmo = new Nexmo({
  apiKey: "e208ab9f",
  apiSecret: "MzMe5LildebyhoO7"
});

// @route     POST api/supplier/new
// @desc      Register new supplier
// @access    Public
supplier_authRoute.post("/new", (req, res) => {
  const data = req.body;

  supplier
    .findOne({ reg_number: data.reg_number })
    .then(docs => {
      if (docs) {
        return res.status(400).json({ msg: "Supplier already registered." });
      } else {
        data.password = Math.random()
          .toString(36)
          .slice(2);

        Supplier = new supplier(data);

        Supplier.save()
          .then(docs => {
            nexmo.message.sendSms(
              "PowerDrive",
              `${"+263"}783248962`,
              `Your PowerDrive password is ${data.password}`,
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
              msg: "New Supplier Succesfully Registered"
            });
          })
          .catch(err => {
            console.log(err);
            return res.status(400).json({
              msg: "Server Error"
            });
          });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        msg: "Server Error"
      });
    });
});

supplier_authRoute.post("/login", (req, res) => {
  const data = req.body;

  supplier
    .findOne({
      $and: [{ reg_number: data.username }, { password: data.password }]
    })
    .then(docs => {
      if (docs) {
        return res.json(docs);
      } else {
        return res.status(400).json({
          msg: "Incorrect Username/password"
        });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        msg: "Server Error"
      });
    });
});

supplier_authRoute.get("/getlist", (req, res) => {
  supplier
    .find()
    .then(docs => {
      return res.json(docs);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        msg: "There was an Error in fetching Suppliers"
      });
    });
});

// // @route     POST api/teacher/login
// // @desc      Teacher Login
// // @access    Public
// supplier_authRoute.post("/login", (req, res) => {
//   let data = req.body;

//   let validation = new loginValidation();
//   let { errors, isValid } = validation.teacher(data);

//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   teacher_waiting
//     .findOne({ $or: [{ email: data.email }, { phone: data.email }] })
//     .then(docs => {
//       if (!docs) {
//         return res.status(400).json("Account does not exist");
//       }

//       // Check password
//       bcrypt.compare(data.password, docs.password).then(isMatch => {
//         if (!isMatch) {
//           return res.status(400).json("Password incorrect");
//         } else {
//           //CHECK IF ACTIVE
//           // if(!docs.active){
//           //   return res.status(400).json({ email: "Account is not active" });
//           // }

//           // Teacher matched
//           // Create JWT Payload
//           const payload = {
//             id: docs._id
//           };

//           // Sign token
//           jwt.sign(
//             payload,
//             config.get("jwtSecret"),
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               if (err) throw err;
//               res.json({
//                 token: token,
//                 user: docs
//               });
//             }
//           );
//         }
//       });
//     });
// });

// // @route     GET api/teacher/data
// // @desc      Get User Data
// // @access    Private

// supplier_authRoute.get("/data", auth, (req, res) => {
//   teacher_waiting
//     .findById(req.teacher.id)
//     .select("_id name  class school location")
//     .then(user => {
//       return res.json({
//         _id: user._id,
//         name: user.name,
//         class_id: user.class,
//         school_id: user.school,
//         location: user.location
//       });
//     });
// });

// // @route     GET api/teacher/data
// // @desc      Get User Data

// // @access    Private

// supplier_authRoute.get("/logout", auth, (req, res) => {
//   teacher.findById(req.teacher.id).then(user => {
//     return res.json({ logout: true });
//   });
// });

// // @route     GET api/teacher/data
// // @desc      Get User Profile
// // @access    Private

// supplier_authRoute.get("/profile", auth, (req, res) => {
//   teacher_waiting
//     .findById(req.teacher.id)
//     .populate(
//       "school class location.province location.district location.country"
//     )
//     .select("-password")
//     .then(docs => {
//       return res.json({
//         profile: docs
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

module.exports = supplier_authRoute;
