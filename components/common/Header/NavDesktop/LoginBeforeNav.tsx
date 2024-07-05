import React from "react";
import { Button } from "@/components/ui/button";
import Login from "./Login";
const LoginBeforeNav = () => {
  return (
    <div>
      <ul className="flex gap-x-[3rem] text-xl text-white font-extrabold">
        <li className="w-[125px] text-center cursor-pointer p-2 border border-transparent rounded-2xl hover:border-white hover:bg-white/20  active:scale-95 duration-200">
          區塊鏈專區
        </li>
        <Login />
      </ul>
    </div>
  );
};

export default LoginBeforeNav;
