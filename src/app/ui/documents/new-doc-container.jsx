"use client";

import { useActionState, useState } from "react";
import Modal from "../modal";
import { createDocument, uploadDocument } from "@/app/lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import CreateDocForm from "./create-form";

const NewDocContainer = ({ types, tags, token, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(""); // Track the selected file name

  const [errorMessage, formAction, isPending] = useActionState(
    uploadDocument,
    undefined
  );

  const [errorMessage2, formAction2, isPending2] = useActionState(
    createDocument,
    undefined
  );

  const [docData, setDocData] = useState({
    title: "", // For document title
    file: null, // For uploaded file
    type: "", // For document type
    tags: [], // For selected tags
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Handle file input separately
    if (type === "file") {
      setDocData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the first file in the state
      }));
      setSelectedFileName(files[0]?.name || ""); // Update the selected file name
    }
    // Handle checkbox inputs (for tags)
    else if (type === "checkbox") {
      setDocData((prevData) => ({
        ...prevData,
        tags: checked
          ? [...prevData.tags, value] // Add the tag if checked
          : prevData.tags.filter((tag) => tag !== value), // Remove the tag if unchecked
      }));
    } else {
      setDocData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUploadClick = () => {
    setModalType("upload");
    setIsModalOpen(true);
  };

  const handleFormClick = () => {
    setModalType("form");
    setIsModalOpen(true);
  };

  const handleBlankClick = () => {
    setModalType("blank");
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Create A Document
      </h1>
      <div className="flex flex-col justify-center items-center h-96">
        <div className="flex justify-center items-center gap-8">
          <button
            onClick={handleUploadClick}
            className="p-8 bg-white rounded-lg text-blue-600 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center w-48 h-48"
          >
            <svg
              className="w-12 h-12 mb-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span className="text-lg font-semibold">Upload File</span>
          </button>
          <button
            onClick={handleBlankClick}
            className="p-8 bg-white rounded-lg text-blue-600 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center w-48 h-48"
          >
            <svg
              className="w-12 h-12 mb-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-lg font-semibold">Blank</span>
          </button>

          <button
            onClick={handleFormClick}
            className="p-8 bg-white rounded-lg text-blue-600 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center w-48 h-48"
          >
            <svg
              className="w-12 h-12 mb-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-lg font-semibold">Form</span>
          </button>
        </div>
      </div>

      {/* Modal Content */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white rounded-lg w-full mx-auto p-8">
          {modalType === "upload" ? (
            // Upload File Modal Content
            <>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Upload File
              </h2>
              <p className="text-gray-600 mb-6">
                Please select a file to upload.
              </p>

              <form className="space-y-6" action={formAction}>
                <div>
                  <input
                    value={docData.title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                    required
                    placeholder="Document Title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300">
                  <label className="block text-gray-700 font-medium mb-2">
                    Select File
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    required
                    name="file"
                    id="file-upload"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx, jpg, .png" // Specify supported file types
                  />
                  <label
                    htmlFor="file-upload"
                    className="text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Click to upload or drag and drop
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    Supported formats: PDF, DOC, DOCX
                  </p>
                  {selectedFileName && (
                    <p className="mt-2 text-sm text-gray-700">
                      Selected file:{" "}
                      <span className="font-semibold">{selectedFileName}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <fieldset className="border p-4 rounded-lg bg-gray-50">
                    <legend className="text-gray-700 font-medium">
                      WorkSpace
                    </legend>
                    <select
                      name="workspace_id"
                      id="type"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {user?.workspaces.map((workspace, indx) => (
                        <option
                          key={indx}
                          value={workspace.id}
                          className="text-gray-700"
                        >
                          {workspace.name}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset className="border p-4 rounded-lg bg-gray-50">
                    <legend className="text-gray-700 font-medium">
                      Document Type
                    </legend>
                    <select
                      name="type_id"
                      id="type"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {types.map((type, indx) => (
                        <option
                          key={indx}
                          value={type.id}
                          className="text-gray-700"
                        >
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset className="border p-4 rounded-lg bg-gray-50">
                    <legend className="text-gray-700 font-medium">Tags</legend>
                    {tags.map((tag, indx) => (
                      <div
                        key={tag.id}
                        className="flex items-center space-x-2 mt-2"
                      >
                        <input
                          name="tag"
                          value={tag.id}
                          type="checkbox"
                          id={indx}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={indx} className="text-gray-700">
                          {tag.name}
                        </label>
                      </div>
                    ))}
                  </fieldset>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-300"
                    disabled={isPending} // Disable the button when loading
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-blue-600 rounded-full"
                          viewBox="0 0 24 24"
                          style={{ borderTopColor: "transparent" }}
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            strokeWidth="4"
                          ></circle>
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            strokeWidth="4"
                            strokeDasharray="31.4"
                            strokeDashoffset="10"
                            stroke="blue"
                          ></circle>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
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
            </>
          ) : modalType === "blank" ? (
            // Blank Document Modal Content
            <>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Create Blank Document
              </h2>
              <p className="text-gray-600 mb-6">
                Starting a new blank document.
              </p>

              <form className="space-y-6" action={formAction2}>
                <div>
                  <input
                    value={docData.title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                    required
                    placeholder="Document Title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <fieldset className="border p-4 rounded-lg bg-gray-50">
                    <legend className="text-gray-700 font-medium">
                      WorkSpace
                    </legend>
                    <select
                      name="type"
                      id="type"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {types.map((type, indx) => (
                        <option
                          key={indx}
                          value={type.id}
                          className="text-gray-700"
                        >
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset className="border p-4 rounded-lg bg-gray-50">
                    <legend className="text-gray-700 font-medium">
                      Document Type
                    </legend>
                    <select
                      name="type"
                      id="type"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {types.map((type, indx) => (
                        <option
                          key={indx}
                          value={type.id}
                          className="text-gray-700"
                        >
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset className="border p-4 rounded-lg bg-gray-50">
                    <legend className="text-gray-700 font-medium">Tags</legend>
                    {tags.map((tag, indx) => (
                      <div
                        key={tag.id}
                        className="flex items-center space-x-2 mt-2"
                      >
                        <input
                          name="tag"
                          value={tag.id}
                          type="checkbox"
                          id={indx}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={indx} className="text-gray-700">
                          {tag.name}
                        </label>
                      </div>
                    ))}
                  </fieldset>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-300"
                    disabled={isPending} // Disable the button when loading
                  >
                    {isPending2 ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-blue-600 rounded-full"
                          viewBox="0 0 24 24"
                          style={{ borderTopColor: "transparent" }}
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            strokeWidth="4"
                          ></circle>
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            strokeWidth="4"
                            strokeDasharray="31.4"
                            strokeDashoffset="10"
                            stroke="blue"
                          ></circle>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
                <div
                  className="flex h-8 items-end space-x-1"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {errorMessage2 && (
                    <>
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-500">{errorMessage2}</p>
                    </>
                  )}
                </div>
              </form>
            </>
          ) : modalType === "form" ? (
            <>
              <CreateDocForm token={token} />
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default NewDocContainer;
