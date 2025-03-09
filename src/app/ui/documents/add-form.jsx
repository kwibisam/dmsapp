"use client";

import Link from "next/link";
import {
  UserCircleIcon,
  DocumentIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { addDocument } from "@/app/lib/actions";
import { useActionState } from "react";
import { Button } from "../button";

export default function Form({ customers }) {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useActionState(addDocument, initialState);

  const tags = ["Finance", "Sales", "Legal", "HR", "Operations"];
  const documentTypes = [
    {
      id: 1,
      name: "Quotation",
    },
    {
      id: 2,
      name: "Invoice",
    },
    {
      id: 3,
      name: "Service Request",
    },
  ];
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Upload Document */}
        <div className="mb-4">
          <label htmlFor="document" className="mb-2 block text-sm font-medium">
            Upload Document
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="file"
                name="document"
                id="document"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="file-error"
              />
            </div>
          </div>
        </div>

        {/* Document Title */}
        <div className="relative mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Document Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="text"
                id="title"
                placeholder="Enter document title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Document Type */}
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            Type of Document
          </label>
          <div className="relative">
            <select
              id="type"
              name="typeId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="documenttype-error"
            >
              <option value="" disabled>
                Select document type
              </option>
              {documentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="documenttype-error" aria-live="polite" aria-atomic="true">
            {state.errors?.typeId &&
              state.errors.typeId.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Tags */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set document tags
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border hover:bg-blue-400 hover:text-white transition`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/documents"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Document</Button>
      </div>
    </form>
  );
}
