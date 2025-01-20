"use client";
import { updateDocContent } from "@/app/lib/actions";
import React, { useCallback, useState, useEffect, useRef } from "react";

const Editor = ({ data, docId }) => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef();

  const initEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        data: data,
      });
      ref.current = editor;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initEditor();
    };

    if (isMounted) {
      init();
      return () => {
        if (ref.current) {
          ref.current.destroy();
        }
      };
    }
  }, [isMounted]);

  const save = async () => {
    if (ref.current) {
      ref.current.save().then(async (outputData) => {
        console.log("outputData: ", outputData);

        const r = await updateDocContent(docId, outputData);
        if (r) {
          alert("update success!");
        } else {
          alert("update failed, try again");
        }
        alert(JSON.stringify(outputData));
      });
    }
  };
  return (
    <>
      <button onClick={save}>save</button>
      <div id="editorjs" className="max-w-full min-h-screen border"></div>
    </>
  );
};

export default Editor;
