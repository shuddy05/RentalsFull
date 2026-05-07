import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";

const RootLayout = lazy(() => import("./layout/RootLayout"));
const AuthLayout = lazy(() => import("./layout/AuthLayout"));
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
const Error404 = lazy(() => import("./Pages/Error404Page"));
const Loading = lazy(() => import("./utils/Loading"));

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/properties"
                element={
                  <ProtectedRoute>
                    <Properties />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/detail-properties"
                element={
                  <ProtectedRoute>
                    <DetailedProperties />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route element={<AuthLayout />}>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />
              <Route
                path="/verify-otp"
                element={
                  <PublicRoute>
                    <VerifyOTP />
                  </PublicRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <PublicRoute>
                    <ResetPassword />
                  </PublicRoute>
                }
              />
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
