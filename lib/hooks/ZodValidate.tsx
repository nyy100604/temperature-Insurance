"use client";
import { useState } from "react";
import { z } from "zod";

export const useCreatePolicyValidate = () => {
  const [error, setError] = useState<any>();
  console.log("error", error);

  const createPolicyValidate = z.object({
    farmer: z.string().min(1, { message: "請選擇投保之地址" }),
    temperatureThreshold: z.string().min(1, { message: "請輸入溫度閥值" }),
    basePremium: z.string().min(1, { message: "請輸入基本保費" }),
    payout: z.string().min(1, { message: "請輸入理賠金額" }),
    riskFactor: z.string().min(1, { message: "請輸入風險係數" }),
    location: z.string().min(1, { message: "請選擇投保地點" }),
    duration: z.string().min(1, { message: "請輸入保險實間區間" }),
  });

  const validate = (validateData: any) => {
    const errors = createPolicyValidate
      .safeParse(validateData)
      .error?.flatten().fieldErrors;

    if (errors) {
      setError(errors);
      return true;
    } else {
      setError(null);
      return false;
    }
  };

  return [error, validate] as const;
};
