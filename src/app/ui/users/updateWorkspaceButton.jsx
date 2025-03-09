"use client";
import { useActionState } from "react";
import { ExclamationCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import { updateUserDefaultSpace } from "@/app/lib/actions/user";
const UpdateUserWorkspaceButton = ({ userId, workspaceId }) => {
  const updateUserWorkspaceWithId = updateUserDefaultSpace.bind(
    null,
    userId,
    workspaceId
  );
  const [errorMessage, formAction, isPending] = useActionState(
    updateUserWorkspaceWithId,
    undefined
  );

  return (
    <form action={formAction}>
      <button
        disabled={isPending}
        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium"
      >
        <CheckIcon className="w-6" />
      </button>
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

export default UpdateUserWorkspaceButton;
