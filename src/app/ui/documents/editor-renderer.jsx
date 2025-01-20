"use client";
import React from "react";
import Output from "editorjs-react-renderer";
const EditorRender = ({ data }) => {
  return (
    <div>
      <section>
        <Output data={data} />
      </section>
    </div>
  );
};

export default EditorRender;
