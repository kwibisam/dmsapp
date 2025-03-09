import { fetchDepartments } from "@/app/lib/data/department";
import { getSession } from "@/app/lib/session";
import { DeleteDepartment } from "@/app/ui/documents/buttons";
import DepartmentForm from "@/app/ui/departments/department-form";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Suspense } from "react";

const DepartmentsPage = async ({ searchParams }) => {
  const departments = await fetchDepartments();
  const showModal = (await searchParams).modal;
  const edit = (await searchParams).edit;
  const session = await getSession();
  const token = session?.token;
  // const {modal} = await searchParams
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Departments</h1>
        <Link
          href="/dashboard/departments?modal=1"
          className="bg-blue-600 p-3 py-2 rounded-md text-white m-4"
        >
          create
        </Link>
      </div>

      <div className="">
        <table className="border border-gray-100 w-full">
          <thead>
            <tr>
              <th className="text-start px-4 py-1">Department Name</th>
              <th className="text-start px-4 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td className="px-4 py-1">{department.name}</td>

                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    {/* <UpdateRole id={department.id} /> */}
                    <DeleteDepartment id={department.id} />

                    <Link
                      href={`/dashboard/departments?modal=1&workspaceId=${department.id}`}
                      className="rounded-md border p-2 hover:bg-gray-100"
                    >
                      <PencilIcon className="w-5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Suspense fallback="Loading">
          <div className="fixed inset-0 bg-black bg-opacity-15 flex justify-center py-12">
            <div className="bg-white p-4 rounded-md">
              <DepartmentForm token={token} />
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default DepartmentsPage;
