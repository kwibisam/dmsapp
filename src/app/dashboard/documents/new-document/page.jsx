import { fetchDocumentTags, fetchDocumentTypes, fetchUser } from '@/app/lib/data'
import { getSession } from '@/app/lib/session'
import NewDocContainer from '@/app/ui/documents/new-doc-container'
import React from 'react'
const NewDocumentPage = async () => {
    const session = await getSession()
    const token = session?.token
    const types = await fetchDocumentTypes()
    const tags = await fetchDocumentTags()
    const user = await fetchUser();
    return (
        <div>
            <NewDocContainer types={types} tags={tags} token={token} user={user} />
        </div>
    )
}

export default NewDocumentPage

