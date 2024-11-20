import React from "react";
import LandingPage from "./AdminLandingPage/LandingPage";
import RegisterForm from "./LoginSignup/signupAdmin";
import LoginForm from "./LoginSignup/loginAdmin";
import BusinessForm from "./BusinessForm/AddBusinessDetails";
import LoginFormUser from "./LoginSignup/LoginUser";
import RegisterFormUser from "./LoginSignup/signupUser";
import UserLandingPage from "./UserLandingPage/UserLandingPage";
import BusinessList from "./Services/BusinessList";
import BusinessDetails from "./Services/BusinessDetails";
import BookingForm from "./Services/BookingForm";
import { ToastContainerWrapper } from "./LoginSignup/Helper/ToastNotify";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Cookies from "js-cookie";
const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = Cookies.get("role");
  console.log(userRole);

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/loginUser" replace />;
  }

  return <Outlet />;
};
const AdminProtectedRoute = () => {
  const userRole = Cookies.get("role");
  console.log(userRole);

  if (userRole !== "admin") {
    return <Navigate to="/loginAdmin" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            theme: {
              primary: "#4aed88",
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/loginAdmin" element={<LoginForm />} />
          <Route path="/signupAdmin" element={<RegisterForm />} />
          <Route path="/loginUser" element={<LoginFormUser />} />
          <Route path="/signUpUser" element={<RegisterFormUser />} />
        
          {/* User Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/userLandingPage" element={<UserLandingPage />} />
            <Route path="/BusinessList" element={<BusinessList />} />
            <Route path="/business/:id" element={<BusinessDetails />} />
            <Route path="/BookingForm" element={<BookingForm />} />
            <Route path="/forgot" element={<ForgotPassword />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/businessForm" element={<BusinessForm />} />
            {/* Add more admin-only routes here */}
          </Route>

          {/* Catch-all route for unauthorized access */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
        <ToastContainerWrapper />
      </BrowserRouter>
    </>
  );
}

// UnauthorizedPage component when users try to access restricted areas
const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
        <p className="mt-4">You do not have permission to access this page.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default App;
