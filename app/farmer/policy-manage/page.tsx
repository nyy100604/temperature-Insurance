import React from "react";
import { auth } from "@/auth";
import { getAllPolicyByAddress } from "@/lib/action/dataAction";

// components
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PolicyData from "@/components/pages/policy-manage/PolicyData";

const PolicyManage = async () => {
  const session = (await auth()) as any;
  // console.log(session?.user);
  let policies;
  if (session?.user?.address) {
    policies = await getAllPolicyByAddress(session?.user?.address);
    console.log(policies);
  }

  return (
    <>
      {" "}
      <div className="bg-policyManagementMobile lg:bg-policyManagementDesktop  bg-center bg-cover pb-10">
        <Header />
        <PolicyData policies={policies} />
      </div>
      <Footer />
    </>
  );
};

export default PolicyManage;
