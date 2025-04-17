import React from 'react'
import { useState,useEffect } from 'react'
import { getPosts } from '../../../services/postService'
import { getDateDif } from '../../../utils/helpers';
import { FaRegHeart } from 'react-icons/fa';
import { GoEye } from "react-icons/go";
import { Link } from 'react-router-dom';
import { IoTimeOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";

export default function PopularPosts() {
const [data, setData] = useState([])

const fetchPosts = async () => {
        const response = await getPosts(0, 6, 'time', '');
        setData(response.posts);
    }
useEffect(()=>{
    fetchPosts()
},[])
  return (
    <div className="mt-10 p-10 mx-auto">
        <h1 className="text-3xl mb-10 font-bold flex items-center gap-2"><IoIosTimer/> Last additions</h1>
        <div className="flex flex-col gap-5">
            {data.map((item, index)=>(
                <Link to={`/blogs/${item.post_id}`} key={index} className="w-full h-50 p-5 shadow-lg rounded-xl hover:scale-101 bg-gray-50 flex justify-between hover:cursor-pointer">
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
                    <div className="flex items-center gap-4">
                        <span className='flex items-center gap-2'><FaRegHeart className='text-xl  text-gray-400 hover:opacity-70 hover:scale-105 hover:cursor-pointer'/>{item.likes_count}</span>
                        <span className='flex items-center gap-2 '><GoEye className='text-xl text-gray-400'/>{item.views_count}</span>
                    </div>
                </div>
                {item.media_url && <div className="h-40 w-40 rounded-2xl">
                    <img className='object-cover h-full w-full rounded-2xl' src={item.media_url} alt="img" />
                </div>}
                </Link>
            ))}
        </div>
</div>
  )
}
