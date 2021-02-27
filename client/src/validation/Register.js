const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  //check if the string is not empty
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/ 

  //check if name is of less than 2 characters or more than 30 characters
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be in between 2 and 30 characters";
  }
   //check if the name field is empty
   if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  
  //check if email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  // //check if email is invalid
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

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