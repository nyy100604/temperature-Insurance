import React from "react";

import { getAllUser } from "@/lib/action/dataAction";
import CreatePolicyForm from "./CreatePolicyForm";

const CreatePolicy = async () => {
  const users = await getAllUser();
  // console.log(users);

  return (
    <div className="w-full">
      {" "}
      <div className="Boxbg tracking-widest text-white mt-10">
        <div className="mx-auto">
          {" "}
          <h1>創建保單</h1>
          {/* form */}
          <CreatePolicyForm users={users} />
        </div>
      </div>
      {/* the div tag is used to saperate footer */}
      <div className="py-9"></div>
    </div>
  );
};

export default CreatePolicy;
