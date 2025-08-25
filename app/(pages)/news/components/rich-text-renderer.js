"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useState } from "react"

export function RichTextRenderer({ content }) {
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none",
      },
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  if (!isMounted || !editor) {
    return <div className="animate-pulse h-32 bg-muted rounded"></div>
  }

  return (
    <div className="rich-text-content">
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextRenderer
