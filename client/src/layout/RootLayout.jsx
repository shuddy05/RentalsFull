import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ScrollToTop from "../utils/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
