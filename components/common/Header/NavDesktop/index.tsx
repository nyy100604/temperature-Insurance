import React from "react";
import LoginBeforeNav from "./LoginBeforeNav";
import { auth } from "@/auth";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";

const NavDesktop = async () => {
  const session = await auth();
  const user = session?.user as {
    id: string;
    role: string;
    address: string;
  };

  return (
    <div>
      {user?.role === "admin" ? (
        <AdminNav user={user} />
      ) : user?.role === "farmer" ? (
        <UserNav user={user} />
      ) : (
        <LoginBeforeNav />
      )}
    </div>
  );
};

export default NavDesktop;
