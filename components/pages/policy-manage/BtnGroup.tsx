"use client";
import React from "react";
import { useUpdateTemperatureOnbc } from "@/lib/hooks/UpdateTemperatureOnbc";
import { useApproveMoneyOnbc } from "@/lib/hooks/ApproveMoneyOnbc";
import { useClaimPolicyOnbc } from "@/lib/hooks/ClaimPolicyOnbc";
import { usePayPremiumOnbc } from "@/lib/hooks/PayPremiumOnbc";
import { LoaderCircle } from "lucide-react";

// components
import { Button } from "@/components/ui/button";

const BtnGroup = ({
  currentPolicyData,
  currentTemperature,
}: {
  currentPolicyData: any;
  currentTemperature: number | null;
}) => {
  const [loading1, approveMoneyFC] = useApproveMoneyOnbc(
    currentPolicyData.contractAddress
  );
  const [loading2, updatePayPremiumFC] = usePayPremiumOnbc(
    currentPolicyData.contractAddress
  );
  const [loading3, updateTemperatureFC] = useUpdateTemperatureOnbc(
    currentPolicyData.contractAddress
  );

  const [loading4, updateIsclaimFC] = useClaimPolicyOnbc(
    currentPolicyData.contractAddress
  );
  const currentTemperature1 = currentTemperature as unknown as string;
  console.log("currentTemperature1", currentTemperature1);

  const isPayPremuim = currentPolicyData.isPayPremuim;
  const isUpdateTemperature = currentPolicyData.updateTemperature;
  const isApproveMoney = currentPolicyData.approveMoney;
  const isClaimed = currentPolicyData.isClaimed;
  const temperatureThreshold = currentPolicyData.temperatureThreshold;

  return (
    <div className="flex justify-start mt-6 gap-x-8 pr-4 w-full overflow-x-scroll no-scrollbar lg:justify-center">
      <Button
        className="rounded-r-full pr-6"
        disabled={
          !isApproveMoney && !isPayPremuim && !isUpdateTemperature && !isClaimed
            ? false
            : true
        }
        onClick={() => approveMoneyFC(currentPolicyData.premium)}
      >
        {loading1 ? (
          <span className="flex items-center gap-x-2">
            <LoaderCircle className="animate-spin" /> 上傳中
          </span>
        ) : (
          <span>① 同意保險合約取用您的金錢</span>
        )}
      </Button>
      <Button
        className="rounded-r-full pr-6"
        disabled={
          isApproveMoney && !isPayPremuim && !isUpdateTemperature && !isClaimed
            ? false
            : true
        }
        onClick={() => updatePayPremiumFC()}
      >
        {loading2 ? (
          <span className="flex items-center gap-x-2">
            <LoaderCircle className="animate-spin" /> 上傳中
          </span>
        ) : (
          <span>② 支付保費</span>
        )}
      </Button>
      <Button
        className="rounded-r-full pr-6"
        disabled={
          isApproveMoney &&
          isPayPremuim &&
          !isUpdateTemperature &&
          !isClaimed &&
          currentTemperature1 > temperatureThreshold
            ? false
            : true
        }
        onClick={() => updateTemperatureFC(currentTemperature1)}
      >
        {loading3 ? (
          <span className="flex items-center gap-x-2">
            <LoaderCircle className="animate-spin" /> 上傳中
          </span>
        ) : (
          <span>③ 更改合約溫度</span>
        )}
      </Button>

      <Button
        className="rounded-r-full pr-6 active:scale-90"
        disabled={
          isApproveMoney && isPayPremuim && isUpdateTemperature && !isClaimed
            ? false
            : true
        }
        onClick={() => updateIsclaimFC()}
      >
        {loading4 ? (
          <span className="flex items-center gap-x-2">
            <LoaderCircle className="animate-spin" /> 上傳中
          </span>
        ) : (
          <span>④ 申請理賠</span>
        )}
      </Button>
    </div>
  );
};

export default BtnGroup;
