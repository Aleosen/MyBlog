
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder'
import { FaBold, FaItalic, FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa';
import './TextEditor.css'
export default function TextEditor({ onChange, error, contentValue }){

    const editor = useEditor({
        extensions: [
          StarterKit.configure({
          }),
          TextAlign.configure({
            types: ['paragraph'],
          }),
          Placeholder.configure({
            placeholder: 'Input content...',
            emptyEditorClass: 'is-editor-empty',
          }),
        ],
        onUpdate: ({ editor }) => {
          onChange(editor.isEmpty ? null : editor.getJSON());
        },
        content: contentValue || "",
      });


      if (!editor) return null;

  return (
        <div className={`editor ${error ? 'editor-error' : ''}`}>
          <div className="toolbar flex items-center mb-2">
            <button
              type='button'
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "active" : ""}
            >
              <FaBold size={24} />
            </button>
    
            <button
                type='button'
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "active" : ""}
            >
              <FaItalic size={24} />
            </button>
    
            <button
              type='button'
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={editor.isActive({ textAlign: "left" }) ? "active" : ""}
            >
              <FaAlignLeft size={24} />
            </button>

            <button
              type='button'
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              className={editor.isActive({ textAlign: "center" }) ? "active" : ""}
            >
              <FaAlignCenter size={24} />
            </button>

            <button
              type='button'
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={editor.isActive({ textAlign: "right" }) ? "active" : ""}
            >
              <FaAlignRight size={24} />
            </button>
          </div>
          <EditorContent editor={editor}/>
        </div>
  )
}