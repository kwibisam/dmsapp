"use client";
import { createWorkspace } from "@/app/lib/actions";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "../button";
import { useRouter, useSearchParams } from "next/navigation";
import { axios, setBearerToken } from "@/app/lib/axios";
const WorkspaceForm = ({token}) => {
    const params = useSearchParams();
    const workspaceId = params.get('workspaceId')
    const router = useRouter()

    const [loading,setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

  const[workspace, setWorkspace] = useState({
    name: "",
    id: ""
  })

  const[data, setData] = useState({
    name: "",
    id: ""
  })
  const [title, setTitle] = useState("Create Workspace")
  const [action,setAction] = useState("Create")

  useEffect(() => {
    if(workspaceId) {
        setTitle("Update Workspace")
        setBearerToken(token)
        axios.get(`workspaces/${workspaceId}`)
        .then((response) => {
            setData(response.data.data)
            setAction("Update")
        })
        .catch((error) => {
            alert("failed to get workspace")
        })
    }
  }, [title, workspace])

  const handleChange = (e) => {
    setData({...data, ['name']: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBearerToken(token)
    setErrorMessage(null)
    setLoading(true)
    if(workspaceId) {
        //perform update
        const update = {
            name : data.name,
        }
        
        axios.put(`workspaces/${workspaceId}`, JSON.stringify(update))
        .then((response) => {
            setLoading(false)
            if(response.status === 200) {
                alert("update success")
                return router.push("/dashboard/workspaces")
            }
        })
        .catch((error) => {
            console.log("update workspace error: ", error)
            setErrorMessage(error)
            alert("update workspace failed")
            return
        })
    } else {
        axios.post('workspaces', JSON.stringify({name: data.name}))
        .then((response) => {
            setLoading(false)
            if(response.status === 201) {
                alert("create success")
                return router.push("/dashboard/workspaces")
            }
            alert("create failed try again later")
            return
        })
        .catch((error) => {
            setErrorMessage(error)
            alert("update failed")
            return
        })
    }
  }
  return (
    <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4">
      <label htmlFor="workspaceName" className="text-center">{title}</label>
      <input value={data.name} onChange={handleChange} type="text" id="roleName" name="workspaceName" className="p-4 outline" />

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

export default WorkspaceForm;
