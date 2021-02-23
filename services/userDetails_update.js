const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}
exports.handler = async (event, context, callback) => {
  const email = event.email;
  const client_name = event.client_name;
  const broker_name = event.broker_name;
  const broker_account_id = event.broker_account_id;
  const interactive_api_key = event.interactive_api_key;
  const interactive_api_secret = event.interactive_api_secret;
  const telegram_id = event.telegram_id;
  const table = "userDetails";

  const params = {
    Key: {
      email: email
    },
    TableName: table,
    ConditionExpression: "attribute_exists(email)",
    UpdateExpression:
      "set broker_name = :bn, client_name = :n, broker_account_id = :bai, interactive_api_key = :iak, interactive_api_secret = :ias, telegram_id = :ti",
    ExpressionAttributeValues: {
      ":n": client_name,
      ":bn": broker_name,
      ":bai": broker_account_id,
      ":iak": interactive_api_key,
      ":ias": interactive_api_secret,
      ":ti": telegram_id
    },
    ReturnValues: "UPDATED_NEW"
  };

  return db
    .update(params)
    .promise()
    .then(res => {
      console.log("Response: ", res);
      callback(null, response(200, res.Attributes));
    })
    .catch(error => callback(null, response(error.statusCode, error)));
};
