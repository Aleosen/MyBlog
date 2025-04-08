import React from 'react'
import { useState, useRef } from 'react'

export default function FileUploader({currentPreview, onPreviewChange}) {
    const validTypes = ['image/jpeg', 'image/png']
    const maxSize = 10 * 1024 * 1024
    const [preview, setPreview] = useState(currentPreview)
    const fileInputRef = useRef(null)

    const handleFileChange = (e)=>{
        const file = e.target.files[0]
        if(!file) return;
        if(!validTypes.includes(file.type)){
          e.target.value=''
          return alert('Wrong file format')
        }
        if(file.size > maxSize){
          e.target.value=''
          return alert("File is too big")
        }
        if(file.type.startsWith('image/')){
          const reader = new FileReader()
          reader.onloadend = ()=>{
            setPreview(reader.result)
            onPreviewChange(reader.result)
          }
          reader.readAsDataURL(file)
        }
      }
  return (
    <div className="flex mb-10 flex-col justify-center items-center p-20 border border-dashed rounded-3xl">
          <div className="">
          <label htmlFor="upload" className='hover:cursor-pointer hover:opacity-70'>📷 Search</label>
          <input 
          id='upload' 
          ref={fileInputRef}
          type="file" 
          onChange={(e)=>handleFileChange(e)} 
          className='hidden' 
          />
          </div>
          {preview && (
          <div className="mt-10 w-100 h-100 rounded-2xl relative">
            <img
              src={preview}
              alt="Preview"
              className='rounded-2xl cover w-100 h-100 '
            />
            <button
              type='button'
              onClick={() => {
                onPreviewChange(null)
                setPreview(null)
                if(fileInputRef.current) {
                  fileInputRef.current.value = ''
                }
              }}
              className='shadow-lg absolute top-0 right-0 hover:cursor-pointer opacity-50 hover:opacity-75 bg-white text-2xl px-3 py-1 rounded-full'
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        )}
        </div>
  )
}
