"use client";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import React, {useEffect, useState } from "react";
import { Button } from "../button";
import { useRouter, useSearchParams } from "next/navigation";
import { axios, setBearerToken } from "@/app/lib/axios";
const DocumentTypeForm = ({token}) => {
    const params = useSearchParams();
    const documentTypeId = params.get('typeId')
    const router = useRouter()

    const [loading,setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

  const[documentType, setDocumentType] = useState({
    typeName: "",
    id: ""
  })

  const[data, setData] = useState({
    name: "",
    id: ""
  })
  const [title, setTitle] = useState("Create DocumentType")
  const [action,setAction] = useState("Create")

  useEffect(() => {
    if(documentTypeId) {
        setTitle("Update DocumentType")
        setBearerToken(token)
        axios.get(`types/${documentTypeId}`)
        .then((response) => {
            setData(response.data.data)
            setAction("Update")
        })
        .catch((error) => {
            alert("failed to get documentType")
        })
    }
  }, [title, documentType])

  const handleChange = (e) => {
    setData({...data, ['name']: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBearerToken(token)
    setErrorMessage(null)
    setLoading(true)
    if(documentTypeId) {
        //perform update
        const update = {
            name : data.name,
        }
        
        axios.put(`types/${documentTypeId}`, JSON.stringify(update))
        .then((response) => {
            setLoading(false)
            if(response.status === 200) {
                alert("update success")
                return router.push("/dashboard/document-types")
            }
        })
        .catch((error) => {
            console.log("update documentType error: ", error)
            setErrorMessage(error)
            alert("update documentType failed")
            return
        })
    } else {
        axios.post('types', JSON.stringify({name: data.name}))
        .then((response) => {
            setLoading(false)
            if(response.status === 201) {
                alert("create success")
                return router.push("/dashboard/document-types")
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
      <label htmlFor="typeName" className="text-center">{title}</label>
      <input value={data.name} onChange={handleChange} type="text" id="typeName" name="typeName" className="p-4 outline" />

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

export default DocumentTypeForm;
