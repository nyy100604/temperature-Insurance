"use client";
import React from "react";
import Image from "next/image";
import { Highlighter } from "lucide-react";

const FunctionCard = ({
  title,
  content,
  image,
}: {
  title: string;
  content: string;
  image: string;
}) => {
  return (
    <div className="pt-[4rem] pb-[1rem]">
      <div className="relative max-w-max mx-auto max-h-max ">
        <div className="relative z-10 group hover:-skew-x-3 duration-300">
          {" "}
          <div className="relative w-[250px] h-[250px] rounded-t-2xl ">
            {" "}
            <Image src={image} fill alt={image} className="rounded-t-2xl" />
            <div className="pointer-events-none bg-black/55 w-full h-full opacity-0 rounded-t-2xl -translate-y-[80%] absolute group-hover:opacity-100 group-hover:translate-y-0 delay-300 duration-200 text-white font-bold text-2xl p-[2rem]">
              {content}
              <p className="w-full flex justify-end">
                <Highlighter />
              </p>
            </div>
          </div>
          <div className="">
            <h1 className="text-white text-3xl text-center py-4 font-black">
              {title}
            </h1>
          </div>
        </div>

        <div className="absolute rounded-2xl bg-black w-full h-full top-2 left-4 z-0"></div>
      </div>
    </div>
  );
};

export default FunctionCard;
