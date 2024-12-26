import Image from "next/image";
import { UpdateDocument, DeleteDocument } from "@/app/ui/documents/buttons";
import DocumentStatus from "./status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchAllDocuments, fetchFilteredDocuments } from "@/app/lib/data";
export default async function DocumentsTable({ query, currentPage }) {
  // const documents = await fetchFilteredDocuments(query, currentPage);
  const documents = await fetchAllDocuments();
  console.log("documents from table component: ", documents);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {documents?.map((document) => (
              <div
                key={document.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src="/zamnet.jpg"
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${document.title} thumnail`}
                      />
                      <p>{document.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{document.user_id}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(document.created_at)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateDocument id={document.id} />
                    <DeleteDocument id={document.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Author
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created On
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {documents?.map((document) => (
                <tr
                  key={document.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/zamnet.jpg"
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${document.title}' thumbnail`}
                      />
                      <p>{document.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {document.user_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(document.created_at)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateDocument id={document.id} />
                      <DeleteDocument id={document.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
