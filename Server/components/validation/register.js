const Validator = require("validator");
const isEmpty = require("is-empty");
const moment = require("moment");

class Register {
  teacher(data) {
    let errors = Array();
    let fnum = data.formNum;

    if (fnum == 0) {
      data.name.first = !isEmpty(data.name.first) ? data.name.first : "";
      data.name.last = !isEmpty(data.name.last) ? data.name.last : "";
      data.email = !isEmpty(data.email) ? data.email : "";
      data.phone = !isEmpty(data.phone) ? data.phone : "";

      // CHECK First NAME
      if (Validator.isEmpty(data.name.first)) {
        errors.push({ msg: "First Name is required" });
      } else if (!Validator.isAlpha(data.name.first)) {
        errors.push({ msg: "Name cannot have special characters or numbers" });
      }

      //CHECK Last NAME
      if (Validator.isEmpty(data.name.last)) {
        errors.push({ msg: "Last Name is required" });
      } else if (!Validator.isAlpha(data.name.last)) {
        errors.push({ msg: "Name cannot have special characters or numbers" });
      }
      // CHECK EMAIL
      if (Validator.isEmpty(data.email)) {
        errors.push({ msg: "Email is required" });
      } else if (!Validator.isEmail(data.email)) {
        errors.push({ msg: "Email is invalid" });
      } else {
      }

      // CHECK NUMBER
      if (Validator.isEmpty(data.phone)) {
        errors.push({ msg: "Phone number is required" });
      } else if (!Validator.isMobilePhone(data.phone)) {
        errors.push({ msg: "Incorrect phone number format" });
      } else {
      }
    } else if (fnum == 1) {
      let { school_id, internet_access, devices } = data;
      let { country_id, province_id, district_id } = data.location;

      internet_access = !isEmpty(internet_access) ? internet_access : "";
      devices = !isEmpty(devices) ? devices : "";
      country_id = !isEmpty(country_id) ? country_id : "";
      province_id = !isEmpty(province_id) ? province_id : "";
      district_id = !isEmpty(district_id) ? district_id : "";
      school_id = !isEmpty(school_id) ? school_id : "";

      // CHECK COUNTRY
      if (Validator.isEmpty(country_id)) {
        errors.push({ msg: " Country is required" });
      }
      //CHECK PROVINCE
      if (Validator.isEmpty(province_id)) {
        errors.push({ msg: " Province is required" });
      }
      // CHECK DISTRICT

      if (Validator.isEmpty(district_id)) {
        errors.push({ msg: "District is required" });
      }

      // CHECK SCHOOL_NAME
      if (Validator.isEmpty(school_id)) {
        errors.push({ msg: "School is required" });
      }

      //INTERNET_ACCESS
      if (Validator.isEmpty(internet_access)) {
        errors.push({ msg: "Internet Access field is required" });
      }

      // DEVICES
      if (devices.constructor !== Array) {
        if (Validator.isEmpty(devices)) {
          errors.push({ msg: "Devices field is required" });
        }
      } else {
        if (devices.length === 0) {
          errors.push({ msg: "Devices field is required" });
        }
      }
    } else if (fnum == 2) {
      data.password = !isEmpty(data.password) ? data.password : "";
      data.password2 = !isEmpty(data.password2) ? data.password2 : "";

      // CHECK PASSWORD
      if (Validator.isEmpty(data.password)) {
        errors.push({ msg: "Password is required" });
      }
      if (Validator.isEmpty(data.password2)) {
        errors.push({ msg: "Confirm password field is required" });
      }
      if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.push({ msg: "Password must be at least 6 characters" });
      }
      if (!Validator.equals(data.password, data.password2)) {
        errors.push({ msg: "Passwords must match" });
      }

      // CHECK TERMS

      if (!data.terms) {
        errors.push({ msg: "You need to accept the terms and conditions" });
      }
    } else {
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  /****** STUDENT VALIDATION *****/

  student(data) {
    let errors = Array();

    data.name.first = !isEmpty(data.name.first) ? data.name.first : "";
    data.name.last = !isEmpty(data.name.last) ? data.name.last : "";
    data.name.nickname = !isEmpty(data.name.nickname) ? data.name.nickname : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";
    data.dob = !isEmpty(data.dob) ? data.dob : "";
    data.nationality = !isEmpty(data.nationality) ? data.nationality : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.guardian.name = !isEmpty(data.guardian.name) ? data.guardian.name : "";
    data.guardian.phone = !isEmpty(data.guardian.phone)
      ? data.guardian.phone
      : "";
    data.emergency_phone = !isEmpty(data.emergency_phone)
      ? data.emergency_phone
      : "";

    // CHECK First NAME
    if (Validator.isEmpty(data.name.first)) {
      errors.push({ msg: "First Name is required" });
    } else if (!Validator.isAlpha(data.name.first)) {
      errors.push({
        msg:
          "First Name contains certain characters that aren't allowed. e.g digits"
      });
    }

    //CHECK Last NAME
    if (Validator.isEmpty(data.name.last)) {
      errors.push({ msg: "Last Name is required" });
    } else if (!Validator.isAlpha(data.name.last)) {
      errors.push({
        msg:
          "Last Name contains certain characters that aren't allowed. e.g digits"
      });
    }

    //CHECK Last NICKNAME
    if (Validator.isEmpty(data.name.nickname)) {
      errors.push({ msg: "nickname Name is required" });
    } else if (!Validator.isAlpha(data.name.nickname)) {
      errors.push({
        msg:
          "Nickname contains certain characters that aren't allowed. e.g digits"
      });
    }
    // CHECK GENDER
    if (Validator.isEmpty(data.gender)) {
      errors.push({ msg: "Student's gender is required" });
    }

    // CHECK DOB
    if (Validator.isEmpty(data.dob)) {
      errors.push({ msg: "Date of birth is required" });
    } else if (
      data.dob == moment().format("YYYY-MM-DD") ||
      data.dob >
        moment()
          .subtract(1, "month")
          .format("YYYY-MM-DD")
    ) {
      errors.push({ msg: "The student must be at least one month old " });
    }

    //CHECK NICKNAME
    if (Validator.isEmpty(data.nationality)) {
      errors.push({ msg: "Student's nationality is required" });
    } else if (!Validator.isAlpha(data.nationality)) {
      errors.push({
        msg:
          "Nationality contains certain characters that aren't allowed. e.g digits"
      });
    }

    // CHECK ADDRESS
    if (Validator.isEmpty(data.address)) {
      errors.push({ msg: "Student's residential address is required" });
    } else if (data.address.length < 12) {
      errors.push({ msg: "Address is too short to be true." });
    }

    //CHECK GUARDIAN NAME
    if (Validator.isEmpty(data.guardian.name)) {
      errors.push({ msg: "Guardian Full name is required" });
    }
    // else if (!Validator.isAlpha(data.guardian.name)) {
    //   errors.push({
    //     msg:
    //       "Guardian name contains certain characters that aren't allowed. e.g digits"
    //   });
    // }

    // CHECK GUARDIAN PHONE
    if (Validator.isEmpty(data.guardian.phone)) {
      errors.push({ msg: "Guardian phone number is required" });
    } else if (!Validator.isMobilePhone(data.guardian.phone)) {
      errors.push({ msg: "Guardian: incorrect phone number format" });
    } else {
    }

    //  CHECK EMERGENCY PHONE
    if (Validator.isEmpty(data.emergency_phone)) {
      errors.push({ msg: "Emergency Phone number is required" });
    } else if (!Validator.isMobilePhone(data.emergency_phone)) {
      errors.push({ msg: "Emergency_phone: incorrect phone number format" });
    } else {
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}

module.exports = Register;
