import React, {useState, useEffect, useContext} from 'react'
import Navbar from "./Navbar"
import avatar from "../../avatar.png"
import logo from "../../icon.png"
import Footer from '../Footer'
import setAuthToken from "../../utils/setAuthToken"
import jwt_decode from "jwt-decode";
import { AccountContext } from "../../utils/AccountState";
import axios from 'axios'
import Swal from 'sweetalert2'
import Spin from "../../utils/Spin"
import validateProfileInput from "../../validation/Profile";
const isEmpty = require("../../validation/isEmpty");

export default (props) => {
    const [broker_name, setBrokerName] = useState("")
    const [broker_account_id, setBrokerAccountId] = useState("")
    const [interactive_api_key, setInteractiveBrokerKey] = useState("")
    const [interactive_api_secret, setInteractiveBrokerSecret] = useState("")
    const [telegram_id, setTelegramId] = useState("") 
    const [stage, setStage] = useState(1);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasData, setHasData] = useState(false);
    const [username, setUsername] = useState("")
    const [brokerNameError, setBrokerNameError] = useState("")
    const [brokerAccountIDError, setBrokerAccountIDError] = useState("")
    const [brokerAPIKeyError, setBrokerAPIKeyError] = useState("")
    const [brokerAPISecretError, setAPISecretError] = useState("")
    const [telegramIDError, setTelegramError] = useState("")

    const logoutClick = () => {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      props.history.push('/login')
    }

    useEffect(() => {
      getSession().then(async({headers}) => {
        console.log('GET HEADERS', headers)
        setAuthToken(headers['Authorization'], headers['x-api-key'])
        const decoded_token = jwt_decode(headers['Authorization'])
        const data = {
          "email": decoded_token.email
        }
        const api = "https://g1ssbxw172.execute-api.us-east-2.amazonaws.com/dev/profile";
        axios
          .post(api, data)
          .then((response) => {
            let values = JSON.parse(response.data.body);
            if (Object.keys(values).length === 1) {
              setUsername(decoded_token['custom:name'])
              setLoading(false);
            } else {
              setBrokerName(values.broker_name)
              setBrokerAccountId(values.broker_account_id)
              setInteractiveBrokerKey(values.interactive_api_key)
              setInteractiveBrokerSecret(values.interactive_api_secret)
              setTelegramId(values.telegram_id)
              setUsername(decoded_token['custom:name'])
              setHasData(true)
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log("ERR", error);
          });
        console.log(data)
      })
    }, [])

    useEffect(() => {
      if(localStorage.jwtToken) {
        if (jwt_decode(localStorage.jwtToken)) {
          setStatus(true)
        } else {
          setStatus(false)
          props.history.push('/login')
        }
      }else {
        setStatus(false)
        props.history.push('/login')
      }
    })
    const { getSession } = useContext(AccountContext);
    const postDetails = (event) => {
      event.preventDefault()
      getSession().then(async ({ headers }) => {
        console.log('HEADERS', headers)
        setAuthToken(headers['Authorization'], headers['x-api-key'])
        const api = "https://g1ssbxw172.execute-api.us-east-2.amazonaws.com/dev/create-profile";
        const data = {
          "jwt": headers['Authorization'],
          "email": localStorage.user_email,
          "client_name": localStorage.username,
          "broker_name": broker_name, 
          "broker_account_id": broker_account_id,
          "interactive_api_key": interactive_api_key,
          "interactive_api_secret": interactive_api_secret,
          "telegram_id": telegram_id
        }

        const { isValid, errors } = validateProfileInput(data);

        if (!isValid) {
          if (!isEmpty(errors.brokerName)) {
            setBrokerNameError(errors.brokerName)
          }
          if (!isEmpty(errors.brokerAccountID)) {
            setBrokerAccountIDError(errors.brokerAccountID)
          }
          if (!isEmpty(errors.brokerAPIKey)) {
            setBrokerAPIKeyError(errors.brokerAPIKey)
          }
          if (!isEmpty(errors.brokerAPISecret)) {
            setAPISecretError(errors.brokerAPISecret)
          }
          if (!isEmpty(errors.telegramID)) {
            setTelegramError(errors.telegramID)
          }
        } else {
        axios
          .post(api, data)
          .then((response) => {
            console.log('RS', response)
            if (response.data === null ) {
              Swal.fire(
                'Successful!',
                'Your details have been received.',
                'success'
              )
            } else {
              Swal.fire(
                'Not Allowed!',
                'You are not a registered beta tester',
                'info'
              )
            }
          })
          .catch((error) => {
            console.log("ERR", error);
            let newErrorMessage = error.message
            Swal.fire(
              newErrorMessage,
              'Kindly try again!',
              'error'
            )
          });
        }
        })
    };

    return (
 <section class="text-gray-400 bg-black body-font min-h-screen w-screen h-auto">
 {loading ? (
          <Spin />
        ) : (
  <div class="container containerclass lg:h-screen md:h-screen  xl:h-screen">
    <div class="flex flex-wrap h-full justify-center items-center">
      <div class="box1 -mt-24 p-4 md:w-1/2 w-full sm:h-1/3 xl:h-4/5 lg:h-4/6 md:h-3/5">
      <div class="h-full p-8 rounded">
      <img className="logo-image xl:w-4/5 lg:w-4/5 md:w-3/5 w-4/5 sm:w-4/5 block mx-auto mt-10 mb-10 object-cover object-center rounded" alt="hero" src={logo}/>
      <h1 className="coming-soon title-font mb-4 text-white text-3xl text-center">	Hi, {username}!</h1>
            <button className="inline-flex mt-6 items-center navbar border-0 py-4 px-8 text-white focus:outline-none hover:bg-gray-700 rounded text-base" onClick={logoutClick}>Logout
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
        </div>
      </div>
      <div class="box rounded-lg -mt-24 p-10 md:w-1/2 w-5/6 h-auto xl:w-2/5 xs:h-full sm:h-1/3 xl:h-full lg:h-4/6 md:h-3/5">
        <div class="h-full xl:p-12  rounded flex flex-wrap h-full flex justify-center items-center">
        <React.Fragment>
        {stage === 1 && (
        <form  onSubmit={postDetails} noValidate className="w-full">
        {/* Broker Name  */}
          <div className="relative mb-4">
            <label
              for="broker_name"
              className="leading-7 font-sans font-light tracking-wide float-left text-left text-sm text-gray-300"
            >
              * Broker Name
            </label>
            <input
              type="text"
              id="broker_name"
              placeholder="eg: iamatrader@gmail.com"
              name="broker_name"
              value={broker_name}
              onChange={event => setBrokerName(event.target.value)}
              className="w-full bg-gray-600 bg-opacity-20 font-light focus:bg-transparent font-sans my-1 focus:ring-1 focus:ring-white border border-gray-600 focus:border-white text-base outline-none text-gray-100 py-1 px-4 leading-10 transition-colors duration-200 ease-in-out"
            />
            <div className="error-div w-full text-left">
                    {brokerNameError && <small className="tracking-wide form-text font-sans text-red-500 email-error">*{brokerNameError}</small>}
      </div>
          </div>
        {/* Broker Account ID  */}
          <div className="relative mb-4">
            <label
              for="broker_account_id"
              className="leading-7 font-sans font-light tracking-wide float-left text-left text-sm text-gray-300"
            >
              * Broker Account ID
            </label>
            <input
              type="text"
              id="broker_account_id"
              value={broker_account_id}
              onChange={event => setBrokerAccountId(event.target.value)}
              placeholder="eg: iamatrader@gmail.com"
              name="broker_account_id"
              className="w-full bg-gray-600 bg-opacity-20 font-light focus:bg-transparent font-sans my-1 focus:ring-1 focus:ring-white border border-gray-600 focus:border-white text-base outline-none text-gray-100 py-1 px-4 leading-10 transition-colors duration-200 ease-in-out"
            />
            <div className="error-div w-full text-left">
                    {brokerAccountIDError && <small className="tracking-wide form-text font-sans text-red-500 email-error">*{brokerAccountIDError}</small>}
      </div>
          </div>
          {/* Interactive API Key  */}
          <div className="relative mb-4">
            <label
              for="interactive_api_key"
              className="leading-7 font-sans font-light tracking-wide float-left text-left text-sm text-gray-300"
            >
              * Broker API key
            </label>
            <input
              type="text"
              id="interactive_api_key"
              placeholder="eg: iamatrader@gmail.com"
              value={interactive_api_key}
              onChange={event => setInteractiveBrokerKey(event.target.value)}
              name="interactive_api_key"
              className="w-full bg-gray-600 bg-opacity-20 font-light focus:bg-transparent font-sans my-1 focus:ring-1 focus:ring-white border border-gray-600 focus:border-white text-base outline-none text-gray-100 py-1 px-4 leading-10 transition-colors duration-200 ease-in-out"
            />
            <div className="error-div w-full text-left">
                    {brokerAPIKeyError && <small className="tracking-wide form-text font-sans text-red-500 email-error">*{brokerAPIKeyError}</small>}
      </div>
          </div>
    {/* Interactive API Secret  */}
          <div className="relative mb-4">
            <label
              for="interactive_api_secret"
              className="leading-7 font-sans font-light tracking-wide float-left text-left text-sm text-gray-300"
            >
              * Broker API Secret
            </label>
            <input
              type="text"
              id="interactive_api_secret"
              placeholder="eg: iamatrader@gmail.com"
              name="interactive_api_secret"
              value={interactive_api_secret}
              onChange={event => setInteractiveBrokerSecret(event.target.value)}
              className="w-full bg-gray-600 bg-opacity-20 font-light focus:bg-transparent font-sans my-1 focus:ring-1 focus:ring-white border border-gray-600 focus:border-white text-base outline-none text-gray-100 py-1 px-4 leading-10 transition-colors duration-200 ease-in-out"
            />
            <div className="error-div w-full text-left">
                    {brokerAPISecretError && <small className="tracking-wide form-text font-sans text-red-500 email-error">*{brokerAPISecretError}</small>}
      </div>
          </div>
            {/* Telegram ID  */}
          <div className="relative mb-4">
            <label
              for="telegram_id"
              className="leading-7 font-sans font-light tracking-wide float-left text-left text-sm text-gray-300"
            >
              * Telegram ID
            </label>
            <input
              type="text"
              id="telegram_id"
              placeholder="eg: jareenyednap"
              name="telegram_id"
              value={telegram_id}
              onChange={event => setTelegramId(event.target.value)}
              className="w-full bg-gray-600 bg-opacity-20 font-light focus:bg-transparent font-sans my-1 focus:ring-1 focus:ring-white border border-gray-600 focus:border-white text-base outline-none text-gray-100 py-1 px-4 leading-10 transition-colors duration-200 ease-in-out"
            />
            <div className="error-div w-full text-left">
                    {telegramIDError && <small className="tracking-wide form-text font-sans text-red-500 email-error">*{telegramIDError}</small>}
      </div>
          </div>
          <button className="form-button text-black bg-white border-0 py-3 my-4 w-full focus:outline-none text-lg">
            {!hasData ? "Create Profile" : "Update Profile" }
          </button>
        </form>
        )}
        {/* {stage === 2 && (
        )} */}
        </React.Fragment>
        </div>
      </div>
    </div>
  </div>
  )}
  <Footer/>
</section>

        
    )
}