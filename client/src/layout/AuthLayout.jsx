import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants } from "../utils/motion";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
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
    </>
  );
};

export default AuthLayout;
