"use client";
import { addRoleToUser, removeRoleFromUser } from "@/app/lib/actions";
import {
  CheckIcon,
  PencilIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useActionState, useState } from "react";
import RemoveUserRoleButton from "./removeUserRoleButton";
import {
  addUserworkspace,
  updateUserDefaultSpace,
} from "@/app/lib/actions/user";
import RemoveUserWorkspaceButton from "./removeUserWorkspaceButton";
import UpdateUserWorkspaceButton from "./updateWorkspaceButton";
import UpdateUserUserDepartmentButton from "../departments/update-department-button";

const UserDetailsForm = ({ user, workspaces, roles, departments }) => {
  console.log("user: ", user.department);
  const [selectedDepartment, setSelectedDepartment] = useState(
    user.department.id
  );
  const [editDept, setEditDept] = useState(false);
  const [userWorkspaces, setUserWorkspaces] = useState(user.workspaces || []);
  const [userRoles, setUserRoles] = useState(user.roles || []);

  const [addRoleMessage, addRoleAction, addRolePending] = useActionState(
    addRoleToUser,
    undefined
  );

  const [
    addUserworkspaceMessage,
    addUserworkspaceAction,
    addUserWorkspacePending,
  ] = useActionState(addUserworkspace, undefined);

  const [inputRole, setInputRole] = useState({
    id: undefined,
  });

  const [inputWorkspace, setInputWorkspace] = useState({
    id: undefined,
  });

  const handleSave = async () => {
    setEditDept(false);
    const result = await updateUserDefaultSpace(user.id, selectedDepartment);
    if (result) {
      alert("success");
    } else {
      alert("");
    }
  };

  const handleCancel = () => {
    setSelectedDepartment(user.department.id);
    setEditDept(false);
  };

  const addRole = () => {
    addRoleToUser(user.id, inputRole.id);
  };

  const addWorkspace = () => {
    addUserworkspace(user.id, inputWorkspace.id);
  };

  const handleInputRoleChange = (e) => {
    setInputRole({ id: e.target.value });
  };

  const handleInputWorkspaceChange = (e) => {
    setInputWorkspace({ id: e.target.value });
  };

  return (
    <div>
      {/* User Details */}
      <form className="flex flex-col gap-4">
        <label htmlFor="name">Names:</label>
        <input
          value={user.name}
          readOnly
          type="text"
          id="name"
          className="border px-4 py-2"
        />

        <label htmlFor="email">Email:</label>
        <input
          value={user.email}
          readOnly
          type="email"
          id="email"
          className="border px-4 py-2"
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Update
        </button>
      </form>

      {/* Change Department */}
      <h1 className="mt-4 font-semibold">Change Deparmtment</h1>
      <div className="flex gap-2 items-center bg-blue-400 p-4 rounded-md shadow-md">
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border px-4 py-2 rounded-md"
          disabled={!editDept}
        >
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        {editDept ? (
          <>
            {/* <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600"
            >
              <CheckIcon className="w-5" />
            </button> */}

            <UpdateUserUserDepartmentButton
              userId={user.id}
              departmentId={selectedDepartment}
            />
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
            >
              <XMarkIcon className="w-5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setEditDept(true)}
            className="rounded-md border p-2 hover:bg-gray-100"
          >
            <PencilIcon className="w-5" />
          </button>
        )}
      </div>

      {/* User workspace section */}
      <h2 className="mt-6 font-semibold">User Spaces</h2>
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        {userWorkspaces.length > 0 ? (
          userWorkspaces.map((workspace, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{workspace.name}</span>
              <RemoveUserWorkspaceButton
                userId={user.id}
                roleId={workspace.id}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No workspaces assigned</p>
        )}

        <h1>Assign User Workspaces</h1>

        <form
          action={addUserworkspaceAction}
          className="flex gap-4 items-center"
        >
          <input type="hidden" value={user.id} name="userId" />
          <select
            value={inputWorkspace.name} // Make sure this value matches one of the options
            onChange={handleInputWorkspaceChange}
            name="workspaceId"
            className="flex-1"
          >
            <option value="">Select a workspace</option>{" "}
            {/* Default placeholder option */}
            {workspaces.map((workspace) => (
              <option key={workspace.id} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>

          <button
            aria-disabled={addUserWorkspacePending}
            onClick={addWorkspace}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="w-5" />
            Add Workspace
          </button>

          {addUserworkspaceMessage && <p>{addUserworkspaceMessage}</p>}
        </form>
      </div>

      {/* User Roles Section */}
      <h2 className="mt-6 font-semibold">User Roles</h2>
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        {userRoles.length > 0 ? (
          userRoles.map((role, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{role.name}</span>
              <RemoveUserRoleButton userId={user.id} roleId={role.id} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No roles assigned</p>
        )}

        <h1>Assign User Roles</h1>

        <form action={addRoleAction} className="flex gap-4 items-center">
          <input type="hidden" value={user.id} name="userId" />
          <select
            value={inputRole.name} // Make sure this value matches one of the options
            onChange={handleInputRoleChange}
            name="roleId"
            className="flex-1"
          >
            <option value="">Select a role</option>{" "}
            {/* Default placeholder option */}
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          <button
            aria-disabled={addRolePending}
            onClick={addRole}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <PlusIcon className="w-5" />
            Add Role
          </button>

          {addRoleMessage && <p>{addRoleMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserDetailsForm;
