"use client";
import { ethers } from "ethers";
import { InsurancePolicyContract_ABI } from "@/Blockchain/ABI";
import { updateIsPayPremium } from "@/lib/action/dataAction";

// components
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const usePayPremiumOnbc = (contractAddr: string) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading2, setLoading2] = useState(false);
  let providerRef = useRef<ethers.BrowserProvider | null>(null);
  let signerRef = useRef<ethers.Signer | null>(null);
  let contractRef = useRef<ethers.Contract | null>(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      providerRef.current = provider;
      console.log("reset Peovider");
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

        newContract.on("PremiumPaid", handlePayPremium);
      }
    };

    initializeContract();

    if (contractRef.current) {
      contractRef.current.removeAllListeners("PremiumPaid");
    }
  }, [router, toast, contractAddr]);

  const handlePayPremium = async (farmer: string, premium: string) => {
    console.log("PremiumPaid event received", farmer, premium);
    const result = await updateIsPayPremium(contractAddr);

    if (result) {
      setLoading2(false);
      router.refresh();
    } else {
      toast({
        title: "error",
        description: "無法上傳至區塊鏈",
      });
      setLoading2(false);
    }
  };

  const updatePayPremiumFC = async () => {
    const contract = contractRef.current;
    const signer = signerRef.current;

    if (contract && signer) {
      try {
        setLoading2(true);
        const tx = await contract.payPremium();
        await tx.wait();
        toast({
          title: "success",
          description: "已成功支付保費",
        });
        console.log("tx", tx);
      } catch (e) {
        console.log(e);
        toast({
          title: "error",
          description: "支付保費失敗",
        });
        setLoading2(false);
      }
    }
  };
  return [loading2, updatePayPremiumFC] as const;
};
