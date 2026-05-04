import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import logo from "../assets/images/reallogo.png";
import shield from "../assets/images/carbon_security.svg";
import { useAuth } from "../context/AuthContext";

const VerifyOtp = () => {
  const { verifyOTP, forgotPassword } = useAuth();
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
    const result = await verifyOTP(email, otp);
    setLoading(false);

    if (result.success) {
      navigate("/reset-password", { state: { email, otp } });
    } else {
      setError(result.message);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    setOtp("");
    const result = await forgotPassword(email);
    setResending(false);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5e8] flex flex-col">
      <div className="layout flex-1 flex flex-col">
        <img src={logo} alt="logo" className="w-28 sm:w-32 md:w-36 py-4" />

        <div className="flex-1 flex items-center justify-center py-8">
          <form
            onSubmit={handleVerify}
            className="w-full max-w-[575px] rounded-xl py-8 px-6 sm:px-8 md:px-10 bg-white flex flex-col items-center gap-4 shadow-sm"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[68px] md:h-[68px] rounded-full bg-[#7065F0] flex justify-center items-center">
              <img
                src={shield}
                alt="shield"
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold">OTP Verification</h1>
            <p className="text-gray-500 text-xs sm:text-sm text-center">
              Enter the 6-digit code sent to{" "}
              <span className="font-medium text-black break-all">{email}</span>
            </p>

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  className="!w-9 !h-9 sm:!w-11 sm:!h-11 md:!w-12 md:!h-12 border border-gray-300 rounded-lg text-center text-lg sm:text-xl font-bold outline-none focus:border-blue-500 bg-white mx-0.5 sm:mx-1"
                />
              )}
            />

            {error && (
              <p className="text-red-500 text-xs sm:text-sm text-center">
                {error}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="w-full h-11 sm:h-12 border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm sm:text-[15px] font-medium"
              >
                {resending ? "Resending..." : "Resend Code"}
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm sm:text-[15px] font-medium"
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
