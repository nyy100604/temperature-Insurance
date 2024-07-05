"use client";
import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { BrowserProvider } from "ethers";
import { signIn } from "next-auth/react";

// components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const signVerifyMessage = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const message = "請簽署此段訊息登入系統";
    const signature = await signer.signMessage(message);
    return [message, signature] as const;
  };

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const [message, signature] = await signVerifyMessage();
        setLoading(true);
        await signIn("Farmer", { message, signature });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
        toast({
          title: "error",
          description: "請再登入一次",
        });
      }
    } else {
      setLoading(false);
      toast({
        title: "error",
        description: "請再登入一次",
      });
    }
  };

  return (
    <Button onClick={handleLogin}>
      {loading ? (
        <div className="flex items-center gap-x-2">
          <LoaderCircle size={20} className="animate-spin" />
          登入中
        </div>
      ) : (
        <div>使用者登入</div>
      )}
    </Button>
  );
};

export default UserLogin;
