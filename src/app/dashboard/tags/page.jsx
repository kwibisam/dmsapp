import { fetchTags } from "@/app/lib/data";
import { getSession } from "@/app/lib/session";
import { DeleteTag} from "@/app/ui/documents/buttons";
import TagForm from "@/app/ui/tags/tags";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Suspense } from "react";

const TagsPage = async ({ searchParams }) => {
  const tags = await fetchTags();
  const showModal = (await searchParams).modal;
  const session = await getSession()
  const token = session?.token
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Tags</h1>
        <Link
          href="/dashboard/tags?modal=1"
          className="bg-blue-600 p-3 py-2 rounded-md text-white m-4"
        >
          create
        </Link>
      </div>

      <div className="">
        <table className="border border-gray-100 w-full">
          <thead>
            <tr>
              <th className="text-start px-4 py-1">Tag Name</th>
              <th className="text-start px-4 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id}>
                <td className="px-4 py-1">{tag.name}</td>

                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    {/* <UpdateRole id={tag.id} /> */}
                    <DeleteTag id={tag.id} />

                    <Link
                      href={`/dashboard/tags?modal=1&tagId=${tag.id}`}
                      className="rounded-md border p-2 hover:bg-gray-100"
                    >
                      <PencilIcon className="w-5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Suspense fallback="Loading">
          <div className="fixed inset-0 bg-black bg-opacity-15 flex justify-center py-12">
            <div className="bg-white p-4 rounded-md">
              <TagForm token={token}/>
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default TagsPage;
