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
const RoleForm = ({token}) => {
    const params = useSearchParams();
    const roleId = params.get('roleId')
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
  const [title, setTitle] = useState("Create Role")
  const [action,setAction] = useState("Create")

  useEffect(() => {
    if(roleId) {
        setTitle("Update Role")
        setBearerToken(token)
        axios.get(`roles/${roleId}`)
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


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBearerToken(token)
//     try {
//         if (roleId) {
//             // Perform update
//             const update = {
//                 name: data.name,
//                 role_id: roleId,
//             };

//             const updateResponse = await axios.put("roles", update);

//             if (updateResponse.status === 200) {
//                 alert("Update successful");
//                 return router.push("/dashboard/roles");
//             } else {
//                 alert("Update failed, try again later");
//                 return;
//             }
//         }

//         // Perform create
//         const createResponse = await axios.post(
//             "roles",
//             { name: data.name },
//         );

//         if (createResponse.status === 201) {
//             alert("Create successful");
//             return router.push("/dashboard/roles");
//         } else {
//             alert("Create failed, try again later");
//         }
//     } catch (error) {
//         alert("Request failed: " + error.message);
//     }
// };


  const handleSubmit = async (e) => {
    e.preventDefault()
    setBearerToken(token)
    if(roleId) {
        //perform update
        const update = {
            name : data.name,
        }
        
        axios.put(`roles/${roleId}`, JSON.stringify(update))
        .then((response) => {
            if(response.status === 200) {
                alert("update success")
                return router.push("/dashboard/roles")
            }
        })
        .catch((error) => {
            console.log("update role error: ", error)
            alert("update failed")
            return
        })
    } else {
        axios.post('roles', JSON.stringify({name: data.name}))
        .then((response) => {
            if(response.status === 201) {
                alert("create success")
                return router.push("/dashboard/roles")
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
      <label htmlFor="roleName" className="text-center">{title}</label>
      <input value={data.name} onChange={handleChange} type="text" id="roleName" name="roleName" className="p-4 outline" />

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

export default RoleForm;
