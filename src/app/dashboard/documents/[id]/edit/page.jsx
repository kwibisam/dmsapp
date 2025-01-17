import { fetchDocumentById, fetchDocumentsById } from "@/app/lib/data";
import { getSession } from "@/app/lib/session";
import Breadcrumbs from "@/app/ui/documents/breadcrumb";
import DocumentForm from "@/app/ui/documents/doc-form";
import React from "react";

const DocumentEdit = async ({ params }) => {
  const id = await params.id;
  const session = await getSession();
  const token = session?.token;
  const document = await fetchDocumentById(id);
  console.log("edit document: ", document);
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Document", href: `/dashboard/documents/${id}` },
          {
            label: "Edit Document",
            href: `/dashboard/documents/${id}/edit`,
            active: true,
          },
        ]}
      />

      <div>
        <DocumentForm token={token} initialData={document} />
      </div>
    </div>
  );
};

export default DocumentEdit;
