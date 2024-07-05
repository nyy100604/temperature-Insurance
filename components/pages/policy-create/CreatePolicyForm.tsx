"use client";
import React, { FormEvent, useRef, useState } from "react";
import { useCreatePolicyValidate } from "@/lib/hooks/ZodValidate";
import { useCreatePolicyToBC } from "@/lib/hooks/CreatePolicyToBC";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";

import { LoaderCircle } from "lucide-react";

const CreatePolicyForm = ({ users }: { users: any }) => {
  // console.log(users);
  const temperatureThresholdRef = useRef<HTMLInputElement | null>(null);
  const basePremiumRef = useRef<HTMLInputElement | null>(null);
  const payoutRef = useRef<HTMLInputElement | null>(null);
  const riskFactorRef = useRef<HTMLInputElement | null>(null);
  const durationRef = useRef<HTMLInputElement | null>(null);

  const [createPolicyFC, loading] = useCreatePolicyToBC();
  const [error, validate] = useCreatePolicyValidate();

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj: { [key: string]: any } = {};
    const form = new FormData(e.currentTarget);

    form.forEach((value, key) => {
      formDataObj[key] = value;
    });

    const validateData = validate(formDataObj);
    if (validateData) {
      return;
    }
    console.log("formDataObj", formDataObj);

    // clear all input value
    temperatureThresholdRef.current!.value = "";
    basePremiumRef.current!.value = "";
    payoutRef.current!.value = "";
    riskFactorRef.current!.value = "";
    durationRef.current!.value = "";

    await createPolicyFC(
      formDataObj as {
        farmer: string;
        temperatureThreshold: string;
        basePremium: string;
        payout: string;
        riskFactor: string;
        location: string;
        duration: string;
      }
    );
  };

  return (
    <form onSubmit={handleUpload}>
      {" "}
      <div className="min-w-max grid grid-cols-2 grid-rows-2 gap-x-6">
        <div className="h-[200px] SmallBoxbg mt-8">
          <h1 className="text-black">用戶地址</h1>
          <div className="text-black max-w-[300px] flex items-center gap-x-5  w-full mx-auto pt-6">
            <Select name="farmer">
              <SelectTrigger>
                <SelectValue placeholder="請選擇用戶地址" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {" "}
                  <SelectLabel>請選擇投保之用戶</SelectLabel>
                  {users.map((item: any, index: number) => {
                    return (
                      <SelectItem key={index} value={item.address}>
                        {item.address}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="pl-5 pt-3 lg:pl-14">
            {error &&
              error?.farmer?.length > 0 &&
              error?.farmer.map((item: string, index: number) => {
                return (
                  <p key={index} className="text-red-600 text-sm font-semibold">
                    {item}
                  </p>
                );
              })}
          </div>
        </div>
        <div className="h-[200px] SmallBoxbg mt-8">
          {" "}
          <h1 className="text-black">溫度閥值</h1>
          <div className="flex justify-center">
            {" "}
            <div className="text-black flex items-center gap-x-5 max-w-[300px] pt-6 mx-autopt-6">
              {" "}
              <Input
                type="number"
                name="temperatureThreshold"
                min={0}
                step={5}
                placeholder="請調整溫度閥值"
                ref={temperatureThresholdRef}
              />
              °C
            </div>
          </div>
          <div className="pl-5 pt-3 lg:pl-14">
            {error &&
              error?.temperatureThreshold?.length > 0 &&
              error?.temperatureThreshold.map((item: string, index: number) => {
                return (
                  <p key={index} className="text-red-600 text-sm font-semibold">
                    {item}
                  </p>
                );
              })}
          </div>
        </div>
        <div className="SmallBoxbg">
          {" "}
          <h1 className="text-black">金額</h1>
          <div className="text-black max-w-[300px] mx-auto pb-6 space-y-6">
            {" "}
            <div className="flex justify-center">
              {" "}
              <div className="text-black flex items-center gap-x-5 max-w-[300px] pt-6 mx-autopt-6">
                {" "}
                <Input
                  type="number"
                  name="basePremium"
                  min={0}
                  step={5}
                  placeholder="請輸入基本保費"
                  ref={basePremiumRef}
                />
                元
              </div>
            </div>
            <div className="flex justify-center">
              {" "}
              <div className="text-black flex items-center gap-x-5 max-w-[300px] mx-autopt-6">
                {" "}
                <Input
                  type="number"
                  name="payout"
                  min={0}
                  step={5}
                  placeholder="請輸入理賠金額"
                  ref={payoutRef}
                />
                元
              </div>
            </div>
            <div className="flex justify-center">
              {" "}
              <div className="text-black flex items-center gap-x-5 max-w-[300px] mx-autopt-6">
                {" "}
                <Input
                  type="number"
                  name="riskFactor"
                  min={0}
                  step={5}
                  placeholder="請輸入風險係數"
                  ref={riskFactorRef}
                />
                ％
              </div>
            </div>
          </div>
          <div className="pl-5 lg:pl-14">
            {error &&
              error?.basePremium?.length > 0 &&
              error?.basePremium.map((item: string, index: number) => {
                return (
                  <p key={index} className="text-red-600 text-sm font-semibold">
                    {item}
                  </p>
                );
              })}
          </div>
          <div className="pl-5 pt-3 lg:pl-14">
            {error &&
              error?.payout?.length > 0 &&
              error?.payout.map((item: string, index: number) => {
                return (
                  <p key={index} className="text-red-600 text-sm font-semibold">
                    {item}
                  </p>
                );
              })}
          </div>
          <div className="pl-5 pt-3 lg:pl-14">
            {error &&
              error?.riskFactor?.length > 0 &&
              error?.riskFactor.map((item: string, index: number) => {
                return (
                  <p key={index} className="text-red-600 text-sm font-semibold">
                    {item}
                  </p>
                );
              })}
          </div>
        </div>
        <div className="SmallBoxbg ">
          {" "}
          <h1 className="text-black">
            時間與地點{" "}
            <div className="text-black max-w-[300px] mx-auto pt-6 pb-6 space-y-6">
              {" "}
              <Select name="location">
                <SelectTrigger>
                  <SelectValue placeholder="請選擇投保地點" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>地點</SelectLabel>{" "}
                    <SelectItem value="New Taipei">新北市</SelectItem>
                    <SelectItem value="Taipei">台北市</SelectItem>
                    <SelectItem value="Taoyuan">桃園市</SelectItem>
                    <SelectItem value="Taichung">台中市</SelectItem>
                    <SelectItem value="Kaohsiung">高雄市</SelectItem>
                    <SelectItem value="Tainan">台南市</SelectItem>
                    <SelectItem value="Yilan">宜蘭縣</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="flex justify-center">
                {" "}
                <div className="text-black flex items-center gap-x-5 max-w-[300px] mx-autopt-6">
                  {" "}
                  <Input
                    type="number"
                    min={0}
                    step={5}
                    name="duration"
                    placeholder="請輸入保險實間區間"
                    ref={durationRef}
                  />
                  秒
                </div>
              </div>
            </div>
          </h1>
          <div className="pl-5 lg:pl-14">
            {error &&
              error?.location?.length > 0 &&
              error?.location.map((item: string, index: number) => {
                return (
                  <p key={index} className="text-red-600 text-sm font-semibold">
                    {item}
                  </p>
                );
              })}
          </div>
          <div className="pl-5 pt-3 lg:pl-14">
            {error &&
              error?.duration?.length > 0 &&
              error?.duration.map((item: string, index: number) => {
                return (
                  <p key={index} className="text-red-600 text-sm font-semibold">
                    {item}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
      <div className="text-center pt-10">
        {loading ? (
          <Button size="lg" className="text-xl font-bold rounded-full gap-x-3">
            <LoaderCircle className="animate-spin" /> 上傳中
          </Button>
        ) : (
          <Button size="lg" className="text-xl font-bold rounded-full">
            建立保單
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreatePolicyForm;
