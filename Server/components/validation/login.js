const Validator = require("validator");
const isEmpty = require("is-empty");

class Login {
  teacher(data) {
    let errors = Array();

    data.email = !isEmpty(data.email)? data.email:"";
    data.password = !isEmpty(data.password)? data.password:"";

    // CHECK EMAIL

    if (Validator.isEmpty(data.email)) {
        errors.push("Email is required");

      } else if (!Validator.isEmail(data.email)) {
        errors.push("Email is invalid");

      }else{}

    // CHECK PASSWORD
 if (Validator.isEmpty(data.password)) {
    errors.push("Password is required");
  }
return ({
    errors,
    isValid: isEmpty(errors)
})
  }

}

module.exports = Login