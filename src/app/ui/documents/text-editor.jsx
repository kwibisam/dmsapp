"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import useEcho from "@/hooks/echo";
import { axios, setBearerToken } from "@/app/lib/axios";
import { useRouter } from "next/navigation";
const TextEditor = ({ user, token, data, docId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  setBearerToken(token);
  // const echo = useEcho();
  const [quill, setQuill] = useState();
  const [delta, setDelta] = useState(null);
  const SAVE_INTERVAL_MS = 2000;
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

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    // q.disable();
    // q.setText("Loading...");
    console.log("the data type: ", typeof data);
    q.setContents(data);
    setQuill(q);
  }, []);

  // useEffect(() => {
  //   if (echo) {
  //     echo
  //       .private(`document.${user?.id}`)
  //       .listen("DocumentUpdated", (event) => {
  //         console.log("document updated", event);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    if (quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      setDelta(delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]);

  const handleSave = async () => {
    // if (!delta) return;
    const fullContents = quill.getContents();
    const update = {
      content: fullContents,
    };
    console.log("json string of contnt: ", JSON.stringify(update));
    setLoading(true);
    const response = await fetch(
      `http://127.0.0.1:8000/api/documents/${docId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      }
    );
    setLoading(false);
    if (!response.ok) {
      alert("save failed try again.");
      return;
    }

    alert("save successful!");
    router.push(`/dashboard/documents/create/${docId}`);
  };
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {" "}
          <p>SAVING</p>
        </div>
      )}
      <button onClick={handleSave}>save</button>
      <div className="container" ref={wrapperRef}></div>
    </div>
  );
};

export default TextEditor;
