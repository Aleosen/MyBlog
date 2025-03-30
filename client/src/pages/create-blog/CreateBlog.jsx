import React from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'

export default function CreateBlog() {
    const validTypes = ['image/jpeg', 'image/png']
    const maxSize = 5 * 1024 * 1024
    const [preview, setPreview] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const fileInputRef = useRef(null)
    const navigate = useNavigate()


    const handleFileChange = (e)=>{
      const file = e.target.files[0]
      setError('')
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
        reader.onloadend = ()=>setPreview(reader.result)
        reader.readAsDataURL(file)
      }
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      try {
        if(!title.trim() || !content.trim()) {
          setError('Заполните все обязательные поля')
          return
        }
        const response = await fetch('/api/blogs', {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({title:title.trim(), content:content.trim(), media_url:preview})
        })
        console.log('POST Response:', response);
        if(!response.ok) {throw new Error('Ошибка добавления')}
        const createdItem = await response.json()
        console.log('Created item:' + createdItem)
        setTitle('')
        setContent('')
        setPreview(null)
        setError('')
        navigate('/blogs')
        if(fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } catch (err) {
        console.log('Error: ', err)
        setError(err.message)
      }
    }

  return (
    <main className='w-full min-h-screen'>
      <form 
      onSubmit={handleSubmit} 
      className="w-full lg:w-250 mx-auto shadow-lg p-10">
        <h1 className="text-3xl opacity-70">Create your blog...</h1>
        {error && <span className='text-red-600'>{error}</span>}
        <div className="my-5 flex flex-col">
            <label 
            htmlFor="blog-name" 
            className='text-2xl mb-2'><span 
            className='text-red-500 mr-2'>*</span>Title </label>
            <input 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
            required 
            placeholder='Input title...' 
            id='blog-name' 
            type="text" 
            className='border border-gray-400 px-4 py-2 rounded-[10px]'/>
        </div>

        <div className="my-5 flex flex-col">
            <label htmlFor="blog-content" className='text-2xl mb-2'><span className='text-red-500 mr-2'>*</span>Content </label>
            <textarea 
            value={content} 
            onChange={(e)=>setContent(e.target.value)} 
            placeholder='Input content...' 
            id='blog-content' 
            required 
            type="text" 
            className='h-50 border border-gray-400 px-4 py-2 rounded-[10px]'/>
        </div>

        <div className="flex flex-col justify-center items-center p-20 border border-dashed rounded-3xl">
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
                setPreview(null)
                if(fileInputRef.current) {
                  fileInputRef.current.value = ''
                }
              }}
              className='absolute top-0 right-0 hover:cursor-pointer opacity-50 hover:opacity-75 bg-white text-2xl px-3 py-1 rounded-full'
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        )}
        </div>

        <div className="flex justify-between">
          <Link 
          to="/" 
          className='px-6 py-3 w-40 text-center rounded-full border hover:cursor-pointer m-10 hover:opacity-70'>
            Back
          </Link>
          <button 
          disabled={!title.trim() || !content.trim()}
          type='submit' 
          className='px-6 py-3 w-40 rounded-full border hover:cursor-pointer m-10 hover:opacity-70'>
            Create blog
          </button>
        </div>

      </form>
    </main>
  )
}
