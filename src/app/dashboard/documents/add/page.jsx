// import { fetchCustomers } from '@/app/lib/data';
import React from "react";
import Breadcrumbs from "@/app/ui/documents/breadcrumb";
import Form from "@/app/ui/documents/add-form";
import CreateDocForm from "@/app/ui/documents/create-form";
import MainComponent from "@/app/ui/documents/main-component";
export const metadata = {
  title: "Create Document",
};

const AddDocument = async () => {
  // const customers = await fetchCustomers();

  const customers = [];

  function UploadFile() {
    return (
      <form >
        <div className="flex flex-col gap-2 items-center border border-dashed p-4">
          <h3>Drag and drop your File here.</h3>
          <p>supported formats: PDF, DOC, JPG</p>
          <input type="file" name="file" id="" />
          <button className="bg-green-200 p-4 rounded-full" type="submit">
            save
          </button>
        </div>
      </form>
    );
  }

  function DocumentMetaDataForm() {
    return (
      <form>
        <input
          className="p-4 outline"
          type="text"
          placeholder="Document Title"
        />
      </form>
    );
  }

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
      <CreateDocForm/>
    </main>
  );
};


export default AddDocument;

