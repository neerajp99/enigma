const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateResetForm(data) {
    let errors = {}
    data.email = !isEmpty(data.email) ? data.email : "";

    //#######################################
    // Using validator to validate the fields
    //#######################################

    // Check if email is invalid
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!";
    }
    // Check if email field is empty
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}