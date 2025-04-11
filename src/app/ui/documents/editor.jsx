"use client";
import { updateDocContent } from "@/app/lib/actions";
import React, { useCallback, useState, useEffect, useRef } from "react";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import EditorJsColumns from "@/app/lib/editor-columns";
import SimpleImage from "@editorjs/simple-image";
import EditorjsList from "@editorjs/list";

const Editor = ({ data, docId, readonly }) => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef();
  const initEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          list: {
            class: EditorjsList,
          },
          header: {
            class: Header,
          },
          image: {
            class: SimpleImage,
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
              maxRows: 5,
              maxCols: 5,
            },
          },
        },
        data: data,
        readOnly: readonly,
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
        // alert(JSON.stringify(outputData));
      });
    }
  };
  return (
    <>
      {!readonly && <button onClick={save}>save</button>}
      <div
        id="editorjs"
        className="px-6 h-screen border bg-white overflow-y-scroll border-blue-400"
      ></div>
    </>
  );
};

export default Editor;
