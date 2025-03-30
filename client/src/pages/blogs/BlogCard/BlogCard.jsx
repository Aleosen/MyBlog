import React, { useState, useEffect, useRef } from 'react'
import {FaEye} from 'react-icons/fa'
import {GrLike} from 'react-icons/gr'
import { IoTimeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align';
import './BlogCard.css'


export default function BlogCard({id, username, title, date, content, likes, views, media_url}) {

    const [settingsOpen, setSettingsOpen] = useState(false)
    
    const settingsRef = useRef(null)
    const buttonRef = useRef(null)

// 1. Обновляем валидацию контента
const validateContent = (content) => {
  // Проверяем базовую структуру
  if (!content || content?.type !== 'doc' || !Array.isArray(content?.content)) {
    console.error('Invalid content format:', content)
    return { type: 'doc', content: [] }
  }
  
  // Фильтруем некорректные узлы
  const filteredContent = content.content.filter(node => {
    if (!node.type) {
      console.warn('Node without type:', node)
      return false
    }
    return true
  })
  
  return { ...content, content: filteredContent }
}

const generateSafeHTML = (content) => {
  try {
    return generateHTML(validateContent(content), [
      StarterKit,
      TextAlign.configure({ 
        types: ['paragraph', 'heading'],
      })
    ])
  } catch (error) {
    console.error('HTML generation error:', error)
    return '<p>Error loading content</p>'
  }
}
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
        <div 
          id="editor"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
          className="prose"
        />
      </div>
      <Link to={`/blogs/${id}`} className="m-5 text-blue-600 w-fit text-xl">
        Читать
      </Link>
      <div className="w-full flex justify-center p-5">
        {media_url && <div className="w-full flex justify-center mb-5 max-h-100 lg:max-h-150 overflow-hidden rounded-xl">
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
