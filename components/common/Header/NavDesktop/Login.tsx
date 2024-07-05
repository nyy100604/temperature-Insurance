import React, { ComponentProps } from "react";
import Image from "next/image";

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";
type divProps = {} & ComponentProps<"li">;
const Login = ({ ...props }: divProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ul>
          {" "}
          <li
            className="w-[125px] text-center cursor-pointer p-2 border border-transparent rounded-2xl hover:border-white hover:bg-white/20  active:scale-95 duration-200"
            {...props}
          >
            登入
          </li>
        </ul>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black flex items-center gap-x-6 justify-center pt-6 pb-8">
            <Image
              src="/Home/farmer.png"
              width={120}
              height={100}
              alt="farmer"
            />{" "}
            <div className="bg-slate-900 text-white px-6 py-2 rounded-r-full text-2xl">
              登入
            </div>
          </DialogTitle>
          <DialogDescription className="space-y-4 text-lg pl-8 text-left">
            <span className="block"> （1）請於瀏覽器下載 Metamask 錢包。</span>
            <span className="block"> （2）選擇您的地址後登入系統。</span>
            <span className="block"> （3）管理員登入僅被授權者可登入。</span>
          </DialogDescription>
          <div className="flex justify-center gap-x-8 font-bold py-12">
            <AdminLogin />
            <UserLogin />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
