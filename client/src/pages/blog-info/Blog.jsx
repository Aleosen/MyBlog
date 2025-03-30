import React, { useEffect, useState, useRef } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { IoTimeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { getPost, updatePost } from '../../services/postService';
import { deletePost } from '../../services/postService';

export default function Blog() {
    const [data, setData] = useState(null)
    const {id} = useParams()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [titleValue, setTitleValue] = useState('')
    const [contentValue, setContentValue] = useState('')

    const settingsRef = useRef(null)
    const buttonRef = useRef(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchPost = async () => {
        const result = await getPost(id)
        setData(result)
        }
        fetchPost()
        const handleClickOutside = (e) => {
            if (settingsOpen && 
                !settingsRef.current?.contains(e.target) && 
                !buttonRef.current?.contains(e.target)) {
                setSettingsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    },[id, settingsOpen])


    const getDateDif = (old_date) =>{
        const postDate = new Date(old_date)
        const now = new Date();
        const milliDiff = now - postDate;
        const hoursDif = milliDiff/(1000*60*60)
        if(Math.floor(hoursDif)===0) return 'few minutes ago'
        else if(Math.floor(hoursDif)>=24) return `${postDate.toLocaleDateString()}`
        else return (Math.floor(hoursDif) + ' hours ago')
    }

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
      setIsEditing(!isEditing)
      setTitleValue(data.title)
      setContentValue(data.content)
    }

    if (!data) return <div className="text-3xl mt-20 text-center">Blog not found</div>
  return (
    <div className='w-full'>
      <div className="w-full lg:w-250 mx-auto shadow-lg p-10 mb-20">
            <div className="flex justify-between relative">
                <div className="flex gap-2">
                  <h3 className='gap-1 flex items-center opacity-70'><FaUser/>{data.username}</h3>
                  {isEditing &&
                  <div className="flex gap-2">
                    <button 
                    onClick={async()=>{
                      try {
                        setIsEditing(false);
                        const result = await updatePost(
                            data.post_id, 
                            titleValue, 
                            contentValue, 
                            data.media_url
                        );
                        console.log('Update result:', result);
                        setData(prev => ({
                          ...prev,
                          ...result, // Распространяем все обновленные поля
                          title: result.title || titleValue, // Дублирующаяся защита
                          content: result.content || contentValue
                      }));
                        
                    } catch (error) {
                        console.error('Ошибка обновления:', error);
                        setIsEditing(true)
                    }
                    }} 
                    className='text-green-600 hover:cursor-pointer hover:opacity-70'>Save</button>
                    <button 
                    onClick={()=>setIsEditing(false)} 
                    className='text-red-600 hover:cursor-pointer hover:opacity-70'>Cancel edit</button>
                  </div>
                  }
                </div>
                <div className="flex">
                <h3 className='gap-1 flex items-center opacity-70'><IoTimeOutline/>{getDateDif(data.created_at)}</h3>
                <button className='text-2xl ml-2 hover:cursor-pointer'
                ref={buttonRef}
              onClick={()=>setSettingsOpen(!settingsOpen)}>
                    <FiMoreVertical/>
                </button>
                {settingsOpen && 
                <div 
                    ref={settingsRef} 
                    className={`flex flex-col absolute top-10 right-0 opacity-90 bg-white h-20 shadow-lg transition-all duration-500 ease-in-out 
                    ${settingsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
                    ${settingsOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                                  <button 
                                  onClick={()=>{
                                    handleEdit()
                                  }}
                                  className='p-4 bg-white hover:cursor-pointer'>
                                    Редактировать</button>

                                  <button 
                                  onClick={()=>{
                                    handleDelete(data.post_id)
                                  }}
                                  className='p-4 bg-white hover:cursor-pointer text-red-600'>
                                    Удалить</button>
                              </div>}
                </div>
            </div>
            {isEditing ? (
            <div className="flex flex-col">
              <input 
              type='text' 
              className='text-4xl my-5 border-b-1 border-gray-400 py-5 w-1/2' 
              value={titleValue}
              onChange={(e)=>{setTitleValue(e.target.value)}}
              placeholder='Input title...'/>
              <textarea
              value={contentValue} 
              className='mt-10 mb-20 h-50 p-5 rounded-xl'
              onChange={(e)=>{setContentValue(e.target.value)}}
              placeholder='Input content...'/>
            </div>
            ) :
            (
              <div className="flex flex-col">
                <h1 className='text-4xl my-5 border-b-1 border-gray-400 py-5 w-1/2'>{data.title}</h1>
                <p className='mt-10 mb-20 p-5 h-50'>{data.content}</p>
              </div>
            )}
            {data.media_url && <div className="w-full flex justify-center mb-10 max-h-100 lg:max-h-200 overflow-hidden rounded-xl">
                <img className='w-full h-full object-cover' src={data.media_url} alt="" />
            </div>}
            <Link to='/blogs' className='underline text-xl text-blue-600'>
                Back to blogs
            </Link>
      </div>
    </div>
  )
}
