"use client";
import { updateDocContent } from "@/app/lib/actions";
import React, { useCallback, useState, useEffect, useRef } from "react";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import Table from "@editorjs/table";
import ColumnLayout from "@/app/lib/editor-column-layout";
import SimpleImage from "@/app/lib/simple-image";
import LayoutTool from "@/app/lib/layout-tool";
const Editor = ({ data, docId }) => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef();

  const initEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          layout: LayoutTool,
          image: {
            class: SimpleImage,
            inlineToolbar: ["link"],
          },
          header: {
            class: Header,
            shortcut: "CMD+SHIFT+H",
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
          list: {
            class: EditorjsList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
        },
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

        // const r = await updateDocContent(docId, outputData);
        // if (r) {
        //   alert("update success!");
        // } else {
        //   alert("update failed, try again");
        // }
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
