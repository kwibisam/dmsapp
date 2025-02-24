'use client'
import React, { useActionState, useState } from 'react'
import Modal from '../modal'
import { createRole } from '@/app/lib/actions'

const RolePageContainer = () => {
    const [modalOpen,setModalOpen] = useState(false)
    const [errorMessage, formAction, isPending] = useActionState(
        createRole,
        undefined
      );

  return (
    <div>
        <button onClick={() => setModalOpen(true)}>new role</button>

        <Modal isOpen={modalOpen}>
            <form action={formAction}>
                <input type="text" name='role' />

                {errorMessage && (<div>
                    <p>{errorMessage}</p>
                </div>)}
                <button disabled={isPending}>create</button>
            </form>
        </Modal>
    </div>
  )
}

export default RolePageContainer