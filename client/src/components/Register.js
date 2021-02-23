import React, { useState } from "react";
import UserPool from "../utils/UserPool";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    UserPool.signUp(email, password, [], null, (error, data) => {
      if (error) {
        console.log(error);
      }
      console.log(data);
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
      <button>Submit</button>
    </form>
  );
}
export default Register;
