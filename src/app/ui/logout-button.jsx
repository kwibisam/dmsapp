"use client";
import { useActionState } from "react";
import { PowerIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { logout } from "../lib/actions";
const LogoutButton = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    logout,
    undefined
  );

  return (
    <form action={formAction}>
      <button
        aria-disabled={isPending}
        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
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

export default LogoutButton;
