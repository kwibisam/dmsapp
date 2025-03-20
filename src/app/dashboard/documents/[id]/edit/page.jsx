import { fetchDocumentById, fetchDocumentTags } from "@/app/lib/data";
import { getSession } from "@/app/lib/session";
import Breadcrumbs from "@/app/ui/documents/breadcrumb";
import DocumentForm from "@/app/ui/documents/doc-form";
import Editor from "@/app/ui/documents/editor";
import UpdateFileDocument from "@/app/ui/documents/update-file-form";
import React from "react";

const DocumentEdit = async ({ params }) => {
  const { id: docId } = await params;
  const session = await getSession();
  const token = session?.token;
  const document = await fetchDocumentById(docId);
  const tags = await fetchDocumentTags();
  const data = {
    document,
    tags,
  };

  const documentLatestVersion = document.versions.reduce((latest, version) => {
    return version.version_number > latest.version_number ? version : latest;
  }, document.versions[0]);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Document", href: `/dashboard/documents/${docId}` },
          {
            label: "Edit Document",
            href: `/dashboard/documents/${docId}/edit`,
            active: true,
          },
        ]}
      />

      <div>
        {/* <DocumentForm token={token} initialData={data} /> */}

        <h1>{document.title}</h1>

        {document.isEditable && (
          <Editor
            docId={docId}
            data={JSON.parse(documentLatestVersion.content)}
          />
        )}

        {document.isFile && <UpdateFileDocument docId={docId} />}
      </div>
    </div>
  );
};

export default DocumentEdit;
