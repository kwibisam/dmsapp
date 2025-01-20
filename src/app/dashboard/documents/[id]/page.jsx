import { getSession } from "@/app/lib/session";
import { formatDateToLocal } from "@/app/lib/utils";
import DeleteDocButton from "@/app/ui/documents/delete-doc-btn";

import React from "react";
import FilePreview from "@/app/ui/documents/file-preview";
import Breadcrumbs from "@/app/ui/documents/breadcrumb";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import EditMetaButton from "@/app/ui/documents/edit-meta-btn";
import Editor from "@/app/ui/documents/editor";
import EditorRender from "@/app/ui/documents/editor-renderer";
const DocumentDetails = async ({ params, searchParams }) => {
  // const docId = params.id;
  const { id: docId } = await params; // Await params here
  const { new: isNew } = await searchParams;
  console.log("search params: ", isNew);
  const session = await getSession();
  const token = session?.token;
  const document = await fetch(`http://127.0.0.1:8000/api/documents/${docId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json().then((data) => data.data));

  const content = JSON.parse(document.content);
  console.log("document.content: ", document.content);
  console.log("content: ", content);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Documents", href: "/dashboard/documents" },
          {
            label: `${document.title}`,
            href: `/dashboard/documents/${docId}`,
            active: true,
          },
        ]}
      />
      {/* <Editor docId={docId} data={content} /> */}
      <EditorRender data={content} />
    </div>
  );
};

export default DocumentDetails;
