const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  //check if the string is not empty
  data.broker_name = !isEmpty(data.broker_name) ? data.broker_name : "";
  data.broker_account_id = !isEmpty(data.broker_account_id) ? data.broker_account_id : "";
  data.interactive_api_key = !isEmpty(data.interactive_api_key) ? data.interactive_api_key : "";
  data.interactive_api_secret = !isEmpty(data.interactive_api_secret) ? data.interactive_api_secret : "";
  data.telegram_id = !isEmpty(data.telegram_id) ? data.telegram_id : "";

   //check if the name field is empty
   if (Validator.isEmpty(data.broker_name)) {
    errors.brokerName = "Broker Name field is required";
  }
  //check if the name field is empty
  if (Validator.isEmpty(data.broker_account_id)) {
    errors.brokerAccountID = "Broker Account ID field is required";
  }
  //check if the name field is empty
  if (Validator.isEmpty(data.interactive_api_key)) {
    errors.brokerAPIKey = "Broker API Key field is required";
  }
  //check if the name field is empty
  if (Validator.isEmpty(data.interactive_api_secret)) {
    errors.brokerAPISecret = "Broker API Secret field is required";
  }
  //check if the name field is empty
  if (Validator.isEmpty(data.telegram_id)) {
    errors.telegramID = "Telegram ID field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};