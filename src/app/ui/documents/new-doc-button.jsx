"use client";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { createDocument } from "@/app/lib/actions";
const NewDocumentButton = () => {
  const router = useRouter();
  const [errorMessage, formAction, isPending] = useActionState(
    createDocument,
    undefined
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const [showModalOne, setShowModalOne] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [menuVisible]);

  const ModalOne = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <form
          action={formAction}
          className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-6"
        >
          <h2 className="text-lg font-bold text-gray-800">Create a New Item</h2>

          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter a title"
            />
          </div>

          {/* Tags */}
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">Tags</legend>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="tag"
                  value="2"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Finance</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="tag"
                  value="3"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">HR</span>
              </label>
            </div>
          </fieldset>

          {/* Submit and Close Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowModalOne(false)}
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              aria-disabled={isPending}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
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
          </div>
        </form>
      </div>
    );
  };

  const ModalTwo = () => {
    return <div>this is modal two</div>;
  };

  return (
    <div className="relative inline-block">
      {showModalOne && <ModalOne />}
      {showModalTwo && <ModalTwo />}
      <button
        onClick={toggleMenu}
        className="flex gap-3 px-4 py-2 items-center rounded-lg bg-blue-600 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <PlusIcon className="h-5" />
        <span className="hidden md:block">new</span>
      </button>
      {menuVisible && (
        <div
          ref={menuRef}
          className="top-0 left-0 mt-2 bg-white border border-gray-300 p-2 rounded shadow-lg z-10"
        >
          <ul>
            <li
              onClick={() => setShowModalTwo(true)}
              className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
            >
              import
            </li>

            <li
              onClick={() => setShowModalOne(true)}
              className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
            >
              Blank Document
            </li>

            <li
              onClick={() => router.push("/dashboard/documents/create")}
              className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
            >
              From Template
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewDocumentButton;
