# Rentals Project Workspace Summary

This document provides a comprehensive overview of the **Rentals** workspace. The project is split into two primary components: a React-based frontend (`client`) and a Node.js/Express-based backend (`server`).

---

## 📂 Directory Structure

Here is a high-level view of the workspace directory structure:

```
Rentals/
├── client/                     # Frontend client (Vite + React)
│   ├── src/
│   │   ├── Pages/              # Page components (Home, Properties, Account, Admin pages, etc.)
│   │   ├── Components/         # Reusable UI components & route guards
│   │   ├── api/                # API service wrappers/Axios setup
│   │   ├── context/            # React context providers (AuthContext, etc.)
│   │   ├── layout/             # Layout templates (RootLayout, AuthLayout, AdminLayout)
│   │   └── App.jsx             # Main application component & routes
│   └── package.json            # Client-side configuration and dependencies
│
└── server/                     # Backend server (Express + MongoDB)
    ├── controllers/            # Controller logic (auth, admin, properties)
    ├── middleware/             # Express middlewares (auth token verification, admin guards)
    ├── models/                 # Mongoose schemas (user, properties)
    ├── routes/                 # Express API routes
    ├── utils/                  # Utility functions (e.g., email sending)
    ├── server.js               # Entry point of the Express server
    └── package.json            # Server-side configuration and dependencies
```

---

## 🛠️ Technology Stack

### Frontend ([client](file:///C:/Users/SHUDDY/Desktop/Rentals/client))
- **Core Framework**: React 19 & Vite 8
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS (v4) & Framer Motion (for animations)
- **Form Management**: React Hook Form with Yup schema validation
- **API Client**: Axios for backend communications
- **Icons**: Lucide React & React Icons

### Backend ([server](file:///C:/Users/SHUDDY/Desktop/Rentals/server))
- **Server Framework**: Express (v5)
- **Database ORM**: Mongoose (MongoDB)
- **Authentication**: JWT (JSON Web Tokens) & Bcryptjs (password hashing)
- **Emails / OTP**: Nodemailer, Resend, and Sib-API-V3-SDK (Sendinblue)
- **Development Utility**: Nodemon

---

## 🔑 Key Backend Endpoints & Routing

The Express server in [server.js](file:///C:/Users/SHUDDY/Desktop/Rentals/server/server.js) initializes the database connection using Mongoose and mounts the following routers:

1. **Authentication Router** (`/auth` mapped in [authRouter.js](file:///C:/Users/SHUDDY/Desktop/Rentals/server/routes/authRouter.js))
   - Handles login, registration, OTP verification, and password resets.
2. **Properties Router** (`/api/properties` mapped in [propertiesRouter.js](file:///C:/Users/SHUDDY/Desktop/Rentals/server/routes/propertiesRouter.js))
   - Handles public and authenticated listing retrieval and management.
3. **Saved Properties Router** (`/api/saved-properties` mapped in [savedPropertiesRouter.js](file:///C:/Users/SHUDDY/Desktop/Rentals/server/routes/savedPropertiesRouter.js))
   - Allows users to bookmark/save properties they are interested in.
4. **Admin Router** (`/api/admin` mapped in [adminRouter.js](file:///C:/Users/SHUDDY/Desktop/Rentals/server/routes/adminRouter.js))
   - Admin-only routes for user management, listing approval, and dashboard stats.

---

## 📱 Frontend Navigation & Pages

The application routing is configured in [App.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/App.jsx) and divides pages into three main layouts:

### 🏠 Public / User-Facing Pages
- **Home**: [Home.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/Home.jsx) - Landing page.
- **Properties**: [Properties.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/Properties.jsx) - Browsing properties.
- **Detailed Property**: [DetailedProperties.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/DetailedProperties.jsx) - Full information on a single property.
- **Saved Properties**: [SavedProperties.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/SavedProperties.jsx) - User's bookmarked listings.
- **Account Settings**: [AccountSettings.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/AccountSettings.jsx) - User profile settings.

### 🔐 Authentication Pages
- **Login / Register**: [Login.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/Login.jsx) / [Register.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/Register.jsx)
- **Forgot / Reset Password**: [ForgetPassword.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/ForgetPassword.jsx) / [ResetPassword.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/ResetPassword.jsx)
- **Verify OTP**: [VerifyOtp.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/VerifyOtp.jsx)

### 👑 Admin Panel
Protected behind an admin route guard:
- **Dashboard**: [Dashboard.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/admin/Dashboard.jsx) - Admin overview and metrics.
- **Properties & Add Property**: [AdminProperties.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/admin/AdminProperties.jsx) & [AddNewProperty.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/admin/AddNewProperty.jsx)
- **Management**: [UserManagement.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/admin/UserManagement.jsx), [ListingRequests.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/admin/ListingRequests.jsx), [TourRequests.jsx](file:///C:/Users/SHUDDY/Desktop/Rentals/client/src/Pages/admin/TourRequests.jsx)
