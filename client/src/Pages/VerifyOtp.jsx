import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import logo from "../assets/images/newlogo.png";
import shield from "../assets/images/carbon_security.svg";
import api from "../api/axiosConfig";
import handleAuthError from "../utils/handleError";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await api.post("/auth/verify-otp", { email, otp });
      navigate("/reset-password", { state: { email, otp } });
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    setOtp("");
    try {
      await api.post("/auth/forgot-password", { email });
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5e8] flex flex-col">
      <div className="layout flex-1 flex flex-col">
        <div
          className="flex items-center gap-2.5 py-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Estatery Logo"
            className="h-10 sm:h-11 w-auto"
          />
          <span className="font-bold text-2xl text-gray-900 tracking-tight">Estatery</span>
        </div>

        <div className="flex-1 flex items-center justify-center py-8">
          <form
            onSubmit={handleVerify}
            className="w-full max-w-[550px] rounded-3xl py-10 px-6 sm:px-10 bg-white flex flex-col items-center gap-5 shadow-xl border border-gray-100"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#7065F0] flex justify-center items-center shadow-lg shadow-purple-500/30">
              <img
                src={shield}
                alt=""
                className="w-8 h-8 sm:w-9 sm:h-9"
              />
            </div>

            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                OTP Verification
              </h1>
              <p className="text-gray-500 text-sm mt-2 ">
                Enter the 6-digit code sent to{" "}
                <span className="font-semibold text-gray-800 break-all">{email}</span>
              </p>
            </div>

            <div className="my-2">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="!w-10 !h-12 sm:!w-13 sm:!h-14 border border-gray-300 rounded-xl text-center text-xl font-bold outline-none focus:border-[#7065F0] focus:ring-2 focus:ring-[#7065F0]/20 bg-gray-50 mx-1 transition-all"
                  />
                )}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 px-4 py-2 rounded-lg border border-red-200 w-full">
                {error}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3.5 w-full mt-4">
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="w-full h-12 border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                {resending ? "Resending..." : "Resend Code"}
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold shadow-md transition-colors"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default VerifyOtp;
