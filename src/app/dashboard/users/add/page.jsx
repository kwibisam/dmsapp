import { fetchWorkspaces } from "@/app/lib/data";
import { fetchDepartments } from "@/app/lib/data/department";
import UserForm from "@/app/ui/users/user-form";
import React from "react";

const AddUserPage = async () => {
  const departments = await fetchDepartments();
  return (
    <div>
      <h1>Add New User</h1>
      <div>
        <UserForm departments={departments} />
      </div>
    </div>
  );
};

export default AddUserPage;
