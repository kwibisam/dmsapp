"use client"
import React, { useActionState } from 'react'
import { Button } from '../button'
import { ArrowRightIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { createUser } from '@/app/lib/actions'

const UserForm = ({workspaces}) => {
      const [errorMessage, formAction, isPending] = useActionState(
        createUser,
        undefined
      );
  return (
    <form action={formAction} className='flex flex-col gap-4'>
        <label htmlFor="name">Full Name</label>
        <input name='name' className='border px-4 py-2 rounded-md' type="text" id='name'/>

        <label htmlFor="email">Email</label>
        <input name='email' type="email" id='email' className='border px-4 py-2 rounded-md'/>

        <label htmlFor="password">Password</label>
        <input name='password' type="password" id='password' className='border px-4 py-2 rounded-md' />
        <label htmlFor="workspace">Default WorkSpace</label>
        <select name="workspace_id" id="workspace" className='border px-4 py-2 rounded-md'>
            <option value="" disabled defaultValue="">Select Workspace</option>
            
            {
                workspaces.map((space) => (
                    <option key={space.id} value={space.id}>{space.name}</option>
                ))
            }
        </select>

        <Button className="mt-4 w-full" aria-disabled={isPending}>
          register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
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
  )
}

export default UserForm