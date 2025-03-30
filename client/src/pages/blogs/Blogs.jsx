import React, { useEffect } from 'react'
import { useState } from 'react'
import BlogCard from './BlogCard/BlogCard'
import { getPosts } from '../../services/postService'
export default function Blogs() {
    const [data, setData] = useState([])

    useEffect(()=>{
        const fetchPosts = async () => {
          const result = await getPosts()
          setData(result)
        }
        fetchPosts()
    },[])
    
  return (
    <div className='w-full'>
      <div className="w-full lg:w-250 mx-auto shadow-lg p-10 mb-20">
        <ul className='w-full'>
        {data.map(item =>
            <li key={item.post_id}>
                <BlogCard 
                id={item.post_id}
                username={item.username}
                title={item.title}
                date={item.created_at} 
                content={item.content} 
                likes={item.likes_count}
                views={item.views_count} 
                media_url={item.media_url}
                />
            </li>
        )}
        </ul>
      </div>
    </div>
  )
}
