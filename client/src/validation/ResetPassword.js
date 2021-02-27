const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateResetPassword(data) {
  let errors = {};
  //check if the string is not empty
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/ 

  //check if password field is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  // Check if password satisfy AWS Cognito specs
  if (!data.password.match(regEx)) {
    errors.password = "Password should contain a number, uppercase alphabet and a special character. "
  }
  //check if the password has characters in between 6 and 30.
  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password should be in between 8 and 30 characters";
  }
  //check if confirmPassword field is empty
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  }
  //check if confirm password field is equal to the password
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};