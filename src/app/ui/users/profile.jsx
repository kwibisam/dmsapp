"use client";
import { updatePassword } from "@/app/lib/actions/user";
import React, { useActionState, useState } from "react";

const UserProfileDetails = ({ user }) => {
  const [modal, setModal] = useState(false);
  const updatePasswordWithId = updatePassword.bind(null, user.id);
  const [errorMessage, formAction, isPending] = useActionState(
    updatePasswordWithId,
    undefined
  );
  return (
    <div>
      <div>
        <p>Name: {user.name}</p>
        <p>Role: {user.roles[0].name}</p>
      </div>

      <div>
        {modal && (
          <div className="fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center">
            <form
              className="relative bg-slate-200 p-4 flex flex-col gap-4 -translate-y-24"
              action={formAction}
            >
              <span
                onClick={() => {
                  setModal(false);
                }}
                className="absolute top-0 right-0 text-lg mx-4 cursor-pointer rounded-full"
              >
                x
              </span>
              <span className="mt-4"></span>
              <h4>Update Password</h4>
              <label htmlFor="">Current Password</label>
              <input
                className="border"
                type="password"
                name="current_password"
              />
              <label htmlFor="">New Password</label>
              <input className="border" type="password" name="new_password" />
              <button disabled={isPending}>update</button>
              {errorMessage && <p>{errorMessage}</p>}
            </form>
          </div>
        )}
        <button
          className="bg-blue-500 px-4 py-2"
          onClick={() => {
            setModal(true);
          }}
        >
          change password
        </button>
      </div>
    </div>
  );
};

export default UserProfileDetails;
