"use client";
import { ethers } from "ethers";
import { NTDToken_ABI } from "@/Blockchain/ABI";
import { ntdTokenAddr } from "@/Blockchain/Address";
import { updateApproveMoneyData } from "../action/dataAction";
import { useRouter } from "next/navigation";

// components
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";

export const useApproveMoneyOnbc = (contractAddr: string) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading1, setLoading1] = useState(false);
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
          ntdTokenAddr,
          NTDToken_ABI,
          signer
        );
        contractRef.current = newContract;
        signerRef.current = signer;
        console.log("Contract and signer initialized again.");

        newContract.on("Approval", handleUpdateApproveMoneyData);
      }
    };

    initializeContract();

    return () => {
      if (contractRef.current) {
        contractRef.current.removeAllListeners("Approval");
      }
    };
  }, [router, toast, contractAddr]);

  const handleUpdateApproveMoneyData = async (
    owner: string,
    spender: string,
    value: string
  ) => {
    console.log("Approval event received", owner, spender, value);
    const result = await updateApproveMoneyData(contractAddr);

    if (result) {
      setLoading1(false);
      router.refresh();
    } else {
      toast({
        title: "error",
        description: "無法上傳至區塊鏈",
      });
      setLoading1(false);
    }
  };

  const approveMoneyFC = async (premium: string) => {
    const premium1 = ethers.parseUnits(premium.toString(), 18);
    console.log(premium1);

    const contract = contractRef.current;
    const signer = signerRef.current;

    if (contract && signer) {
      try {
        setLoading1(true);
        const tx = await contract.approve(contractAddr, premium1);
        await tx.wait();
        toast({
          title: "success",
          description: "已同意保險合約取用您的資金",
        });
        console.log("tx", tx);
      } catch (e) {
        console.log(e);
        toast({
          title: "error",
          description: "無法上傳至區塊鏈",
        });
        setLoading1(false);
      }
    }
  };
  return [loading1, approveMoneyFC] as const;
};
