"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { demo } from "@/app/lib/actions"; // Replace with your submission function

const ContractForm = ({ onBack }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    parties: "",
    contractValue: "",
  });

  // Handle input changes locally
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit this form’s data independently
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append("startDate", formData.startDate);
    submissionData.append("endDate", formData.endDate);
    submissionData.append("parties", formData.parties);
    submissionData.append("contractValue", formData.contractValue);

    try {
      await demo(submissionData);
      router.push("/dashboard/documents");
    } catch (error) {
      console.error("Contract submission error:", error);
      alert("There was an error submitting the contract. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contract Details</h2>

      <div className="mb-4">
        <label className="block mb-1">Contract Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Contract End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Parties Involved:</label>
        <input
          type="text"
          name="parties"
          value={formData.parties}
          onChange={handleChange}
          placeholder="Enter parties involved (comma-separated)"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Contract Value:</label>
        <input
          type="number"
          name="contractValue"
          value={formData.contractValue}
          onChange={handleChange}
          placeholder="Enter contract value"
          className="w-full p-2 border rounded"
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

export default ContractForm;
