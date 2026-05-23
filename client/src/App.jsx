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
const DetailedProperties = lazy(() => import("./Pages/DetailedProperties"));
const Error404 = lazy(() => import("./Pages/Error404Page"));
const Loading = lazy(() => import("./utils/Loading"));
const SavedProperties = lazy(() => import("./Pages/SavedProperties"));
const AccountSettings = lazy(() => import("./Pages/AccountSettings"));
import AdminLayout from "./layout/AdminLayout";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route
                path="/detail-properties/:id"
                element={<DetailedProperties />}
              />
              <Route path="/saved-properties" element={<SavedProperties />} />
              <Route path="/account" element={<AccountSettings />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<div>Admin Dashboard</div>} />
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
