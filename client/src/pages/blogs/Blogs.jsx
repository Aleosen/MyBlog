import React, { useEffect } from 'react'
import { useState } from 'react'
import BlogCard from './BlogCard/BlogCard'

export default function Blogs() {
    const [data, setData] = useState([])
    const [isDeleting, setIsDeleting] = useState(null)
    const fetchData = async () => {
        try {
            const res = await fetch('/api/data')
            const result = await res.json()
            setData(result)
        } catch (err) {
            console.error('Fetch error: ', err)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    const handleDelete = async (id) =>{
      setIsDeleting(id)
      try {
        const response = await fetch(`/api/items/${id}`,
          {method:'DELETE'}
        )
        if(!response.ok) throw new Error('Deleting error')
        setData(prev=>prev.filter(item => item.post_id!==id))
      } catch (err) {
        console.log(err.message)
      } finally {
        setIsDeleting(null)
      }
    }
  return (
    <div className='w-full'>
      <div className="w-250 min-h-screen mx-auto shadow-lg p-10 mb-20">
        <ul className='w-full'>
        {data.map(item =>
            <li key={item.post_id}>
                <BlogCard 
                username={item.username}
                title={item.title}
                date={item.created_at} 
                content={item.content} 
                likes={item.likes_count}
                views={item.views_count} 
                media_url={item.media_url}
                onDelete={() => handleDelete(item.post_id)}
                isDeleting={isDeleting === item.post_id}/>
            </li>
        )}
        </ul>
      </div>
    </div>
  )
}
