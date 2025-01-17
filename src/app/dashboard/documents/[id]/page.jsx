import { getSession } from "@/app/lib/session";
import { formatDateToLocal } from "@/app/lib/utils";
import DeleteDocButton from "@/app/ui/documents/delete-doc-btn";

import React from "react";
import FilePreview from "@/app/ui/documents/file-preview";
import Breadcrumbs from "@/app/ui/documents/breadcrumb";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import EditMetaButton from "@/app/ui/documents/edit-meta-btn";
const DocumentDetails = async ({ params }) => {
  // const docId = params.id;
  const { id: docId } = await params; // Await params here
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
  console.log("document content: ", document.content);
  console.log("document content object: ", content);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Documents", href: "/dashboard/documents" },
          {
            label: `${document.title}`,
            href: `/dashboard/documents/${document.id}`,
            active: true,
          },
        ]}
      />
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Download
          </Button>

          {!document.content && (
            <Button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200">
              <Link href={`${docId}/edit`}>Edit</Link>
            </Button>
          )}
          {document.content && (
            <>
              <Button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200">
                <Link href={`/dashboard/documents/create/${docId}`}>
                  Update Content
                </Link>
              </Button>
              <EditMetaButton document={document} token={token} />
            </>
          )}

          {/* <DeleteDocument id={docId} /> */}
          <DeleteDocButton documentId={docId} />

          <Button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Share
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Metadata Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Uploaded By</p>
              <p className="text-base font-medium">{document.author}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Upload Date</p>
              <p className="text-base font-medium">
                {formatDateToLocal(document.created_at)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Tags</p>
              <p className="text-base font-medium">
                {document.tags.join(", ")}
              </p>
            </div>
          </div>
        </section>

        {/* Document Preview Section */}
        {/* <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Preview</h2>
          <div className="border rounded-lg overflow-hidden">
            {document.path !== null && document.path.endsWith(".pdf") ? (
              <embed
                src={document.path}
                width="100%"
                height="400px"
                type="application/pdf"
              />
            ) : (
              <p className="p-4 text-gray-600">
                Preview not available for this file type.
              </p>
            )}
          </div>
        </section> */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Preview</h2>
          <div className="border rounded-lg overflow-hidden">
            <FilePreview
              content={content}
              filePath={document.path}
              width="100%"
              height="400px"
              fallbackMessage="Preview not available for this file type."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocumentDetails;
