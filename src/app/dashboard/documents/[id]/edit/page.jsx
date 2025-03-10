import { fetchDocumentById, fetchDocumentTags } from "@/app/lib/data";
import { getSession } from "@/app/lib/session";
import Breadcrumbs from "@/app/ui/documents/breadcrumb";
import DocumentForm from "@/app/ui/documents/doc-form";
import React from "react";

const DocumentEdit = async ({ params }) => {
  const id = await params.id;
  const session = await getSession();
  const token = session?.token;
  const document = await fetchDocumentById(id);
  const tags = await fetchDocumentTags();
  const data = {
    document,
    tags,
  };
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
        <DocumentForm token={token} initialData={data} />
      </div>
    </div>
  );
};

export default DocumentEdit;
