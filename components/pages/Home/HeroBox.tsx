"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { ArrowBigRightDash } from "lucide-react";

const websiteIntro = {
  title: "農作物溫度保險",
  content:
    "本網站專為農民設計的保險服務平台，利用區塊鏈技術提供透明、公平和自動化的保險賠償。旨在幫助農民在遭遇極端溫度情況時，快速獲得保險賠償，減少損失，確保農業生產的穩定性。",
  priority: [
    {
      title: "自主權：",
      content:
        "利用區塊鏈技術，保險流程完全由農民自主控制，無需依賴銀行或中央機構。",
    },
    {
      title: "透明性：",
      content:
        "所有保單和賠償記錄都記錄在區塊鏈上，無法篡改，確保信息公開透明。",
    },
    {
      title: "效率高：",
      content: "自動化的賠償流程，確保農民能夠快速獲得賠償，減少等待時間。",
    },
    {
      title: "公平性：",
      content: "基於實時溫度數據進行賠償，保證每位農民都能獲得應有的保障。",
    },
  ],
};

const HeroBox = () => {
  return (
    <main className="pt-6 pb-[5rem]">
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        className="max-w-[376px] mx-auto w-full bg-white/80 h-[75vh] rounded-3xl py-5 px-8 drop-shadow-2xl overflow-y-scroll no-scrollbar
                     lg:mt-5 lg:max-w-[600px] lg:px-12 lg:mx-0 lg:ml-auto lg:mr-20"
      >
        <h1 className="text-4xl text-red-700 font-bold my-4">
          {websiteIntro.title}
        </h1>
        <p
          className="text-xl text-[#333333] font-medium py-3 indent-8
                    lg:text-2xl text-justify opacity-70 hover:opacity-100 duration-200"
        >
          {websiteIntro.content}
        </p>
        <div className="text-xl">
          {" "}
          <p className="text-2xl font-black pt-4 pb-2 text-green-600">
            我們的優勢
          </p>
          <ul
            className="text-[#333333] text-xl font-medium text-justify
                         lg:text-2xl"
          >
            {websiteIntro.priority.map((item, index) => {
              return (
                <li
                  className="py-5 opacity-70 hover:opacity-100 duration-200 group"
                  key={index}
                >
                  <span className="flex items-center title-group">
                    <ArrowBigRightDash
                      className="group-hover:rotate-90 duration-200"
                      size={35}
                    />
                    {item.title}
                  </span>{" "}
                  {item.content}
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </main>
  );
};

export default HeroBox;
