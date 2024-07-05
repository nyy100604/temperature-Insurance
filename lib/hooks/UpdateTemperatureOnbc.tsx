"use client";
import { ethers } from "ethers";
import { InsurancePolicyContract_ABI } from "@/Blockchain/ABI";
import { updatePolicyTemperatureData } from "../action/dataAction";

// components
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const useUpdateTemperatureOnbc = (contractAddr: string) => {
  //   console.log("contractAddr", contractAddr);

  const { toast } = useToast();
  const router = useRouter();
  const [loading3, setLoading3] = useState(false);
  let providerRef = useRef<ethers.BrowserProvider | null>(null);
  let signerRef = useRef<ethers.Signer | null>(null);
  let contractRef = useRef<ethers.Contract | null>(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      providerRef.current = provider;
      console.log("reset provider");
    } else {
      toast({
        title: "error",
        description: "請下載Metamask至瀏覽器",
      });
    }
  }, [toast]);

  useEffect(() => {
    const initializeContract = async () => {
      if (providerRef.current) {
        const signer = await providerRef.current.getSigner();
        const newContract = new ethers.Contract(
          contractAddr,
          InsurancePolicyContract_ABI,
          signer
        );
        contractRef.current = newContract;
        signerRef.current = signer;
        console.log("Contract and signer initialized again.");

        newContract.on("WeatherDateUpdated", handleUpdateTemperature);
      }
    };

    initializeContract();

    return () => {
      if (contractRef.current) {
        contractRef.current.removeAllListeners("WeatherDateUpdated");
      }
    };
  }, [router, toast, contractAddr]);

  const handleUpdateTemperature = async (temperature: string) => {
    console.log("WeatherDateUpdated event received", temperature);
    const result = await updatePolicyTemperatureData(contractAddr);

    if (result) {
      setLoading3(false);
      router.refresh();
    } else {
      toast({
        title: "error",
        description: "無法上傳至區塊鏈",
      });
      setLoading3(false);
    }
  };

  const updateTemperatureFC = async (temp: string) => {
    const temp1 = ethers.parseUnits(temp.toString(), 2);
    console.log(temp1);

    const contract = contractRef.current;
    const signer = signerRef.current;

    if (contract && signer) {
      try {
        setLoading3(true);
        const tx = await contract.updateWeatherDate(temp1);
        await tx.wait();
        toast({
          title: "success",
          description: "已成功更改保單溫度",
        });
        console.log("tx", tx);
      } catch (e) {
        console.log(e);
        toast({
          title: "error",
          description: "無法上傳至區塊鏈",
        });
        setLoading3(false);
      }
    }
  };
  return [loading3, updateTemperatureFC] as const;
};
