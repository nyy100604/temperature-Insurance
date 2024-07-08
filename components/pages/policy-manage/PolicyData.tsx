"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CircleX, CircleCheckBig } from "lucide-react";
import { getCurrentTemperature } from "@/lib/action/dataAction";

// components
import SelectPolicy from "./SelectPolicy";
import BtnGroup from "./BtnGroup";

const PolicyData = ({ policies }: { policies: any }) => {
  // console.log("policies", policies);

  if (policies.length === 0) {
    return (
      <div className="Boxbg h-[80vh] mt-10">
        {" "}
        <div className="SmallBoxbg text-2xl text-black flex flex-col items-center justify-center gap-3 h-[90%] lg:flex-row lg:text-4xl">
          <Image
            src="/Policy-manage/noData.png"
            width={100}
            height={150}
            alt="nodata"
          />{" "}
          您目前未建立任何保單
        </div>
      </div>
    );
  }

  const [currentPolicyData, setCurrentPolicyData] = useState<any>(policies[0]);
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(
    null
  );

  const handleCurrentPolicy = async (index: number) => {
    setCurrentPolicyData(policies[index]);
  };

  const getTemperature = async () => {
    const temp = await getCurrentTemperature(currentPolicyData.location);
    if (temp) {
      setCurrentTemperature(temp);
    }
  };

  useEffect(() => {
    getTemperature();
  }, [currentPolicyData.location]);

  //date
  const date = new Date().toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const startDate = new Date(
    currentPolicyData.startDate * 1000
  ).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const endDate = new Date(currentPolicyData.endDate * 1000).toLocaleDateString(
    "zh-TW",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  return (
    <div className="Boxbg">
      <div className="SmallBoxbg text-black flex flex-col lg:flex-row lg:justify-between">
        <SelectPolicy
          handleCurrentPolicy={handleCurrentPolicy}
          policies={policies}
        />
        <div className="bg-black text-white text-xl px-8 flex items-center justify-center rounded-full order-1">
          {date}
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="SmallBoxbg p-8 flex justify-between lg:justify-center lg:gap-x-4 h-[226px]">
          {" "}
          <Image
            src="/Policy-manage/thermometer.png"
            width={50}
            height={100}
            alt="thermometer"
          />
          <div className="flex flex-col gap-y-10 text-black">
            {" "}
            <h1 className="text-lg">目前 {currentPolicyData.location} 溫度</h1>
            <h1 className="text-center">
              <span className="text-[7rem]">
                {currentTemperature ? currentTemperature : "00"}
              </span>
              °C
            </h1>
          </div>
        </div>

        <div className="SmallBoxbg text-black w-full overflow-x-scroll p-8">
          <h1>保單資訊</h1>
          <div className="text-sm mt-2 pl-2 space-y-2">
            {" "}
            <div>
              <div>用戶地址：</div> {currentPolicyData.farmer}
            </div>
            <div>
              {" "}
              <div>保單合約地址：</div>
              {currentPolicyData.contractAddress}
            </div>
            <div className="flex">
              {" "}
              <div>投保地點：</div>
              {currentPolicyData.location}
            </div>
            <div>
              {" "}
              <span className="flex">
                <div>溫度閥值：</div> {currentPolicyData.temperatureThreshold}°C
              </span>
            </div>
            <div>
              {" "}
              <span className="flex">
                <div>基本保費：</div> {currentPolicyData.premium}元
              </span>
            </div>
            <div>
              {" "}
              <span className="flex">
                <div>理賠金額：</div> {currentPolicyData.payout}元
              </span>
            </div>
            <div>
              {" "}
              <span>
                <div>保單日期：</div> {`${startDate}～${endDate}`}
              </span>
            </div>
            <div>
              {" "}
              <span className="flex items-center">
                <div>是否可申請理賠：</div>{" "}
                {Date.now() > currentPolicyData.endDate * 1000 ? "可" : "否"}
              </span>
            </div>
            <div>
              {" "}
              <span className="flex items-center">
                <div>理賠狀態：</div>{" "}
                {currentPolicyData.isClaimed ? (
                  <CircleCheckBig className="text-green-600" />
                ) : (
                  <CircleX className="text-red-600" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>{" "}
      <BtnGroup
        currentPolicyData={currentPolicyData}
        currentTemperature={currentTemperature}
      />
    </div>
  );
};

export default PolicyData;
