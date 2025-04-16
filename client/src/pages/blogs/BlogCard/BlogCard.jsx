import React, { useState, useEffect, useRef } from 'react'
import { FcLike } from "react-icons/fc";
import { GoEye } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify'
import { generateSafeHTML } from '../../../utils/TextFromJSON';
import './BlogCard.css'
import { getDateDif } from '../../../utils/helpers';

export default function BlogCard({id, username, title, date, content, likes, views, media_url, categories}) {

    const [settingsOpen, setSettingsOpen] = useState(false)
    
    const settingsRef = useRef(null)
    const buttonRef = useRef(null)

  const html = generateSafeHTML(content)
  const cleanHtml = DOMPurify.sanitize(html)
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


  return (
    <div className="blog-card relative py-1 border-b-1 border-gray-100">
    <Link to={`/blogs/${id}`} className='hover:bg-gray-100/80 hover:cursor-pointer hover:rounded-xl w-full flex flex-col px-5 '>
    
      <div className="flex justify-between items-center py-3 relative">
            <div className="">
              <h1 className="mr-2 flex items-center"><span className='mr-2'><FaUser/></span>{username}</h1>
            </div>
            <div className='flex items-center'>
              <span className='mr-2'><IoTimeOutline/></span>
              {getDateDif(date)}
            </div>
      </div>
      <div className="flex flex-wrap gap-2">
              {categories.map((item, index)=>(
                <div key={index} style={{ backgroundColor: item.color }} className={`px-3 py-1.5 text-[12px] rounded-3xl w-fit`}>
                  <span className='text-white'>{item.name}</span>
                </div>
              ))}
      </div>
      <div className="py-5">
      <h1 className='text-2xl truncate mb-5 font-bold'>{title}</h1>
        <div 
          id="editor"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
          className="prose overflow-hidden text-ellipsis line-clamp-4 break-words"
        />
      </div>
      <span className="hover:opacity-70 my-5 text-blue-600 w-fit text-xl">
        Read
      </span>
        {media_url && <div className="w-full flex justify-center mb-5 max-h-100 lg:max-h-150 overflow-hidden rounded-xl">
          <img className='w-full h-full object-cover' loading='lazy' src={media_url} alt="" />
        </div>}
      <div className="flex p-5 justify-between">
        <span className='flex items-center gap-2'>{<FcLike className='text-xl'/>} {likes} </span>
        <span className='flex items-center gap-2'><GoEye className='text-xl'/> {views} </span>
      </div>
    </Link>
  </div>
  )
}
