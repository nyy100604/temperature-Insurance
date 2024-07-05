import React from "react";
import { getAllPolicy } from "@/lib/action/dataAction";
import { CircleCheckBig, CircleX } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

const PoliciesList = async () => {
  const policies = await getAllPolicy();
  console.log("policies", policies);

  return (
    <div className="Boxbg tracking-widest text-white ">
      <h1>用戶保單列表</h1>
      {/* slide */}
      <div className="w-full flex justify-center mt-6">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-[calc(100%-100px)]"
        >
          <CarouselContent>
            {/* {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="lg:basis-1/3 ">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))} */}
            {policies.map((policy: any, index: number) => {
              const dateStart = new Date(
                policy.startDate * 1000
              ).toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
              const dateEnd = new Date(
                policy.endDate * 1000
              ).toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
              return (
                <CarouselItem key={index} className="lg:basis-1/3 ">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-2">
                        <div className="w-full flex flex-col gap-y-2 tracking-normal">
                          <span className="text-sm font-semibold overflow-x-scroll">
                            <span>農民地址：{policy?.farmer}</span>
                          </span>
                          <span className="text-sm font-semibold overflow-x-scroll">
                            <span>保險合約地址：{policy?.contractAddress}</span>
                          </span>
                          <span className="text-sm font-semibold overflow-x-scroll">
                            <span className="flex items-center">
                              投保地點：{policy?.location}
                            </span>
                          </span>
                          <span className="text-sm font-semibold overflow-x-scroll">
                            <h1>溫度閥值：{policy?.temperatureThreshold}°C</h1>
                          </span>
                          <span className="text-sm font-semibold overflow-x-scroll">
                            <h1>保費：{policy?.premium}元</h1>
                          </span>
                          <span className="text-sm font-semibold overflow-x-scroll">
                            <h1>理賠金額：{policy?.payout}元</h1>
                          </span>
                          <span className="text-sm font-semibold overflow-x-scroll">
                            <h1 className="flex items-center">
                              保險期間： {dateStart}～{dateEnd}
                            </h1>
                          </span>
                          <span className="text-sm font-semibold overflow-x-scroll">
                            <h1 className="flex items-center">
                              理賠狀態：
                              {policy.isClaimed ? (
                                <CircleCheckBig className="text-green-600" />
                              ) : (
                                <CircleX className="text-red-600" />
                              )}
                            </h1>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="text-slate-500" />
          <CarouselNext className="text-slate-500" />
        </Carousel>
      </div>
    </div>
  );
};

export default PoliciesList;
