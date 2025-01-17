"use client";
import { deleteDocumentById } from "@/app/lib/actions";
import React from "react";
import { useActionState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";

const DeleteDocButton = ({ documentId }) => {
  const [errorMessage, formAction, isPending] = useActionState(
    deleteDocumentById,
    undefined
  );
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={documentId} />
      {/* <button
        aria-disabled={isPending}
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        delete
      </button> */}

      <Button
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        aria-disabled={isPending}
      >
        DELETE
      </Button>

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
};

export default DeleteDocButton;
