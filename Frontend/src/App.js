import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./AdminLandingPage/LandingPage";
import RegisterForm from "./LoginSignup/signupAdmin";
import LoginForm from "./LoginSignup/loginAdmin";
import BusinessForm from "./BusinessForm/AddBusinessDetails"
import LoginFormUser from "./LoginSignup/LoginUser";
import RegisterFormUser from "./LoginSignup/signupUser";
import UserLandingPage from "./UserLandingPage/UserLandingPage";
import BusinessList from "./Services/BusinessList";
import BusinessDetails from "./Services/BusinessDetails";
import BookingForm from "./Services/BookingForm";
import { ToastContainerWrapper } from "./LoginSignup/Helper/ToastNotify";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
function App() {
  return (
    <> 
      <Toaster
      position="top-right"
      toastOptions={{
        success:{
          theme:{
            primary:"#4aed88"
          }
        }
      }}
      ></Toaster>   
    <BrowserRouter>
      <Routes>
        {/* Admin Landing Page And Login And Signup */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginAdmin" element={<LoginForm />} />
        <Route path="/signupAdmin" element={<RegisterForm />} />
        {/* Services page */}
        <Route path="/BusinessList" element={<BusinessList />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
        <Route path="/BookingForm" element={<BookingForm />} />
        {/* User Landing Page */}
        <Route path="/userLandingPage" element={<UserLandingPage />} />
        <Route path="/loginUser" element={<LoginFormUser />} />
        <Route path="/signUpUser" element={<RegisterFormUser />} />

        {/* <Route path="/footer" element={<Footer/>}/> */}

        {/* Business Form */}
        <Route path="/businessForm" element={<BusinessForm/>}/>

        {/* Forgot Password */}
        <Route path="/forgot" element={<ForgotPassword/>}/>

      </Routes>
      <ToastContainerWrapper />
    </BrowserRouter>
    </>
  );
}
export default App;
