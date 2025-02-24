import { fetchWorkspaces } from '@/app/lib/data'
import UserForm from '@/app/ui/users/user-form'
import React from 'react'

const AddUserPage = async () => {

    const workspaces = await fetchWorkspaces()
  return (
    <div>

        <h1>Add New  User</h1>
        <div>
            <UserForm workspaces={workspaces}/>
        </div>
    </div>
  )
}

export default AddUserPage