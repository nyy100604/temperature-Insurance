import React from "react";

// icon
import {
  CircleUserRound,
  House,
  CircleDollarSign,
  Factory,
  ScrollText,
} from "lucide-react";
// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOut from "./SignOut";
const UserNav = ({
  user,
}: {
  user: { id: string; role: string; address: string };
}) => {
  return (
    <div>
      <ul className="flex gap-x-[3rem] text-xl text-white font-extrabold">
        <li className="text-center cursor-pointer  rounded-2xl hover:border-white  duration-200">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              {" "}
              <div className="w-[125px] text-center cursor-pointer p-2 border border-transparent rounded-2xl hover:border-white hover:bg-white/20  active:scale-95 duration-200">
                區塊鏈專區
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/85">
              <DropdownMenuLabel>智能合約資訊</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center gap-x-2">
                  {" "}
                  <CircleDollarSign size={27} />
                  <a href="https://holesky.etherscan.io/address/0x552b5dAac94afbd1e8f0425c9deB5F02132e1972">
                    NTDTOKEN
                  </a>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="space-y-2">
                  <div className="flex items-center gap-x-2">
                    {" "}
                    <Factory size={27} />
                    <a href="https://holesky.etherscan.io/address/0x897eDBc903901d64AC01b7a4795B687D78A38d68">
                      保險工廠合約
                    </a>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="space-y-2">
                  <div className="flex items-center gap-x-2">
                    {" "}
                    <ScrollText size={27} />
                    <a href="https://holesky.etherscan.io/address/0xc0B1aC4e83dCeDfac9dAC8aE9BF9Ff2d05723EC7">
                      {" "}
                      保單合約
                    </a>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li className="text-center cursor-pointer p-2  rounded-2xl hover:border-white  duration-200">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              {" "}
              歡迎{user.address.slice(0, 7)}...
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/85">
              <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center gap-x-2">
                  {" "}
                  <CircleUserRound size={27} />
                  身份：農民
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="space-y-2">
                  <div className="flex items-center gap-x-2">
                    {" "}
                    <House size={27} />
                    區塊鏈地址：
                  </div>

                  <p>{user.address}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />{" "}
              <DropdownMenuItem className="cursor-pointer">
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
