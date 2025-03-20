import React from "react";
import VerifyEmailForm from "../ui/verify-email-form";

const VerifyEmail = async ({ searchParams }) => {
  const url = (await searchParams).url;
  const signature = (await searchParams).signature;

  console.log("url from verify page: ", url);
  console.log("signature from verify page: ", signature);

  return (
    <div>
      <VerifyEmailForm url={url} signature={signature} />
    </div>
  );
};

export default VerifyEmail;
