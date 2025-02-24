"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { demo } from "@/app/lib/actions"; // Replace with your submission function

const ReportForm = ({ onBack }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    reportDate: "",
    summary: "",
    findings: "",
  });

  // Local change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form data independently
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append("reportDate", formData.reportDate);
    submissionData.append("summary", formData.summary);
    submissionData.append("findings", formData.findings);

    try {
      await demo(submissionData);
      router.push("/dashboard/documents");
    } catch (error) {
      console.error("Report submission error:", error);
      alert("There was an error submitting the report. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Report Details</h2>

      <div className="mb-4">
        <label className="block mb-1">Report Date:</label>
        <input
          type="date"
          name="reportDate"
          value={formData.reportDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Summary:</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Enter a brief summary of the report"
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Detailed Findings:</label>
        <textarea
          name="findings"
          value={formData.findings}
          onChange={handleChange}
          placeholder="Enter detailed findings"
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReportForm;
