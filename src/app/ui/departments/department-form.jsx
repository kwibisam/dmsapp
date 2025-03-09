"use client";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { useRouter, useSearchParams } from "next/navigation";
import { axios, setBearerToken } from "@/app/lib/axios";
const DepartmentForm = ({ token }) => {
  const params = useSearchParams();
  const departmentId = params.get("departmentId");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [department, setDepartment] = useState({
    name: "",
    id: "",
  });

  const [data, setData] = useState({
    name: "",
    id: "",
  });
  const [title, setTitle] = useState("Create Department");
  const [action, setAction] = useState("Create");

  useEffect(() => {
    if (departmentId) {
      setTitle("Update Department");
      setBearerToken(token);
      axios
        .get(`departments/${departmentId}`)
        .then((response) => {
          setData(response.data.data);
          setAction("Update");
        })
        .catch((error) => {
          alert("failed to get department");
        });
    }
  }, [title, department]);

  const handleChange = (e) => {
    setData({ ...data, ["name"]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBearerToken(token);
    setErrorMessage(null);
    setLoading(true);
    if (departmentId) {
      //perform update
      const update = {
        name: data.name,
      };

      axios
        .put(`departments/${departmentId}`, JSON.stringify(update))
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            alert("update success");
            return router.push("/dashboard/departments");
          }
        })
        .catch((error) => {
          console.log("update department error: ", error);
          setErrorMessage(error);
          alert("update department failed");
          return;
        });
    } else {
      axios
        .post("departments", JSON.stringify({ name: data.name }))
        .then((response) => {
          setLoading(false);
          if (response.status === 201) {
            alert("create success");
            return router.push("/dashboard/departments");
          }
          alert("create failed try again later");
          return;
        })
        .catch((error) => {
          setErrorMessage(error);
          alert("update failed");
          return;
        });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4">
      <label htmlFor="departmentName" className="text-center">
        {title}
      </label>
      <input
        value={data.name}
        onChange={handleChange}
        type="text"
        id="departmentName"
        name="departmentName"
        className="p-4 outline"
      />

      <Button className="mt-4 w-full" aria-disabled={loading}>
        {action} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
};

export default DepartmentForm;
