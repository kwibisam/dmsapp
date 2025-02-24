import React from 'react'

const EditRole = async ({searchParams}) => {
    const roleId = (await searchParams).id

  return (
    <div>
        <h1>Edit Role</h1>
        <div>{roleId}</div>
    </div>
  )
}

export default EditRole