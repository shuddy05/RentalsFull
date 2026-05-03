import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Navbar from "./Components/Navbar";

const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const ForgotPassword = lazy(() => import("./Pages/ForgetPassword"));
const Home = lazy(() => import("./Pages/Home"));
const Properties = lazy(() => import("./Pages/Properties"));
const DetailedProperties = lazy(
  () => import("./Components/DetailedProperties"),
);

const authRoutes = ["/", "/register", "/forgot-password"];

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
    <BrowserRouter>
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
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
