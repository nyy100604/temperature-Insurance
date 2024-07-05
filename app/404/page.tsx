import Header from "@/components/common/Header";
import React from "react";
import Image from "next/image";
import Footer from "@/components/common/Footer";

const NotFound = () => {
  return (
    <>
      {" "}
      <div className="bg-heroMobile w-full lg:bg-heroDesktop h-[100vh] bg-center bg-cover">
        <Header />
        <div className="Boxbg mt-[2rem]">
          <div className="SmallBoxbg p-6 py-14 flex flex-col items-center justify-center gap-y-4 lg:flex-row">
            <Image src="/404/404.png" width={200} height={250} alt="404" />
            <h1 className="text-black lg:text-[3rem]">查無此頁面</h1>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
};

export default NotFound;
