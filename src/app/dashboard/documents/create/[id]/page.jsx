import { getSession } from "@/app/lib/session";
import TextEditor from "@/app/ui/documents/text-editor";
import React from "react";

const DocumentEditorPage = async ({ params }) => {
  const docId = await params.id;
  const session = await getSession();
  const token = session?.token;
  const document = await fetch(
    `http://api.dms.zamnet.zm/api/documents/${docId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json().then((data) => data.data));
  console.log("document by id:", document);
  const fullContent = JSON.parse(document.content);
  console.log("full content: ", fullContent);
  return (
    <div className="bg-gray-100">
      <h1>{document.title}</h1>
      <TextEditor token={token} data={fullContent} docId={docId} />
    </div>
  );
};

export default DocumentEditorPage;
