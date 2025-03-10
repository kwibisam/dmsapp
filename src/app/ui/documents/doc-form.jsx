"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const DocumentForm = ({ initialData = null, token }) => {
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    description: "",
    tags: "",
    file: null,
  });

  useEffect(() => {
    console.log("initial data: ", initialData);
    if (initialData) {
      setData({
        title: initialData.document.title || "",
        tags: initialData.tags || "",
        file: null,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", data.tags);
    if (data.file) {
      formData.append("file", data.file);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      if (initialData) {
        // Update operation
        await fetch(`/api/documents/${initialData.id}`, {
          method: "PUT",
          body: formData,
        });
        alert("Document updated successfully");
      } else {
        // Create operation
        const response = await fetch(`http://api.dms.zamnet.zm/api/documents`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          console.log(response.statusText);
          alert(`failed with error message: ${response.statusText}`);
          return;
        }
        const result = await response.json();
        console.log("data", result.data);
        alert("Document added successfully");
      }
      router.push("/dashboard/documents");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="font-medium my-4 uppercase">Meta Data</legend>

          <div className="flex gap-4 mb-4 ml-4">
            <label className="w-60" htmlFor="title">
              Title
            </label>
            <input
              className="border flex-1"
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              required
              id="title"
            />
          </div>

          <div className="mb-4 ml-4 flex gap-4">
            <label className="w-60" htmlFor="tags">
              Tags
            </label>
            <select
              value={data.tags}
              onChange={handleChange}
              className="border flex-1"
              name="tags"
              id="tags"
            >
              <option value="1">finance</option>
              <option value="2">HR</option>
              <option value="3">sales</option>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-medium my-4 uppercase">Files</legend>
          <div className="flex justify-center">
            <input type="file" name="file" onChange={handleChange} />
          </div>
        </fieldset>

        <div className="p-8 flex justify-center">
          <button className="flex-1 p-3 bg-indigo-700 rounded-lg">
            {initialData ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentForm;
