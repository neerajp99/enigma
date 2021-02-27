import './App.css';
import "./index.css";
import "./styles/app.css"
import logo from "./icon.png"
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import { Account } from './utils/AccountState'
import UserStatus from './components/UserStatus'
import ResetPassword from './components/ResetPassword';
import CheckApi from './components/CheckApi'
import UserAttributes from "./components/UserAttributes"
import Dashboard from "./components/dashboard/Dashboard"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./utils/AccountState";
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode";
import Spin from "./utils/Spin"
import NotFound from "./components/404"

if (localStorage.jwtToken) {
  //Decode the tokens ang get user infe ormation
  const decodedToken = jwt_decode(localStorage.jwtToken);
  //Check for expired tokens
  const currentTime = Date.now() / 1000;
  console.log(decodedToken)
  if (decodedToken.exp < currentTime) {
    // log out user
    localStorage.removeItem("jwtToken");
    // Set profile to null
    Swal.fire(
      'Session Expired!',
      'Please Login Again!',
      'info'
    )
    window.location.href = "/login";
  }
}

function App() {
  const [loading, setLoading] = useState(true)
  // const { getSession, logout } = useContext(AccountContext);
  const [status, setStatus] = useState(false);
  // useEffect(() => {
  //   getSession().then(session => {
  //     console.log("Session:", session);
  //     setStatus(true);
  //   });
  // }, []);

  return (
    <Router>
      <div className="App">
    <Account>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Dashboard} />
        <UserStatus />
    </Account>
    <Route exact path="/reset" component={ResetPassword} />
    <Route path="*" component={NotFound} />
  </div>
  </Router>
  )
}
export default App;
