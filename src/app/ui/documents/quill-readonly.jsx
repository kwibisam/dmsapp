"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const QuillReadOnly = ({ data }) => {
  const [quill, setQuill] = useState();
  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ];

  //   const wrapperRef = useCallback(
  //     (wrapper) => {
  //       if (wrapper == null) return;

  //       wrapper.innerHTML = "";
  //       const editor = document.createElement("div");
  //       wrapper.append(editor);
  //       const q = new Quill(editor, {
  //         theme: "snow",
  //         modules: { toolbar: false }, // Disable the toolbar for read-only mode
  //         readOnly: true, // Set the editor to read-only mode
  //       });
  //       q.setContents(data); // Load the content into the editor
  //       setQuill(q);
  //     },
  //     [data]
  //   );

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    console.log("data readonly: ", data);
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      readOnly: true,
      modules: { toolbar: false }, // Disable the toolbar for read-only mode
    });

    // q.disable();
    // q.setText("Loading...");
    q.setContents(data);
    setQuill(q);
  }, []);

  return (
    <div>
      <div className="container" ref={wrapperRef}></div>
    </div>
  );
};

export default QuillReadOnly;
