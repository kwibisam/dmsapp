import React from "react";
import UserDetailsForm from "./details";
import { fetchRoles, fetchUserWithId, fetchWorkspaces } from "@/app/lib/data";
import { fetchDepartments } from "@/app/lib/data/department";

const UserDetailsContent = async ({ userId }) => {
  const user = await fetchUserWithId(userId);
  console.log("user details page: ", user);

  const workspaces = await fetchWorkspaces();
  const departments = await fetchDepartments();
  const roles = await fetchRoles();
  return (
    <div>
      <h1>User {userId}</h1>
      <h2>User: {user.name}</h2>
      <h2>User: {user.email}</h2>
      <UserDetailsForm
        user={user}
        workspaces={workspaces}
        roles={roles}
        departments={departments}
      />
    </div>
  );
};

export default UserDetailsContent;
