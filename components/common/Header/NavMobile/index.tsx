import React from "react";
import { AlignRight } from "lucide-react";
import Image from "next/image";
import { auth } from "@/auth";

// components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoginBeforeNav from "./LoginBeforeNav";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";

const NavMobile = async () => {
  const session = await auth();
  const user = session?.user as {
    id: string;
    role: string;
    address: string;
  };

  return (
    <div>
      {" "}
      <Sheet>
        <SheetTrigger>
          {" "}
          <AlignRight className="text-white" size={45} />
        </SheetTrigger>
        <SheetContent side="left" className="bg-black/60">
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-center gap-x-4 justify-center pt-20">
                {" "}
                <Image src="/Home/logo.png" alt="logo" width={80} height={80} />
                <div className="font-black text-xl shadow-[30rem] text-start">
                  <p className="text-white">Temperature</p>
                  <p className="text-[#EFAA59]">Insurance</p>
                </div>
              </div>
            </SheetTitle>
            {!user && <LoginBeforeNav />}
            {user && user.role === "admin" && <AdminNav user={user} />}
            {user && user.role === "farmer" && <UserNav user={user} />}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavMobile;
