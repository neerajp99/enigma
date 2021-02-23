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
function App() {

  return (
  <div className="App">
<section class="text-gray-400 bg-black body-font h-screen w-screen flex justify-center items-center">
  <div class="container h-screen">
    <div class="flex flex-wrap h-full justify-center items-center">
      <div class="-mt-24 p-4 md:w-1/2 w-full h-1/3 sm:h-1/3 xl:h-4/5 lg:h-4/6 md:h-3/5">
      <div class="h-full p-8 rounded">
      <img className="logo-image xl:w-4/5 lg:w-4/5 md:w-3/5 w-4/5 sm:w-4/5 block mx-auto mt-10 mb-10 object-cover object-center rounded" alt="hero" src={logo}/>
      <h1 className="coming-soon title-font mb-4 text-white text-3xl text-center">	&beta; - TESTING</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-flicker sm:text-2xl"> ENIGMA</p>
        </div>
      </div>
      <div class="box rounded-lg -mt-24 p-10 md:w-1/2 w-5/6 xl:w-2/5 h-1/3 sm:h-1/3 xl:h-4/5 lg:h-4/6 md:h-3/5">
        <div class="h-full p-12 rounded ">
        <Account>
          <UserStatus />
          <Login/>
          <CheckApi />
        </Account>
        <ResetPassword />
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</section>
  </div>
  )
}
export default App;
