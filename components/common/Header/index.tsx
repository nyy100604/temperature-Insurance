import React from "react";
import Image from "next/image";

import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

const Header = () => {
  return (
    <main className="container mx-auto flex items-center justify-between lg:pt-5">
      {/* logo */}
      <div className="flex items-center gap-x-2 py-4">
        {" "}
        <Image src="/Home/logo.png" width={70} height={50} alt="logo" />
        <div className="font-black text-xl shadow-[30rem]">
          <p className="text-white">Temperature</p>
          <p className="text-[#EFAA59]">Insurance</p>
        </div>
      </div>

      {/* nav */}
      <div className="hidden lg:block">
        <NavDesktop />
      </div>

      <div className="lg:hidden">
        <NavMobile />
      </div>
    </main>
  );
};

export default Header;
