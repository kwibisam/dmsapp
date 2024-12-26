import React from "react";

const DocumentDetails = () => {
  const document = {
    title: "Demo Document",
    type: "Quotation",
    client: "Demo Client",
    uploadDate: "2024-12-16",
    documentUrl: "/demo.pdf",
    version: "v1.0",
    tags: ["Finance", "Quotation"],
    uploadedBy: "John Doe",
  };

  const {
    title,
    type,
    client,
    uploadDate,
    documentUrl,
    version,
    tags,
    uploadedBy,
  } = document;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Download
          </button>
          <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200">
            Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Delete
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Share
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Metadata Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="text-base font-medium">{type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="text-base font-medium">{client}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Uploaded By</p>
              <p className="text-base font-medium">{uploadedBy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Upload Date</p>
              <p className="text-base font-medium">{uploadDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Version</p>
              <p className="text-base font-medium">{version}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tags</p>
              <p className="text-base font-medium">{tags.join(", ")}</p>
            </div>
          </div>
        </section>

        {/* Document Preview Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Preview</h2>
          <div className="border rounded-lg overflow-hidden">
            {documentUrl.endsWith(".pdf") ? (
              <embed
                src={documentUrl}
                width="100%"
                height="400px"
                type="application/pdf"
              />
            ) : (
              <p className="p-4 text-gray-600">Preview not available for this file type.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocumentDetails;
