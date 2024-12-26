"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { demo } from "@/app/lib/actions";

const CreateDocForm = ({onNext}) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ title: "", description: "" });
  const router = useRouter();

  const steps = [
    "Step 1: Upload Document",
    "Step 2: Fill Metadata",
    "Step 3: Review and Submit",
  ];

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setMetadata((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", metadata.title);
    formData.append("file", file);
  
    try {
      demo(formData)
      // const response = await fetch("http://localhost:8000/api/documents", {
      //   method: "POST",
      //   headers: {
      //     "Authorization": `Bearer ${token}`,
      //   },
      //   body: formData,
      // });
  
      // // Handle the response as needed
      // if (!response.ok) {
      //   throw new Error(response.statusText)  
      // } 
      // const result = await response.json();
      // router.push("/dashboard/documents")
    } catch (error) {
      alert("An error occurred, check logs:");
      console.log(error);
    }
  };
  
  

  const StepNavigation = ({ onBack, onNext, nextDisabled }) => (
    <div style={{ marginTop: "20px" }}>
      {onBack && <button onClick={onBack}>Back</button>}
      {onNext && (
        <button onClick={onNext} disabled={nextDisabled} style={{ marginLeft: "10px" }}>
          Next
        </button>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Step Titles at the Top */}
      <div style={{ marginBottom: "20px" }}>
        <h2>{steps[step - 1]}</h2>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          {steps.map((title, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                textAlign: "center",
                fontWeight: step === index + 1 ? "bold" : "normal",
                color: step === index + 1 ? "#000" : "#aaa",
              }}
            >
              {title}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <fieldset>
          <legend>Upload Document</legend>
          <input type="file" onChange={handleFileChange} style={{ marginBottom: "10px" }} />
          <StepNavigation onNext={handleNext} nextDisabled={!file} />
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend>Fill Metadata</legend>
          <form>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Title:</label>
              <input
                type="text"
                name="title"
                value={metadata.title}
                onChange={handleMetadataChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Description:</label>
              <textarea
                name="description"
                value={metadata.description}
                onChange={handleMetadataChange}
                style={{ width: "100%", padding: "8px", height: "80px" }}
              />
            </div>
          </form>
          <StepNavigation onBack={handleBack} onNext={handleNext} nextDisabled={!metadata.title || !metadata.description} />
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>Review and Submit</legend>
          <div style={{ marginBottom: "10px" }}>
            <h3>Uploaded Document:</h3>
            <p>{file?.name || "No file uploaded"}</p>
          </div>
          <div>
            <h3>Metadata:</h3>
            <p><strong>Title:</strong> {metadata.title}</p>
            <p><strong>Description:</strong> {metadata.description}</p>
          </div>
          <StepNavigation onBack={handleBack} onNext={handleSubmit} />
        </fieldset>
      )}
    </div>
  );
};

export default CreateDocForm;
