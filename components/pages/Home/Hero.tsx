import React from "react";

// components
import Header from "@/components/common/Header";
import HeroBox from "./HeroBox";

const Hero = () => {
  return (
    <div className="bg-heroMobile w-full lg:bg-heroDesktop bg-center bg-cover">
      <Header />
      <HeroBox />
    </div>
  );
};

export default Hero;
