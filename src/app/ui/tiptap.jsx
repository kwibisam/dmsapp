'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useEffect, useState } from 'react'

const Tiptap = () => {

    const [editor,setEditor] = useState(null)
useEffect(() => {
    if(typeof window !== 'undefined') {
        const editor = new Editor({
            // bind Tiptap to the `.element`
            element: document.querySelector('.element'),
            // register extensions
            extensions: [Document, Paragraph, Text],
            // set the initial content
            content: '<p>Example Text</p>',
            // place the cursor in the editor after initialization
            autofocus: true,
            // make the text editable (default is true)
            editable: true,
            // prevent loading the default CSS (which isn't much anyway)
            injectCSS: false,
          })
          setEditor(editor)
    }
}, [])
 
  return <EditorContent editor={editor} />
}

export default Tiptap
