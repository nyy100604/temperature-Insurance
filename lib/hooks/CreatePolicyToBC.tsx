"use client";
import { ethers } from "ethers";
import { InsuranceFactory_ABI } from "@/Blockchain/ABI";
import { insuranceFactoryAddr } from "@/Blockchain/Address";
import { savePolicyData } from "../action/dataAction";
import { useRouter } from "next/navigation";

// components
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";

export const useCreatePolicyToBC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  let providerRef = useRef<ethers.BrowserProvider | null>(null);
  let signerRef = useRef<ethers.Signer | null>(null);
  let contractRef = useRef<ethers.Contract | null>(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      providerRef.current = provider;
      console.log("provider", provider);
      console.log("reset provider");
    } else {
      toast({
        title: "error",
        description: "請下載Metamask至瀏覽器",
      });
    }
  }, [toast]);

  useEffect(() => {
    const initialzeContract = async () => {
      if (providerRef.current) {
        const signer = await providerRef.current.getSigner();
        const newContract = new ethers.Contract(
          insuranceFactoryAddr,
          InsuranceFactory_ABI,
          signer
        );

        contractRef.current = newContract;
        signerRef.current = signer;
        console.log("Contract and signer initialized");

        // add new listener
        newContract.on("PolicyCreated", handlePolicyCreated);
        console.log("Added listener for 'PolicyCreated' after policy creation");
      }
    };

    initialzeContract();

    return () => {
      if (contractRef.current) {
        contractRef.current.removeAllListeners("PolicyCreated");
        console.log("Removed all listeners for 'PolicyCreated' on unmount");
      }
    };
  }, [router, toast]);

  const handlePolicyCreated = async (
    policyAddress: string,
    farmer: string,
    premium: string,
    payout: string,
    startDate: string,
    endDate: string,
    temperatureThreshold: string,
    location: string
  ) => {
    console.log(
      "PolicyCreated event received",
      policyAddress,
      farmer,
      premium,
      payout,
      startDate,
      endDate,
      temperatureThreshold,
      location
    );

    try {
      const premium1 = ethers.formatUnits(ethers.toBigInt(premium), 18);
      const payout1 = ethers.formatUnits(ethers.toBigInt(payout), 18);
      const startDate1 = startDate.toString();
      const endDate1 = endDate.toString();
      const temperatureThreshold1 = temperatureThreshold.toString();
      const result = await savePolicyData(
        policyAddress,
        farmer,
        premium1,
        payout1,
        startDate1,
        endDate1,
        temperatureThreshold1,
        location
      );

      if (result) {
        setloading(false);
        router.refresh();
      } else {
        toast({
          title: "error",
          description: "無法上傳至區塊鏈",
        });
        setloading(false);
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "error",
        description: "無法上傳至區塊鏈",
      });
      setloading(false);
    }
  };

  const createPolicyFC = async (dataObj: {
    farmer: string;
    temperatureThreshold: string;
    basePremium: string;
    payout: string;
    riskFactor: string;
    location: string;
    duration: string;
  }) => {
    const {
      farmer,
      temperatureThreshold,
      basePremium,
      payout,
      riskFactor,
      location,
      duration,
    } = dataObj;

    const startDate = Date.now() / 1000;
    const basePremium1 = ethers.parseUnits(basePremium, 18);
    const payout1 = ethers.parseUnits(payout, 18);
    const startDate1 = ethers.toBigInt(Math.floor(startDate));
    const duration1 = ethers.toBigInt(duration);
    const temperatureThreshold1 = ethers.toBigInt(temperatureThreshold);
    const riskFactor1 = ethers.toBigInt(riskFactor);

    const contract = contractRef.current;
    const signer = signerRef.current;

    if (contract && signer) {
      try {
        setloading(true);
        const tx = await contract.createPolicy(
          farmer,
          basePremium1,
          payout1,
          startDate1,
          duration1,
          temperatureThreshold1,
          riskFactor1,
          location
        );
        await tx.wait();
        toast({
          title: "success",
          description: "保單已上傳至區塊鏈",
        });
        console.log("tx", tx);
      } catch (e) {
        console.log(e);
        toast({
          title: "error",
          description: "無法上傳至區塊鏈",
        });
        setloading(false);
      }
    }
  };
  return [createPolicyFC, loading] as const;
};
