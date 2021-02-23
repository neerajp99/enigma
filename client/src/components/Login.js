import React, { useState, useContext } from "react";
import { AccountContext } from "../utils/AccountState";
import jwt_decode from "jwt-decode";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useContext(AccountContext);

  const onSubmit = event => {
    event.preventDefault();
    authenticate(email, password)
      .then(data => {
        console.log("Logged In!", data);
        console.log("More", data.accessToken.jwtToken);
        console.log("Haha", jwt_decode(data.accessToken.jwtToken));
      })
      .catch(error => {
        console.error("Login Failed!", error);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Email Address"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button>Log In</button>
    </form>
  );
}
export default Login;
