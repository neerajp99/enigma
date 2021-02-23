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

  const params = {
    Key: {
      email: event.email
    },
    TableName: table
  };

  return db
    .get(params)
    .promise()
    .then(res => {
      if (res.Item) callback(null, response(200, res.Item));
      else callback(null, response(404, { error: "Post not found" }));
    })
    .catch(err => callback(null, response(err.statusCode, err)));
};
