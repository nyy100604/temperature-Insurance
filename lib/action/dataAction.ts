"use server";
import { mongodbConnect } from "@/mongoDb/connect";
import User from "@/mongoDb/schema/userSchema";
import Policy from "@/mongoDb/schema/policySchema";

// get all users
export const getAllUser = async () => {
  try {
    await mongodbConnect();
    const users = await User.find({ role: "farmer" });
    return JSON.parse(JSON.stringify(users));
  } catch (e) {
    console.log(e);
    return false;
  }
};

// save ploicy data from blockchain event
export const savePolicyData = async (
  policyAddress: string,
  farmer: string,
  premium: string,
  payout: string,
  startDate: string,
  endDate: string,
  temperatureThreshold: string,
  location: string
) => {
  await mongodbConnect();
  const policy = new Policy({
    farmer,
    contractAddress: policyAddress,
    premium,
    payout,
    startDate,
    endDate,
    temperatureThreshold,
    location,
    updateTemperature: false,
    approveMoney: false,
    isClaimed: false,
  });
  try {
    await policy.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// get all policies
export const getAllPolicy = async () => {
  await mongodbConnect();
  try {
    const policies = await Policy.find({});
    if (policies) {
      return JSON.parse(JSON.stringify(policies));
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

// get all policies by farmer blockchain address
export const getAllPolicyByAddress = async (address: string) => {
  await mongodbConnect();
  const policies = await Policy.find({ farmer: address });
  if (policies) {
    return JSON.parse(JSON.stringify(policies));
  } else {
    return false;
  }
};

export const getCurrentTemperature = async (location: string) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7f5aa3b88e5ada970e8ce2e32de8fec1`
  );
  const resData = await res.json();

  if (resData) {
    console.log(Math.ceil(resData.main.temp));
    return Math.ceil(resData.main.temp);
  } else {
    return false;
  }
};

// updateTemperature
export const updatePolicyTemperatureData = async (contractAddress: string) => {
  await mongodbConnect();
  try {
    const newPolicy = await Policy.findOneAndUpdate(
      { contractAddress },
      { updateTemperature: true },
      { new: true }
    );
    if (newPolicy) {
      return JSON.parse(JSON.stringify(newPolicy));
    }
  } catch (e) {
    return false;
  }
};

// updateApproveMoney
export const updateApproveMoneyData = async (contractAddress: string) => {
  await mongodbConnect();
  try {
    const newPolicy = await Policy.findOneAndUpdate(
      { contractAddress },
      { approveMoney: true },
      { new: true }
    );
    if (newPolicy) {
      if (newPolicy) {
        return JSON.parse(JSON.stringify(newPolicy));
      }
    }
  } catch (e) {
    return false;
  }
};

// updateIsClaim
export const updateIsClaim = async (contractAddress: string) => {
  await mongodbConnect();
  try {
    const newPolicy = await Policy.findOneAndUpdate(
      { contractAddress },
      { isClaimed: true },
      { new: true }
    );
    if (newPolicy) {
      if (newPolicy) {
        return JSON.parse(JSON.stringify(newPolicy));
      }
    }
  } catch (e) {
    return false;
  }
};

// updateIsPayout
export const updateIsPayPremium = async (contractAddress: string) => {
  await mongodbConnect();
  try {
    const newPolicy = await Policy.findOneAndUpdate(
      { contractAddress },
      { isPayPremuim: true },
      { new: true }
    );
    if (newPolicy) {
      if (newPolicy) {
        return JSON.parse(JSON.stringify(newPolicy));
      }
    }
  } catch (e) {
    return false;
  }
};
