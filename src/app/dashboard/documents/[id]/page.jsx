import React from "react";
import Breadcrumbs from "@/app/ui/documents/breadcrumb";
import Editor from "@/app/ui/documents/editor";
import EditorRender from "@/app/ui/documents/editor-renderer";
import { fetchDocumentById } from "@/app/lib/data";
const DocumentDetails = async ({ params, searchParams }) => {
  const { id: docId } = await params; // Await params here
  const { new: isNew } = await searchParams;
  const document = await fetchDocumentById(docId);
  const content = JSON.parse(document.content);
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
      {document.path ? (
        <div>
          <embed
            src={document.path}
            width="100%"
            height="400px"
            type="application/pdf"
            className="border rounded-lg overflow-hidden"
          />
        </div>
      ) : (
        <div>
          {isNew ? (
            <Editor docId={docId} data={content} />
          ) : (
            // <EditorRender data={content} />
            <Editor docId={docId} data={content} />
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentDetails;
