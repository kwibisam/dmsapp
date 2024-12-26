import React from "react";

const Finalize = ({ searchParams }) => {
  const fileName = searchParams.fileName || "No file uploaded";
  const title = searchParams.title || "No title provided";
  const description = searchParams.description || "No description provided";
  return (
    <div>
      <h1>Finalize Page</h1>
      <p>
        <strong>File Name:</strong> {fileName}
      </p>
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
};

export default Finalize;
