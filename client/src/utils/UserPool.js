import { CognitoUserPool } from "amazon-cognito-identity-js";

// Initialize cognito user pool data
const poolData = {
  UserPoolId: "us-east-2_ITjABepe9",
  ClientId: "239foct3kkrho6g16svpj9nu12"
};

export default new CognitoUserPool(poolData);
