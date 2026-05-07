import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

const AuthLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default AuthLayout;
