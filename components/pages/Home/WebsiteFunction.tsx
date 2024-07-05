"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import FunctionCard from "./FunctionCard";

const functionIntro = [
  {
    title: "保單管理",
    content: "農民可以輕鬆在線投保，管理和查看保單詳情。",
    image: "/Home/manage.png",
  },
  {
    title: "溫度監測",
    content: "實時監測農作區域的溫度數據，保證準確性。",
    image: "/Home/monition.png",
  },
  {
    title: "自動賠償",
    content: "當溫度達到保單設定的賠償門檻時，自動觸發賠償流程，無需中介干預。",
    image: "/Home/compensation.png",
  },
  {
    title: "數據查詢",
    content: "提供詳細的歷史溫度數據和保險賠償記錄，方便農民進行決策。",
    image: "/Home/lookup.png",
  },
];

const WebsiteFunction = () => {
  return (
    <main className="bg-websiteFunction bg-cover bg-center h-[100vh] overflow-y-scroll sm:h-auto">
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
      >
        {"  "}
        <h1 className="font-black text-[3.3rem] text-center">
          <div className="text-[#324444] shadow-2xl py-6">功能介紹</div>
        </h1>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-10">
          {" "}
          {functionIntro.map((item, index) => {
            return (
              <FunctionCard
                title={item.title}
                content={item.content}
                image={item.image}
                key={index}
              />
            );
          })}
        </div>
      </motion.div>
    </main>
  );
};

export default WebsiteFunction;
