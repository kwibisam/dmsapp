// import { fetchCustomers } from '@/app/lib/data';
import React from "react";
import Breadcrumbs from "@/app/ui/documents/breadcrumb";
import Form from "@/app/ui/documents/add-form";
import CreateDocForm from "@/app/ui/documents/create-form";
import MainComponent from "@/app/ui/documents/main-component";
import DocumentForm from "@/app/ui/documents/doc-form";
import { getSession } from "@/app/lib/session";
import DocumentForm from "@/app/ui/documents/doc-form";
import { getSession } from "@/app/lib/session";
export const metadata = {
  title: "Create Document",
};

const AddDocument = async () => {
  // const customers = await fetchCustomers();

  const customers = [];
  const session = await getSession();
  const token = session?.token;
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Documents", href: "/dashboard/documents" },
          {
            label: "Add Document",
            href: "/dashboard/documents/add",
            active: true,
          },
        ]}
      />
      {/* <CreateDocForm/> */}
      <DocumentForm token={token} />
    </main>
  );
};

export default AddDocument;
