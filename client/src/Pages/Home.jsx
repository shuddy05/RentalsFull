import React from "react";
import { lazy } from "react";
const HomeComponents = lazy(() => import("../Components/HomeComponents"));
const HeroSection = lazy(() => import("../Components/HeroSection"));
const FeaturesProperties = lazy(
  () => import("../Components/FeaturesProperties"),
);

const Home = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesProperties />
      <HomeComponents />
    </main>
  );
};

export default Home;
