import React, { useEffect, useState, useRef } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { IoTimeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { getPost, updatePost } from '../../services/postService';
import { deletePost } from '../../services/postService';
import FileUploader from '../../components/ui/FileUploader';
import TextEditor from '../../components/ui/TextEditor';
import DOMPurify from 'dompurify'
import { generateSafeHTML } from '../../utils/TextFromJSON';
import { tryParseJSON } from '../../utils/helpers';
import {useAuth} from '../../context/AuthContext'
import CategoriesComponent from '../../components/ui/CategoriesComponent'
import './Blog.css'
import { getDateDif } from '../../utils/helpers';
import ProfileImage from '../../components/ui/ProfileImage'
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { addView } from '../../services/viewService';

export default function Blog() {
    const [data, setData] = useState(null)
    const {id} = useParams()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [titleValue, setTitleValue] = useState('')
    const [categories, setCategories] = useState([])
    const [contentValue, setContentValue] = useState('')
    const [error, setError] = useState('')
    const [image, setImage] = useState(null)
    const settingsRef = useRef(null)
    const buttonRef = useRef(null)
    const navigate = useNavigate()
    const {user} = useAuth()

    const fetchPost = async () => {
      try {
        const result = await getPost(id)
        if(user)
          await addView(id)
        setData(result)
        setCategories(result.categories)
      } catch (err) {
        setError(err.message || 'Error');
          console.error('Database error:', err);
      }
    }
  useEffect(()=>{
      fetchPost()
      console.log('fetch')
  },[id])

  useEffect(()=>{
    const handleClickOutside = (e) => {
      if (settingsOpen && 
          !settingsRef.current?.contains(e.target) && 
          !buttonRef.current?.contains(e.target)) {
          setSettingsOpen(false)
      }
  }

  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)
  }, settingsOpen)

    const handleDelete = async (id) => {
        try {
        setSettingsOpen(false);
        await deletePost(id);
        navigate('/blogs');
        } catch (error) {
          console.error('Ошибка удаления:', error);
        }
    }

    const handleEdit = () => {
      setIsEditing(true)
      setTitleValue(data.title)
      setSettingsOpen(false)
      setContentValue(tryParseJSON(data.content))
      setImage(data.media_url)
    }

    if (!data) return <div className="text-3xl mt-20 text-center">Blog not found</div>
  return (
    <div className='w-full break-words'>
      <div className="w-full lg:w-200 mx-auto shadow-lg p-10 mb-20">
            <div className="flex justify-between relative">
                <div className="flex gap-2">
                <div onClick={(e) =>{
                  navigate(`/profile/${data.user_id}`)
                }} 
                className="mr-2 flex items-center hover:cursor-pointer">
                  <span className='mr-2'><ProfileImage image={data.avatar_url} height={30} width={30}/></span>
                  <span className="opacity-70 hover:underline">{data.username}</span>
                </div>
                  {isEditing &&
                  <div className="flex gap-2">
                    <button 
                    onClick={async()=>{
                      try {
                        console.log(contentValue?.content?.length)
                        const isEmptyContent = !contentValue?.content?.some(
                          item => item.content?.length > 0 || item.text?.trim().length > 0
                        );
                        if(!titleValue.trim() || isEmptyContent || categories?.length===0) {
                          setError('Please, fill all empty fields')
                          return
                        }
                        setIsEditing(false);
                        const result = await updatePost(
                            data.post_id, 
                            titleValue, 
                            contentValue, 
                            image,
                            categories
                        );
                        console.log('Update result:', result);
                        setError('')
                        setData(prev => ({
                          ...prev,
                          ...result, 
                          title: result.title || titleValue, 
                          content: result.content || contentValue,
                          media_url: result.media_url || image,
                          categories: result.categories || categories
                      }));
                        
                    } catch (err) {
                        console.error('Ошибка обновления:', err);
                        setError('Uncorrect input')
                        setIsEditing(true)
                    }
                    }} 
                    className='text-green-600 hover:cursor-pointer hover:opacity-70 flex items-center gap-1'><FaSave/>Save</button>
                    <button 
                    onClick={()=>{
                      setIsEditing(false)
                      setError('')
                    }}
                    className='text-red-600 hover:cursor-pointer hover:opacity-70 flex items-center gap-1'><MdCancel/>Cancel</button>
                  </div>
                  }
                </div>
                <div className="flex">
                <h3 className='gap-1 flex items-center opacity-70'><IoTimeOutline/>{getDateDif(data.created_at)}</h3>
                {user?.id===data.user_id && <button className='text-2xl ml-2 hover:cursor-pointer'
                ref={buttonRef}
                onClick={()=>setSettingsOpen(!settingsOpen)}>
                    <FiMoreVertical/>
                </button>}
                {settingsOpen && 
                <div 
                    ref={settingsRef} 
                    className={`flex w-50 z-20 flex-col rounded-b absolute top-10 right-0 opacity-0 bg-white shadow-lg transition-all duration-500 ease-in-out 
                    ${settingsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
                    ${settingsOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                                  
                                    {isEditing ? (<button 
                                                    onClick={()=>{
                                                      setIsEditing(false)
                                                      setSettingsOpen(false)
                                                      setError('')
                                                    }}
                                                    className='px-6 py-3 m-2 hover:bg-gray-100 bg-white hover:cursor-pointer text-left flex items-center gap-1'>
                                                      <TbEditOff />
                                                      Cancel edit
                                                    </button>)
                                                 :(<button 
                                                    onClick={()=>{
                                                      handleEdit()
                                                    }}
                                                    className='px-6 py-3 m-2 hover:bg-gray-100 bg-white hover:cursor-pointer text-left flex items-center gap-1'><TbEdit/>Edit</button>)}

                                  <button 
                                  onClick={()=>{
                                    handleDelete(data.post_id)
                                  }}
                                  className='px-6 py-3 m-2 hover:bg-gray-100 bg-white hover:cursor-pointer text-left text-red-600 flex items-center gap-1'>
                                    <MdDelete/>
                                    Delete</button>
                              </div>}
                </div>
            </div>
            {<p className='text-red-500 mt-5'>{error}</p>}
            {isEditing ? (
            <div className="flex flex-col">
              <input 
              type='text' 
              className='mb-5 bg-gray-100 rounded-[10px] px-4 py-2 outline-none' 
              value={titleValue}
              onChange={(e)=>{setTitleValue(e.target.value)}}
              placeholder='Input title...' 
              required/>
              <CategoriesComponent items={data.categories} setCategories={setCategories}/>
              <TextEditor onChange={setContentValue} contentValue={tryParseJSON(data.content)} error={!!error}/>
              <FileUploader onPreviewChange={setImage} currentPreview={data.media_url}/>
            </div>
            ) :
            (
              <div className="flex flex-col">
                <div className="flex flex-wrap gap-2">
                  {data.categories.map((item, index) => (
                    <div key={index} style={{backgroundColor:item.color}} className="rounded-3xl px-3 py-1.5 text-white text-[12px]">{item.name}</div>
                  ))}
                </div>
                <h1 className='text-4xl my-5 border-b-1 border-gray-200 p-5'>{data.title}</h1>
                <div 
                  id="editor"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(generateSafeHTML(tryParseJSON(data.content))) }}
                  className="prose mt-5 p-5"
                />
                {data.media_url && <div className="w-full flex justify-center mb-10 max-h-100 lg:max-h-200 overflow-hidden rounded-xl">
                    <img className='w-full h-full object-cover' src={data.media_url} alt="" />
                </div>}
              </div>
            )}
            <Link to='/blogs' className='underline text-xl text-blue-600 px-2 py-1'>
              &lt; Back
            </Link>
      </div>
    </div>
  )
}
