import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"Rentals" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden;">
        <div style="background: #4F46E5; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Rentals</h1>
        </div>
        <div style="padding: 40px 30px;">
          <h2 style="color: #111827;">Password Reset Request</h2>
          <p style="color: #6B7280;">Use the OTP below to reset your password.</p>
          <div style="background: #F3F4F6; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
            <h1 style="letter-spacing: 12px; color: #4F46E5; font-size: 36px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #6B7280;">Expires in <strong>10 minutes</strong>. If you didn't request this, ignore this email.</p>
        </div>
        <div style="background: #F9FAFB; padding: 20px; text-align: center;">
          <p style="color: #9CA3AF; font-size: 12px;">© 2026 Rentals. All rights reserved.</p>
        </div>
      </div>
    `,
  });
};
