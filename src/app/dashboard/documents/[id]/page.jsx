import React from "react";
import Breadcrumbs from "@/app/ui/documents/breadcrumb";
import Editor from "@/app/ui/documents/editor";
import { fetchDocumentById } from "@/app/lib/data";
import QuotationView from "@/app/ui/documents/quotation-view";
import Link from "next/link";
const DocumentDetails = async ({ params, searchParams }) => {
  const { id: docId } = await params;
  const { new: isNew } = await searchParams;
  const document = await fetchDocumentById(docId);

  const documentLatestVersion = document.versions.reduce((latest, version) => {
    return version.version_number > latest.version_number ? version : latest;
  }, document.versions[0]);

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

      {/* document content */}

      <div>
        {document.isFile ? (
          <embed
            src={documentLatestVersion.file_path}
            width="100%"
            height="600px"
            type="application/pdf"
            className="border rounded-lg overflow-hidden"
          />
        ) : document.isEditable ? (
          <Editor
            docId={docId}
            data={JSON.parse(documentLatestVersion.content)}
            readonly={true}
          />
        ) : document.isForm ? (
          <QuotationView data={JSON.parse(documentLatestVersion.content)} />
        ) : (
          <p>Unsupported document type.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentDetails;
