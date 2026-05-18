import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ScrollToTop from "../utils/ScrollToTop";
import Footer from "../Pages/Footer";
const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
