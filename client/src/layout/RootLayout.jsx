import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ScrollToTop from "../utils/ScrollToTop";
import Footer from "../Pages/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants } from "../utils/motion";

const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
