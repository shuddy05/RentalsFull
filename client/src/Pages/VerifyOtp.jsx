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
  const email = location.state?.email; // passed from ForgotPassword page

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
    <main className="bg-[#f5f5e8] h-screen">
      <div className="layout">
        <img src={logo} alt="" />

        <form
          onSubmit={handleVerify}
          className="w-full md:w-[575px] rounded-xl md:py-8 md:px-10 bg-white mx-auto flex flex-col items-center gap-4"
        >
          <div className="w-[68px] h-[68px] rounded-full bg-[#7065F0] flex justify-center items-center">
            <img src={shield} alt="" />
          </div>

          <h1 className="text-[24px] font-bold">OTP Verification</h1>
          <p className="text-gray-500 text-sm text-center">
            Enter the 6-digit code sent to{" "}
            <span className="font-medium text-black">{email}</span>
          </p>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                className="!w-12 !h-12 border border-gray-300 rounded-lg text-center text-xl font-bold outline-none focus:border-blue-500 bg-white mx-1"
              />
            )}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex gap-4 w-full mt-4">
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="w-full h-12 border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-[15px] font-medium"
            >
              {resending ? "Resending..." : "Resend Code"}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-white hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-blue-600 hover:text-white rounded-xl text-[15px] font-medium"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default VerifyOtp;
