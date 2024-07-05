import React from "react";

// icons
import {
  CircleDollarSign,
  Factory,
  ScrollText,
  CircleAlert,
} from "lucide-react";

// components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Login from "../NavDesktop/Login";

const LoginBeforeNav = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {" "}
      <Accordion type="single" collapsible className="text-white mt-10">
        <AccordionItem value="item-1" className="w-[200px] text-xl font-bold">
          <AccordionTrigger className="text-xl font-bold">
            區塊鏈專區
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-[2rem] pl-4">
            <div className="flex items-center mt-4  gap-x-2 hover:text-yellow-500">
              {" "}
              <CircleDollarSign size={27} />
              <a href="https://holesky.etherscan.io/address/0x552b5dAac94afbd1e8f0425c9deB5F02132e1972">
                NTDTOKEN
              </a>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-x-2 hover:text-yellow-500">
                {" "}
                <Factory size={27} />
                <a href="https://holesky.etherscan.io/address/0x897eDBc903901d64AC01b7a4795B687D78A38d68">
                  保險工廠合約
                </a>
              </div>
            </div>{" "}
            <div className="space-y-2">
              <div className="flex items-center gap-x-2 hover:text-yellow-500">
                {" "}
                <ScrollText size={27} />
                <a href="https://holesky.etherscan.io/address/0xc0B1aC4e83dCeDfac9dAC8aE9BF9Ff2d05723EC7">
                  {" "}
                  保單合約
                </a>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="text-white mt-5">
        <AccordionItem value="item-1" className="w-[200px] text-xl font-bold">
          <AccordionTrigger className="text-xl font-bold">
            登入系統
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-[1rem] pl-4">
            <div className="flex items-center mt-4  gap-x-2 text-red-600">
              <CircleAlert />
              僅支持電腦版登入
            </div>

            <div className="flex items-center gap-x-2 ">
              <Login />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LoginBeforeNav;
