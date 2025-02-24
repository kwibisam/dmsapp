"use client";

import React, { useState } from "react";
import QuotationForm from "./quotation-form";
import ServiceRequestForm from "./service-request-form";
import ContractForm from "./contract-form";
import ReportForm from "./report-form";

const formComponents = {
  quotation: QuotationForm,
  serviceRequest: ServiceRequestForm,
  contract: ContractForm,
  report: ReportForm,
};

const DocumentWizard = ({token}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [docData, setDocData] = useState({
    title: "",
    documentType: "",
    tags: [],
  });

  const steps = ["Document Info", "Form Details"];

  const updateField = (field, value) => {
    setDocData((prev) => ({ ...prev, [field]: value }));
  };

  const goToNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
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
        <p>Select Form Type:</p>
        {["quotation", "serviceRequest", "contract", "report"].map((type) => (
          <button
            key={type}
            onClick={() => updateField("documentType", type)}
            className={`mr-2 px-4 py-2 rounded ${
              docData.documentType === type
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
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
    const FormComponent = formComponents[docData.documentType];
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

export default DocumentWizard;
