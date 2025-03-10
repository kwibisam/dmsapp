"use client";

import React, { useState } from "react";
import QuotationForm from "./quotation-form";
import ServiceRequestForm from "./service-request-form";
import ContractForm from "./contract-form";
import ReportForm from "./report-form";

const formComponents = {
  Quotation: QuotationForm,
  ServiceRequest: ServiceRequestForm,
  Contract: ContractForm,
  Report: ReportForm,
};

const CreateDocForm = ({ token, user, tags, documentTypes }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedWorkspace, setSelectedWorkspace] = useState(
    user?.workspaces[0]?.id
  );

  const handleWorkspaceSelectChange = (e) => {
    setSelectedWorkspace(e.target.value);
  };

  const [docData, setDocData] = useState({
    title: "",
    documentType: null,
    tags: [],
    workspace_id: selectedWorkspace,
  });

  const steps = ["Document Info", "Form Details"];

  const updateField = (field, value) => {
    setDocData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTagSelection = (tagId) => {
    setDocData((prev) => {
      const isSelected = prev.tags.includes(tagId);
      return {
        ...prev,
        tags: isSelected
          ? prev.tags.filter((id) => id !== tagId) // Remove if already selected
          : [...prev.tags, tagId], // Add if not selected
      };
    });
  };

  const goToNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  const goToPrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderDocumentInfo = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Document Information</h2>
      <input
        type="text"
        value={docData.title}
        onChange={(e) => updateField("title", e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded mb-4"
      />

      <div className="mb-4">
        <p>Select Workspace:</p>
        <select
          value={selectedWorkspace}
          onChange={handleWorkspaceSelectChange}
          name="workspace_id"
          id=""
        >
          {user.workspaces?.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <p>Select Form Type:</p>
        {documentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => updateField("documentType", type)}
            className={`mr-2 px-4 py-2 rounded ${
              docData.documentType?.id === type.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <p>Choose tags</p>
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              id={`tag-${tag.id}`}
              value={tag.id}
              checked={docData.tags.includes(tag.id)}
              onChange={() => toggleTagSelection(tag.id)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`tag-${tag.id}`} className="text-gray-700">
              {tag.name}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={goToNext}
        disabled={!docData.title || !docData.documentType}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </div>
  );

  const renderFormDetails = () => {
    const FormComponent = formComponents[docData.documentType.name];
    if (!FormComponent) return <p>Unsupported form type selected.</p>;
    return (
      <div>
        <FormComponent meta={docData} token={token} />
        <div className="flex justify-end mt-4">
          <button
            onClick={goToPrevious}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderDocumentInfo();
      case 1:
        return renderFormDetails();
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-max mx-auto shadow rounded">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">New Document Wizard</h1>
        {/* <p>
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </p> */}
      </header>
      {renderStepContent()}
    </div>
  );
};

export default CreateDocForm;
