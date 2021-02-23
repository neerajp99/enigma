const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}
exports.handler = async (event, context, callback) => {
  const table = "userDetails";

  const newDocument = {
    client_name: event.name,
    email: event.email,
    broker_name: event.broker_name,
    broker_account_id: event.broker_account_id,
    interactive_api_key: event.interactive_api_key,
    interactive_api_secret: event.interactive_api_secret,
    telegram_id: event.telegram_id
  };

  const params = {
    TableName: table,
    Item: newDocument
  };

  return db
    .put(params)
    .promise()
    .then(() => {
      callback(null, response(201, newDocument));
    })
    .catch(err => response(null, response(err.statusCode, err)));
};
