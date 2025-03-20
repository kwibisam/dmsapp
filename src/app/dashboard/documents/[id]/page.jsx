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

  console.log("document details latest version: ", documentLatestVersion);
  console.log("document details: ", document);
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

      {document.isForm && (
        <div>
          <QuotationView data={JSON.parse(documentLatestVersion.content)} />
        </div>
      )}

      {document.isFile && (
        <div>
          <embed
            src={documentLatestVersion.file_path}
            width="100%"
            height="400px"
            type="application/pdf"
            className="border rounded-lg overflow-hidden"
          />
        </div>
      )}

      {document.isEditable && (
        <div>
          {isNew ? (
            <Editor
              docId={docId}
              data={JSON.parse(documentLatestVersion.content)}
            />
          ) : (
            // <EditorRender data={content} />
            <div>
              <Link href={`${docId}/edit`}>edit</Link>
              <Editor
                docId={docId}
                data={JSON.parse(documentLatestVersion.content)}
                readonly={true}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentDetails;
