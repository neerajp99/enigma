import React, { useState, useEffect } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../utils/UserPool";
import logo from "../icon.png"
import Footer from './Footer'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import validateResetForm from "../validation/Reset"
import isEmpty from "../validation/isEmpty";
import validateResetPassword from "../validation/ResetPassword"
import Spin from "../utils/Spin"

export default (props) => {
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.jwtToken) {
      props.history.push('/')
    } else {
      setLoading(false)
    }
  }, [])

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool
    });
  };

  const sendCode = event => {
    event.preventDefault();
    setEmailError("")
    const data = {
      email: email
    }
    const {isValid, errors} = validateResetForm(data);

    if (!isValid) {
      if (!isEmpty(errors.email)) {
        setEmailError(errors.email)
      }
    } else {
      getUser().forgotPassword({
        onSuccess: data => {
          console.log("onSuccess:", data);
        },
        onFailure: err => {
          // console.error("onFailure:", err);
          let newErrorMessage = err.message
          Swal.fire(
            newErrorMessage,
            'Kindly try again!',
            'error'
          )
          setPassword("")
          setConfirmPassword("")
        },
        inputVerificationCode: data => {
          console.log("Input code:", data);
          setStage(2);
        }
      });
    }
  };

  const resetPassword = event => {
    event.preventDefault();
    setPasswordError("")
    setConfirmPasswordError("")
    const data = {
      password: password,
      confirmPassword: confirmPassword 
    }

    const {isValid, errors} = validateResetPassword(data);
    if (!isValid) {
      if (!isEmpty(errors.password)) {
        setPasswordError(errors.password)
      }
      if (!isEmpty(errors.confirmPassword)) {
        setConfirmPasswordError(errors.confirmPassword)
      }
    } else {
    if (password !== confirmPassword) {
      console.error("Passwords are not the same");
      return;
    }
    getUser().confirmPassword(code, password, {
      onSuccess: data => {
        console.log("onSuccess:", data);
        Swal.fire(
          'Success!',
          'Password has been updated successfully.',
          'success'
        )
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setCode("")
        props.history.push("/login");
      },
      onFailure: err => {
        console.error("onFailure:", err);
        let newErrorMessage = err.message
        Swal.fire(
          newErrorMessage,
          'Kindly try again!',
          'error'
        )
        setPassword("")
        setConfirmPassword("")
      }
    });
  }
  };

  return (
    <section class="text-gray-400 bg-black body-font min-h-screen w-screen h-auto">
    {loading ? (<Spin />) : (
  <div class="container containerclass lg:h-screen md:h-screen  xl:h-screen">
    <div class="flex flex-wrap h-full justify-center items-center">
      <div class="box1 -mt-24 p-4 md:w-1/2 w-full sm:h-1/3 xl:h-4/5 lg:h-4/6 md:h-3/5">
      <div class="h-full p-8 rounded">
      <img className="logo-image xl:w-4/5 lg:w-4/5 md:w-3/5 w-4/5 sm:w-4/5 block mx-auto mt-10 mb-10 object-cover object-center rounded" alt="hero" src={logo}/>
      <h1 className="coming-soon title-font mb-4 text-white text-3xl text-center">	&beta; - TESTING</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-flicker sm:text-2xl"> ENIGMA</p>
        </div>
      </div>
      <div class="box rounded-lg -mt-24 p-10 md:w-1/2 w-5/6 xl:w-2/5 xs:h-full sm:h-1/3 xl:h-4/5 lg:h-4/6 md:h-3/5">
        <div class="h-full xl:p-12  rounded flex flex-wrap h-full flex justify-center items-center">
        <React.Fragment>
      {stage === 1 && (
        <form onSubmit={sendCode} >
          <h2 className="text-white text-lg title-font mb-5 text-left font-sans tracking-wide text-3xl font-normal">
            Reset Your Password
          </h2>
          <p className="text-base tracking-wide font-light font-sans text-left mt-3 text-gray-400 pb-10">
            {" "}
            We are here to help you to recover your password. Enter the email
            address you used when you joined and we will send you instructions
            to reset your password.{" "}
          </p>
          <div className="relative mb-4">
            <label
              for="email"
              className="leading-7 font-sans font-light tracking-wide float-left text-left text-sm text-gray-300"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              placeholder="eg: iamatrader@gmail.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
              name="email"
              className="w-full bg-gray-600 bg-opacity-20 font-light focus:bg-transparent font-sans my-1 focus:ring-1 focus:ring-white border border-gray-600 focus:border-white text-base outline-none text-gray-100 py-1 px-4 leading-10 transition-colors duration-200 ease-in-out"
            />
            <div className="error-div w-full text-left">
                    {emailError && <small className="tracking-wide form-text font-sans text-red-500 email-error">*{emailError}</small>}
            </div>
          </div>
          <p className="text-base tracking-wide font-light font-sans text-left mt-3 text-white">
            Remember Password? <Link to="/login"><span className="text-blue-500">Sign-In</span></Link>
          </p>
          <button className="form-button text-black bg-white border-0 py-3 my-4 w-full focus:outline-none text-lg">
            Send
          </button>
        </form>
      )}

      {stage === 2 && (
        <form onSubmit={resetPassword} className="w-full">
          <h2 className="text-white text-lg title-font mb-5 text-left font-sans tracking-wide text-3xl font-normal">
            Create New Password
          </h2>
          <p className="text-base tracking-wide font-light font-sans text-left mt-3 text-gray-400 pb-10">
            {" "}
            Kindly enter the verification code you received in your email the
            new password. Please check your spam folder if you don't see an
            email with the verification code.{" "}
          </p>
          <div className="relative mb-4">
            <label
              for="code"
              className="leading-7 font-sans font-light tracking-wide float-left text-left text-sm text-gray-300"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              placeholder="eg: 198271"
              value={code}
              onChange={event => setCode(event.target.value)}
              name="code"
              className="w-full bg-gray-600 bg-opacity-20 font-light focus:bg-transparent font-sans my-1 focus:ring-1 focus:ring-white border border-gray-600 focus:border-white text-base outline-none text-gray-100 py-1 px-4 leading-10 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              for="password"
              className="leading-7 font-sans font-light tracking-wide float-left text-left text-sm text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="eg: password123"
              value={password}
              onChange={event => setPassword(event.target.value)}
              name="password"
              className="w-full bg-gray-600 bg-opacity-20 font-light focus:bg-transparent font-sans my-1 focus:ring-1 focus:ring-white border border-gray-600 focus:border-white text-base outline-none text-gray-100 py-1 px-4 leading-10 transition-colors duration-200 ease-in-out"
            />
            <div className="error-div w-full text-left">
                    {passwordError && <small className="tracking-wide form-text font-sans text-red-500 email-error">*{passwordError}</small>}
            </div>

          </div>
          <div className="relative mb-4">
            <label
              for="confirmPassword"
              className="leading-7 font-sans font-light tracking-wide float-left text-left text-sm text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              placeholder="eg: password123"
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              name="confirmPassword"
              className="w-full bg-gray-600 bg-opacity-20 font-light focus:bg-transparent font-sans my-1 focus:ring-1 focus:ring-white border border-gray-600 focus:border-white text-base outline-none text-gray-100 py-1 px-4 leading-10 transition-colors duration-200 ease-in-out"
            />
                        <div className="error-div w-full text-left">
                    {confirmPasswordError && <small className="tracking-wide form-text font-sans text-red-500 email-error">*{confirmPasswordError}</small>}
            </div>
          </div>
          <p className="text-base tracking-wide font-light font-sans text-left mt-3 text-white">
            Remember Password? <Link to="/login"><span className="text-blue-500">Sign-In</span></Link>
          </p>
          <button className="form-button text-black bg-white border-0 py-3 my-4 w-full focus:outline-none text-lg">
            Reset
          </button>
        </form>
      )}
    </React.Fragment>
        </div>
      </div>
    </div>
  </div>
  )}
  <Footer/>
</section>

  );
};
