import React from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { createPost } from '../../services/postService'
import FileUploader from '../../components/ui/FileUploader'
import TextEditor from '../../components/ui/TextEditor'
import {useAuth} from '../../context/AuthContext'

export default function CreateBlog() {
    const [preview, setPreview] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {user} = useAuth()
    useEffect(() => {
      if(title.trim() && content?.content?.length > 0) {
        setError('')
      }
    }, [title, content])

    const handleSubmit = async(e) => {
      e.preventDefault()
      
      try {
        if(!title.trim() || !content?.content?.length) {
          setError('Required fields are empty')
          return
        }
        await createPost({title:title.trim(), author_id:user.id, content:content, media_url:preview})
        setTitle('')
        setContent('')
        setPreview(null)
        setError('')
        navigate('/blogs')
      } catch (err) {
        console.log('Error: ', err)
        setError(err.message)
      }
    }

  return (
    <main className='w-full min-h-screen'>
      <form 
      onSubmit={handleSubmit} 
      className="w-full lg:w-200 mx-auto shadow-lg p-10">
        <h1 className="text-3xl opacity-70">New blog</h1>
        {error && <span className='text-red-600'>*{error}</span>}
        <div className="my-5 flex flex-col">
            <label 
            htmlFor="blog-name" 
            className='text-2xl mb-2'><span 
            className='text-red-500 mr-2'>*</span>Title </label>
            <input 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
            placeholder='Input title...' 
            id='blog-name' 
            type="text" 
            className='border border-[#adb5bd] px-4 py-2 rounded-[10px]'/>
        </div>

        <div className="my-5 flex flex-col">
            <label htmlFor="blog-content" className='text-2xl mb-2'><span className='text-red-500 mr-2'>*</span>Content </label>
            <TextEditor onChange={setContent}/>
        </div>

        <FileUploader currentPreview={null} onPreviewChange={setPreview}/>

        <div className="flex justify-between">
          <Link 
          to="/" 
          className='transition-all duration-300 px-1 py-2 w-40 text-center text-white rounded-[4px] bg-[#007bff] hover:cursor-pointer m-10 hover:opacity-70'>
            Back
          </Link>
          <button 
          type='submit' 
          className='transition-all duration-300 px-1 py-2 w-40 rounded-[4px] text-white bg-[#007bff] hover:cursor-pointer m-10 hover:opacity-70'>
            Create
          </button>
        </div>

      </form>
    </main>
  )
}
