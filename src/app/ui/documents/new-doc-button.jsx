"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
const NewDocumentButton = () => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [menuVisible]);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="flex gap-3 px-4 py-2 items-center rounded-lg bg-blue-600 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <PlusIcon className="h-5" />
        <span className="hidden md:block">new</span>
      </button>
      {menuVisible && (
        <div
          ref={menuRef}
          className="absolute top-0 left-0 mt-2 bg-white border border-gray-300 p-2 rounded shadow-lg z-10"
        >
          <ul>
            <li
              onClick={() => router.push("/dashboard/documents/add")}
              className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
            >
              Upload
            </li>

            <li
              onClick={() => router.push("/dashboard/documents/create")}
              className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
            >
              Create
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewDocumentButton;
