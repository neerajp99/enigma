import React, { useState, useEffect } from "react";
import UserPool from "../utils/UserPool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { Link } from "react-router-dom";
import logo from "../icon.png"
import Footer from './Footer'
import validateRegisterInput from "../validation/Register";
import isEmpty from "../validation/isEmpty";
import Swal from 'sweetalert2'
import Spin from "../utils/Spin"
function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("")
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

  const onSubmit = event => {
    event.preventDefault();
    setEmailError("")
    setPasswordError("")
    setNameError("")
    setConfirmPasswordError("")
    // Validate input values 
    const data = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword 
    }

    const { isValid, errors } = validateRegisterInput(data)
    console.log(errors)
    // Check for type errors 
    if (!isValid) {
      if (!isEmpty(errors.name)) {
        setNameError(errors.name)
      }
      if (!isEmpty(errors.email)) {
        setEmailError(errors.email)
      }
      if (!isEmpty(errors.password)) {
        setPasswordError(errors.password)
      }
      if(!isEmpty(errors.confirmPassword)) {
        setConfirmPasswordError(errors.confirmPassword)
      }
    } else {
    const clientName = {
      Name: "custom:name",
      Value: name
    };
    UserPool.signUp(
      email,
      password,
      [new CognitoUserAttribute(clientName)],
      null,
      (error, data) => {
        if (error) {
          console.log(error);
          if (error.code !== undefined) {
            let newError = error.code 
            let newErrorMessage = error.message
            Swal.fire(
              newErrorMessage,
              'Kindly try again!',
              'error'
            )
            setEmail("")
            setPassword("")
            setName("")
            setConfirmPassword("")
          }
        }
        Swal.fire(
          'Successfully Registered!',
          'Please check your email address to confirm the verification.',
          'success'
        )
        setEmail("")
        setPassword("")
        props.history.push("/login");
        console.log(data);
      }
    );
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
          <form onSubmit={onSubmit} className="w-full">
      <h2 className="text-white text-lg pb-2 title-font mb-5 text-left font-sans tracking-wide text-3xl font-normal">
        Register for Beta Testing
      </h2>
      <div className="relative mb-4">
        <label
          for="name"
          className="leading-7 font-sans font-light tracking-wide float-left text-left text-sm text-gray-300"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="eg: Jareen Yednap"
          value={name}
          onChange={event => setName(event.target.value)}
          name="name"
          className="w-full bg-gray-600 bg-opacity-20 font-light focus:bg-transparent font-sans my-1 focus:ring-1 focus:ring-white border border-gray-600 focus:border-white text-base outline-none text-gray-100 py-1 px-4 leading-10 transition-colors duration-200 ease-in-out"
        />
        <div className="error-div w-full text-left">
                    {nameError && <small className="tracking-wide form-text font-sans text-red-500 email-error">*{nameError}</small>}
        </div>
      </div>
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
      <button className="form-button text-black bg-white border-0 py-3 my-4 w-full focus:outline-none text-lg">
        Register
      </button>
      <p className="text-base tracking-wide font-light font-sans text-left mt-3 text-white">
        Already have an account? <Link to="/login"><span className="font-medium text-blue-500">Sign-In</span></Link>
      </p>
    </form>
          </div>
        </div>
      </div>
    </div>
  )}
    <Footer/>
  </section>
  );
}
export default Register;
