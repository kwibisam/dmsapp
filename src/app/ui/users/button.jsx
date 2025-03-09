import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  deleteDocument,
  deleteRole,
  deleteDocumentType,
  deleteWorkspace,
  deleteTag,
  removeRoleFromUser,
} from "@/app/lib/actions";
import { removeUserRole } from "@/app/lib/actions/user";
export function AddDocument() {
  return (
    <Link
      href="/dashboard/documents/add"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Document</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateDocument({ id }) {
  return (
    <Link
      href={`/dashboard/documents/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function UpdateRole({ id }) {
  return (
    <Link
      href={`/dashboard/roles/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteRole({ id }) {
  const deleteRoleWithId = deleteRole.bind(null, id);

  return (
    <form action={deleteRoleWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteTag({ id }) {
  const deleteTagWithId = deleteTag.bind(null, id);

  return (
    <form action={deleteTagWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteWorkspace({ id }) {
  const deleteWorkspaceWithId = deleteWorkspace.bind(null, id);

  return (
    <form action={deleteWorkspaceWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
export function DeleteDocumentType({ id }) {
  const deleteDocumentTypeWithId = deleteDocumentType.bind(null, id);
  return (
    <form action={deleteDocumentTypeWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
// export function RemoveUserRole({ userId, roleId }) {
//   return (
//     <form action={null}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }

export function RemoveUserRole({ userId, roleId }) {
  const removeUserRoleWithId = removeUserRole.bind(null, userId, roleId);

  return (
    <form action={removeUserRoleWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
