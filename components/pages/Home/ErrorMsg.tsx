"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

const ErrorMsg = () => {
  const [Error, setError] = useState("");
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    console.log(params.get("code"));
    setError(params.get("code") as string);
    if (Error) {
      toast({
        title: "error",
        description: Error,
      });
    }
  }, [Error]);

  return <></>;
};

export default ErrorMsg;
