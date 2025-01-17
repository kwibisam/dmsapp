import Pagination from "@/app/ui/documents/pagenation";
import Search from "@/app/ui/search";
import { AddDocument } from "@/app/ui/documents/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeleton";
import { Suspense } from "react";
import { fetchDocumentsPages } from "@/app/lib/data";
import DocumentsTable from "@/app/ui/documents/table";
import NewDocumentButton from "@/app/ui/documents/new-doc-button";
export const metadata = {
  title: "Documents",
};

export default async function Documents(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchDocumentsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Documents</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search documents..." />
        {/* <AddDocument /> */}
        <NewDocumentButton />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <DocumentsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
