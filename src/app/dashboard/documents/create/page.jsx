import { getSession } from "@/app/lib/session";
import CreateDoc from "@/app/ui/documents/create-doc";
import CreateDocForm from "@/app/ui/documents/create-form";
import Link from "next/link";
import React from "react";

const CreateDocument = async () => {
  const session = await getSession();
  const token = session?.token;
  console.log("the token:", token);
  console.log("the session:", session);
  return (
    <div>
      <h1>start a new document</h1>
      <Link href="create/1">blank doc</Link>
      <CreateDoc token={token} />
    </div>
  );
};

export default CreateDocument;
