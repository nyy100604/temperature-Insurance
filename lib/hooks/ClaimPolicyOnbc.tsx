"use client";
import { ethers } from "ethers";
import { InsurancePolicyContract_ABI } from "@/Blockchain/ABI";
import { updateIsClaim } from "../action/dataAction";
import { useRouter } from "next/navigation";

// components
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";

export const useClaimPolicyOnbc = (contractAddr: string) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading4, setLoading4] = useState(false);
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

        newContract.on("PolicyClaimed", handleIsClaim);
      }
    };

    initializeContract();

    return () => {
      if (contractRef.current) {
        contractRef.current.removeAllListeners("PolicyClaimed");
      }
    };
  }, [router, toast, contractAddr]);

  const handleIsClaim = async (payout: string) => {
    console.log("PolicyClaimed event received", payout);
    const result = await updateIsClaim(contractAddr);

    if (result) {
      setLoading4(false);
      router.refresh();
    } else {
      toast({
        title: "error",
        description: "無法上傳至區塊鏈",
      });
      setLoading4(false);
    }
  };

  const updateIsclaimFC = async () => {
    const contract = contractRef.current;
    const signer = signerRef.current;

    if (contract && signer) {
      try {
        setLoading4(true);
        const tx = await contract.claimPayment();
        await tx.wait();
        toast({
          title: "success",
          description: "已成功獲得理賠",
        });
        console.log("tx", tx);
      } catch (e) {
        console.log(e);
        toast({
          title: "error",
          description: "無法獲取理賠",
        });
        setLoading4(false);
      }
    }
  };
  return [loading4, updateIsclaimFC] as const;
};
