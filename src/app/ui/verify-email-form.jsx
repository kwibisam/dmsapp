"use client";
import React, { useActionState } from "react";
import { verifyEmail } from "../lib/actions";

const VerifyEmailForm = ({ url, signature }) => {
  const completeUrl = `${url}&signature=${signature}`;
  const verifyEmailWithUrl = verifyEmail.bind(null, completeUrl);
  const [errorMessage, formAction, isPending] = useActionState(
    verifyEmailWithUrl,
    undefined
  );

  return (
    <form className="flex justify-center" action={formAction}>
      <button className="bg-green-400 p-4" disabled={isPending}>
        Verify
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default VerifyEmailForm;
