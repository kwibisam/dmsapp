"use client";

import React, { useState } from "react";
import { useActionState } from "react";
import { createCustomer } from "@/app/lib/actions";
import Link from "next/link";
import { Button } from "../button";

const Form = () => {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCustomer, initialState);
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = ["Finance", "Sales", "Legal", "HR", "Operations"];

  const handleSelectTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag) // Remove if already selected
        : [...prev, tag] // Add if not selected
    );
  };

  return (
    <form action={formAction}>
      <div className="space-y-6">
        {/* Customer Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Customer Name
          </label>
          <input
            className="w-full p-4 mt-2 border border-gray-300 rounded-md"
            type="text"
            id="name"
            name="name"
            placeholder="Enter customer name"
          />
        </div>

        {/* Customer Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            className="w-full p-4 mt-2 border border-gray-300 rounded-md"
            type="email"
            id="email"
            name="email"
            placeholder="Enter customer email"
          />
        </div>

        {/* Customer Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            className="w-full p-4 mt-2 border border-gray-300 rounded-md"
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter customer phone number"
          />
        </div>

        {/* Customer Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <textarea
            className="w-full p-4 mt-2 border border-gray-300 rounded-md"
            id="address"
            name="address"
            placeholder="Enter customer address"
            rows="3"
          />
        </div>

        {/* Tags */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set document tags
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    tag={tag}
                    isSelected={selectedTags.includes(tag)}
                    onSelect={handleSelectTag}
                  />
                ))}
              </div>
            </div>
          </div>
         
        </fieldset>

        {/* Hidden Input for Selected Tags */}
        <input
          type="hidden"
          name="tags"
          value={selectedTags.join(",")} // Send selected tags as a comma-separated string
        />

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
};

const Tag = ({ tag, isSelected, onSelect }) => {
  return (
    <span
      onClick={() => onSelect(tag)}
      className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border ${
        isSelected
          ? "bg-blue-400 text-white"
          : "hover:bg-blue-400 hover:text-white"
      } transition`}
    >
      {tag}
    </span>
  );
};

export default Form;
