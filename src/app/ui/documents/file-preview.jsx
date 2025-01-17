import React from "react";
import QuillReadOnly from "./quill-readonly";

const FilePreview = ({
  content,
  filePath,
  width = "100%",
  height = "400px",
  fallbackMessage = "Preview not available for this file type.",
}) => {
  // Check if neither filePath nor content is provided
  if (!filePath && !content) {
    return <p className="p-4 text-gray-600">{fallbackMessage}</p>;
  }

  // If content is provided, render the QuillReadOnly component
  if (content) {
    return <QuillReadOnly data={content} />;
  }

  const fileExtension = filePath.split(".").pop().toLowerCase();

  switch (fileExtension) {
    case "pdf":
      return (
        <embed
          src={filePath}
          width={width}
          height={height}
          type="application/pdf"
          className="border rounded-lg overflow-hidden"
        />
      );
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return (
        <img
          src={filePath}
          alt="File Preview"
          width={width}
          height={height}
          className="border rounded-lg overflow-hidden"
          style={{ objectFit: "cover" }}
        />
      );
    case "mp4":
    case "webm":
    case "ogg":
      return (
        <video
          controls
          width={width}
          height={height}
          className="border rounded-lg overflow-hidden"
        >
          <source src={filePath} type={`video/${fileExtension}`} />
          {fallbackMessage}
        </video>
      );
    case "txt":
      return (
        <iframe
          src={filePath}
          width={width}
          height={height}
          className="border rounded-lg overflow-hidden"
          title="Text File Preview"
        />
      );
    default:
      return <p className="p-4 text-gray-600">{fallbackMessage}</p>;
  }
};

export default FilePreview;
