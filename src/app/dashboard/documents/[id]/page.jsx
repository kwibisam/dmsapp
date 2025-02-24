import React from "react";
import Breadcrumbs from "@/app/ui/documents/breadcrumb";
import Editor from "@/app/ui/documents/editor";
import EditorRender from "@/app/ui/documents/editor-renderer";
import { fetchDocumentById } from "@/app/lib/data";
import PdfPreview from "@/app/ui/documents/pdf-viewer";
import QuotationFormReadonly from "@/app/ui/documents/quotation-form-readonly";
import QuotationView from "@/app/ui/documents/quotation-view";
const DocumentDetails = async ({ params, searchParams }) => {
  const { id: docId } = await params; // Await params here
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

          {/* <PdfPreview  file={document.path} /> */}
        </div>
      )}

      {document.isEditable && (
        <div>
          {isNew ? (
            <Editor docId={docId} />
          ) : (
            // <EditorRender data={content} />
            <Editor docId={docId} data={JSON.parse(documentLatestVersion.content)} readonly={true} />
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentDetails;
