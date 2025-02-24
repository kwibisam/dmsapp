"use client";
import { createRole } from "@/app/lib/actions";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "../button";
import { useRouter, useSearchParams } from "next/navigation";
import { axios, setBearerToken } from "@/app/lib/axios";
const TagForm = ({token}) => {
    const params = useSearchParams();
    const tagId = params.get('tagId')
    const router = useRouter()
  const [errorMessage, formAction, isPending] = useActionState(
    createRole,
    undefined
  );

  const[role, setRole] = useState({
    name: "",
    id: ""
  })

  const[data, setData] = useState({
    name: "",
    id: ""
  })
  const [title, setTitle] = useState("Create Tag")
  const [action,setAction] = useState("Create")

  useEffect(() => {
    if(tagId) {
        setTitle("Update Tag")
        setBearerToken(token)
        axios.get(`tags/${tagId}`)
        .then((response) => {
            setData(response.data.data)
            setAction("Update")
        })
        .catch((error) => {
            alert("failed to get role")
        })
    }
  }, [title, role])

  const handleChange = (e) => {
    setData({...data, ['name']: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBearerToken(token)
    if(tagId) {
        //perform update
        const update = {
            name : data.name,
        }
        
        axios.put(`tags/${tagId}`, JSON.stringify(update))
        .then((response) => {
            if(response.status === 200) {
                alert("update success")
                return router.push("/dashboard/tags")
            }
        })
        .catch((error) => {
            console.log("update tag error: ", error)
            alert("update failed")
            return
        })
    } else {
        axios.post('tags', JSON.stringify({name: data.name}))
        .then((response) => {
            if(response.status === 201) {
                alert("create success")
                return router.push("/dashboard/tags")
            }
            alert("create failed try again later")
            return
        })
        .catch((error) => {
            alert("update failed")
            return
        })
    }
  }
  return (
    <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4">
      <label htmlFor="name" className="text-center">{title}</label>
      <input value={data.name} onChange={handleChange} type="text" id="name" name="name" className="p-4 outline" />

      <Button className="mt-4 w-full" aria-disabled={isPending}>
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

export default TagForm;
