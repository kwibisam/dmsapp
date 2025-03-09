"use client";
import { useActionState } from "react";
import { TrashIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { removeUserRole } from "@/app/lib/actions/user";
const RemoveUserRoleButton = ({ userId, roleId }) => {
  const removeUserRoleWithId = removeUserRole.bind(null, userId, roleId);
  const [errorMessage, formAction, isPending] = useActionState(
    removeUserRoleWithId,
    undefined
  );

  return (
    <form action={formAction}>
      <button
        disabled={isPending}
        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <TrashIcon className="w-6" />
        <div className="hidden md:block">remove</div>
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

export default RemoveUserRoleButton;
