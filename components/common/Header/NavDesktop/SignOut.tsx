import React from "react";
import { signOut } from "@/auth";

const SignOut = () => {
  return (
    <form
      className="w-full text-center font-black"
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button className="active:scale-90 duration-200 text-red-600">
        登出
      </button>
    </form>
  );
};

export default SignOut;
