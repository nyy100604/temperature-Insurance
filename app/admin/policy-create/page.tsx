import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import CreatePolicy from "@/components/pages/policy-create/CreatePolicy";
import PoliciesList from "@/components/pages/policy-create/PoliciesList";
import React from "react";

const Policycreate = () => {
  return (
    <>
      {" "}
      <div className="bg-policyCreateMobile w-full lg:bg-policyCreateDesktop bg-cover bg-center">
        <Header />
        <PoliciesList />
        <CreatePolicy />
      </div>
      <Footer />
    </>
  );
};

export default Policycreate;
