"use client";
import { updateFileDocument } from "@/app/lib/actions/documents";
import React, { useActionState } from "react";

const UpdateFileDocument = ({ docId }) => {
  const updateFileDocumentWithId = updateFileDocument.bind(null, docId);
  const [errorMessage, formAction, isPending] = useActionState(
    updateFileDocumentWithId,
    undefined
  );
  return (
    <div>
      <h4>upload new file</h4>
      <form action={formAction}>
        <input type="file" name="file" />

        <div>
          <button disabled={isPending}>update</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default UpdateFileDocument;
