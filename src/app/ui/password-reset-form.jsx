"use client";
import React, { useActionState } from "react";
import { resetPassword } from "../lib/actions/user";

const PasswordResetForm = ({ token, email }) => {
  const resetPasswordWithEmail = resetPassword.bind(null, { token, email });
  const [errorMessage, formAction, isPending] = useActionState(
    resetPasswordWithEmail,
    undefined
  );
  return (
    <form action={formAction} className="flex justify-center">
      <div className="border p-4 flex flex-col gap-4">
        <h2>Reset Your Password</h2>

        <div className="flex flex-col">
          <label htmlFor="password1">New Password</label>
          <input
            className="border"
            type="password"
            name="password"
            id="password1"
          />

          <label htmlFor="password2">Confirm Password</label>
          <input
            className="border"
            type="password"
            name="confirm_password"
            id="password2"
          />
        </div>

        <div className="">
          <button className="bg-blue-400 px-4 py-2" disabled={isPending}>
            save
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </form>
  );
};

export default PasswordResetForm;
