import React, { useState, useContext } from "react";
import rp from "request-promise";
import axios from 'axios'
import { AccountContext } from "../utils/AccountState";
import setAuthToken from "../utils/setAuthToken"

export default () => {
  const { getSession } = useContext(AccountContext);

  const fetchNumber = () => {

    getSession().then(async ({ headers }) => {
      console.log('HEADERS', headers)
      setAuthToken(headers['Authorization'], headers['x-api-key'])
      const api = "https://g1ssbxw172.execute-api.us-east-2.amazonaws.com/dev/create-profile";
    const data = { 
      "email" : "neeraj.pandey_ug21@gmail.com",
      "name": "Neeraj",
      "broker_name": "Zerodha", 
      "broker_account_id": "XKS11181",
      "interactive_api_key": "ahajajja98",
      "interactive_api_secret": "Secret151618",
      "telegram_id": "hellowoele"
    };
    // const data = {
    //   "email": "neerajyednap@gmail.com"
    // }
    axios
      .post(api, data)
      .then((response) => {
        console.log("RES", response);
      })
      .catch((error) => {
        console.log("ERR", error);
      });
    })


      // const url =
      //   "https://g1ssbxw172.execute-api.us-east-2.amazonaws.com/dev/profile";
      // console.log("HEADERS", headers);
      // const number = await rp(url, { headers });
      // console.log(number);
    // });
  };

  return (
    <div>
      <div>Random number:</div>
      <button onClick={fetchNumber}>Fetch new number</button>
    </div>
  );
};
