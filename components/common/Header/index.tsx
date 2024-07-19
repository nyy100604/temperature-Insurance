import React from "react";
import Image from "next/image";
import Link from "next/link";

// components
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

const Header = () => {
  return (
    <main className="container mx-auto flex items-center justify-between lg:pt-5">
      {/* logo */}
      <Link href="/">
        <div className="flex items-center gap-x-2 py-4">
          <Image
            src="/Home/logo.png"
            width={70}
            height={50}
            alt="logo"
            priority={true}
            quality={100}
          />
          <div className="font-black text-xl shadow-[30rem]">
            <p className="text-white">Temperature</p>
            <p className="text-[#EFAA59]">Insurance</p>
          </div>
        </div>
      </Link>

      {/* desktop nav */}
      <div className="hidden lg:block">
        <NavDesktop />
      </div>

      {/* mobile nav */}
      <div className="lg:hidden">
        <NavMobile />
      </div>
    </main>
  );
};

export default Header;
