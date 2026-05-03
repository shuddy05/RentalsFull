import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "Password must contain at least one special character",
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "Password must contain at least one special character",
    ),
});
