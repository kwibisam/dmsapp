import { useState, useRef, useEffect, useLayoutEffect } from "react";

const PAGE_HEIGHT = 500; // Simulated page height in pixels

export default function MultiPageDocument() {
  const [pages, setPages] = useState([""]); // Stores content for each page
  const pageRefs = useRef([]); // Refs for each page container

  // Effect to check and adjust pagination when text overflows
  useLayoutEffect(() => {
    adjustPagination();
  }, [pages]); // Runs only when pages change

  const handleInput = (e, index) => {
    const updatedPages = [...pages];
    updatedPages[index] = e.target.innerText; // Update content
    setPages(updatedPages);
  };

  const adjustPagination = () => {
    let newPages = [...pages];
    let hasChanges = false;

    for (let i = 0; i < newPages.length; i++) {
      const pageEl = pageRefs.current[i];
      if (pageEl && pageEl.scrollHeight > PAGE_HEIGHT) {
        const overflowingText = extractOverflowingText(pageEl);

        if (overflowingText) {
          newPages[i] = newPages[i].replace(overflowingText, ""); // Remove overflow text
          if (newPages[i + 1]) {
            newPages[i + 1] = overflowingText + " " + newPages[i + 1];
          } else {
            newPages.push(overflowingText);
          }
          hasChanges = true;
        }
      }
    }

    if (hasChanges) {
      setPages(newPages);
    }
  };

  // Extract text that overflows a given div
  const extractOverflowingText = (element) => {
    const words = element.innerText.split(" ");
    let extractedText = "";
    while (element.scrollHeight > PAGE_HEIGHT && words.length > 1) {
      extractedText = words.pop() + " " + extractedText;
      element.innerText = words.join(" ");
    }
    return extractedText.trim();
  };

  return (
    <div className="document">
      {pages.map((content, index) => (
        <div
          key={index}
          className="page"
          contentEditable
          suppressContentEditableWarning
          ref={(el) => (pageRefs.current[index] = el)}
          onInput={(e) => handleInput(e, index)}
        >
          {content}
        </div>
      ))}
    </div>
  );
}
