const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  //check if the string is not empty
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //check if email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  // //check if email is invalid
  else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  //check if password field is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  //check if the password has characters in between 6 and 30.
  else if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password should be in between 8 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};