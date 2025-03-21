import React from "react";
import PasswordResetForm from "../ui/password-reset-form";

const ResetPassword = async ({ searchParams }) => {
  const token = (await searchParams).token;
  const email = (await searchParams).email;

  console.log("ResetPage token: ", token);
  console.log("ResetPage email: ", email);

  return (
    <div>
      <PasswordResetForm token={token} email={email} />
    </div>
  );
};

export default ResetPassword;
