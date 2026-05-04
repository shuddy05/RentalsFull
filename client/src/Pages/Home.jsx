import React from "react";
import HeroSection from "../Components/HeroSection";
import FeaturesProperties from "../Components/FeaturesProperties";
import HomeComponents from "../Components/HomeComponents";
import NavBar from "../Components/NavBar";
import { useAuth } from "../context/AuthContext";
const Home = () => {
  const { user } = useAuth();
  console.log("current user", user);
  return (
    <main>
      <HeroSection />
      <FeaturesProperties />
      <HomeComponents />
    </main>
  );
};

export default Home;
