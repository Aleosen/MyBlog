import React from 'react'
import { useState,useEffect } from 'react'
import { getPosts } from '../../../services/postService'
import DOMPurify from 'dompurify'
import { generateSafeHTML } from '../../../utils/TextFromJSON';
import { tryParseJSON } from '../../../utils/helpers';
import { FaUser, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function PopularPosts() {
const [data, setData] = useState([])

const fetchPosts = async () => {
        const response = await getPosts(1, 6, 'popularity', '');
        setData(response.posts);
    }
useEffect(()=>{
    fetchPosts()
},[])
  return (
    <div className="mt-10 p-10 mx-auto">
        <h1 className="text-3xl mb-10 font-bold">Popular</h1>
        <div className="lg:grid lg:grid-cols-2 relative gap-10">
            {data.map(item => (
                <div 
                key={item.post_id}
                className="relative p-10 bg-white shadow-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:z-20 z-10" 
                style={{ transform: `rotate(${Math.random() * 10 - 5}deg)`,
                position: `relative`}}>
                    <Link 
                    to={`/blogs/${item.post_id}`}
                    className="w-full m-0 bg-white break-words rounded-xl hover:bg-gray-100" 
                    >
                    <div className="">
                    <p className='flex items-center gap-2'><FaUser/>{item.username}</p>
                    <h3 className="text-xl font-bold mt-2 mb-5">{item.title}</h3>
                    <div 
                        id="editor"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(generateSafeHTML(tryParseJSON(item.content))) }}
                        className="prose overflow-hidden text-ellipsis line-clamp-6 lg:line-clamp-8 break-words mb-10"
                    />
                    <div className="absolute bottom-0 left-0 right-0 flex gap-2 items-center mt-5 justify-end p-10"><FaEye/>{item.views_count}</div>
                    </div>
                    </Link>
                </div>
            ))}
        </div>
</div>
  )
}
