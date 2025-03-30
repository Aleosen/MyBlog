import React, { useState, useEffect, useRef } from 'react'
import {FaEye} from 'react-icons/fa'
import {GrLike} from 'react-icons/gr'
import { IoTimeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function BlogCard({id, username, title, date, content, likes, views, media_url, onDelete, isDeleting}) {

    const [settingsOpen, setSettingsOpen] = useState(false)

    const settingsRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (settingsOpen && 
                !settingsRef.current?.contains(e.target) && 
                !buttonRef.current?.contains(e.target)) {
                setSettingsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [settingsOpen])

    const getDateDif = (old_date) =>{
        const postDate = new Date(old_date)
        const now = new Date();
        const milliDiff = now - postDate;
        const hoursDif = milliDiff/(1000*60*60)
        if(Math.floor(hoursDif)===0) return 'few minutes ago'
        else if(Math.floor(hoursDif)>=24) return `${postDate.toLocaleDateString()}`
        else return (Math.floor(hoursDif) + ' hours ago')
    }


  return (
    <div className='w-full flex flex-col border-t-1 border-b-1 mb-[-1px] px-5 border-gray-300'>
      <div className="flex justify-between items-center py-3 border-b-1 border-gray-100 relative">
            <h1 className="mr-2 flex items-center"><span className='mr-2'><FaUser/></span>{username}</h1>
            <div className='flex items-center'>
              <span className='mr-2'><IoTimeOutline/></span>
              {getDateDif(date)}
            </div>
      </div>
      <div className="max-h-100 overflow-hidden text-ellipsis line-clamp-4 p-5">
        <h1 className='text-2xl mb-5'>{title}</h1>
        <span className=''>{content}</span>
      </div>
      <Link to={`/blogs/${id}`} className="m-5 text-blue-600 w-fit">
        Читать
      </Link>
      <div className="w-full flex justify-center p-5">
        {media_url && <div className="w-full flex justify-center mb-5 max-h-100 lg:max-h-100 overflow-hidden rounded-xl">
          <img className='w-full h-full object-cover' src={media_url} alt="" />
        </div>}
      </div>
      <div className="flex p-5 border-t-1 border-gray-100 justify-between">
        <span className='flex items-center gap-2'>{<GrLike/>} {likes} </span>
        <span className='flex items-center gap-2'><FaEye/> {views} </span>
      </div>
    </div>
  )
}
