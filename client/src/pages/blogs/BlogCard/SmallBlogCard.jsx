import React, { useEffect } from 'react'
import { getDateDif, tryParseJSON } from '../../../utils/helpers'
import { Link } from 'react-router-dom'
import { IoTimeOutline } from 'react-icons/io5'
import {IoIosArrowRoundForward} from 'react-icons/io'
import { FaRegHeart } from 'react-icons/fa'
import { GoEye } from 'react-icons/go'
import DOMPurify from 'dompurify'
import { generateSafeHTML } from '../../../utils/TextFromJSON'

export default function SmallBlogCard({item}) {

    useEffect(()=>{
        console.log(item)
    },[])

  return (
    <Link to={`/blogs/${item.post_id}`} className="w-full p-5 rounded-xl hover:bg-gray-100 flex justify-between hover:cursor-pointer">
                <div className="flex flex-col justify-between w-125">
                    <div className="flex gap-2 items-center">
                        <span className='flex gap-1 items-center opacity-70'><IoTimeOutline/>{getDateDif(item.created_at)}</span>
                        <IoIosArrowRoundForward/>
                        <div className="flex items-center gap-2 max-w-50 my-2 overflow-scroll scrollbar-hide lg:overflow-auto lg:max-w-75">
                        {item.categories.slice(0,2).map((el, i)=>(
                            <div key={i}className="px-2 py-1 rounded-3xl text-[12px] text-white whitespace-nowrap" style={{backgroundColor:el.color}}>{el.name}</div>
                        ))}
                        {item.categories?.length>2 && <div className='text-[12px] px-2 py-1 rounded-3xl bg-amber-400 text-white'>{`...${item.categories?.length-2} more`}</div>}
                        </div>
                    </div>
                    <h2 className='text-xl font-bold overflow-hidden text-ellipsis line-clamp-2 break-words'>{item.title}</h2>
                    <div 
                        id="editor"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(generateSafeHTML(tryParseJSON(item.content))) }}
                        className="prose line-clamp-2"
                    />
                    <div className="flex items-center gap-4 my-2">
                        <span className='flex items-center gap-2'><FaRegHeart className='text-xl  text-gray-400 hover:opacity-70 hover:scale-105 hover:cursor-pointer'/>{item.likes_count}</span>
                        <span className='flex items-center gap-2 '><GoEye className='text-xl text-gray-400'/>{item.views_count}</span>
                    </div>
                </div>
                {item.media_url && <div className="h-40 w-40 rounded-2xl">
                    <img className='object-cover h-full w-full rounded-2xl' src={item.media_url} alt="img" />
                </div>}
    </Link>
  )
}
