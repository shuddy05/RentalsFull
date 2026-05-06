import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const ScrollToTop = lazy(() => import("./utils/ScrollToTop"));
const Navbar = lazy(() => import("./Components/Navbar"));
const ProtectedRoute = lazy(() => import("./Components/ProtectedRoute"));
const PublicRoute = lazy(() => import("./Components/PublicRoute"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const ForgotPassword = lazy(() => import("./Pages/ForgetPassword"));
const VerifyOTP = lazy(() => import("./Pages/VerifyOtp"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));
const Home = lazy(() => import("./Pages/Home"));
const Properties = lazy(() => import("./Pages/Properties"));
const DetailedProperties = lazy(
  () => import("./Components/DetailedProperties"),
);

const authRoutes = [
  "/",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const showNavbar = !authRoutes.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/detail-properties" element={<DetailedProperties />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
