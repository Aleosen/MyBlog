import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProfile } from '../../services/profileService'
import { getDateDif } from '../../utils/helpers'
import { getUserPosts } from '../../services/profileService'
import SmallBlogCard from '../blogs/BlogCard/SmallBlogCard'
import ProfileImage from '../../components/ui/ProfileImage'

export default function Profile() {
    const {id} = useParams()
    const [userData, setUserData] = useState(null)
    const [userPosts, setUserPosts] = useState([])
    const [selectedView, setSelectedView] = useState('Articles')
    const viewComponents = {
        Articles: <div className="flex flex-col">
            {userPosts.map((item, index)=>(
                <div key={item.post_id} className={`${index===0 ? 'border-t-1' : ''} border-b-1 border-gray-200 py-2`}>
                    <SmallBlogCard item={item} />
                </div>
            ))}
        </div>,
        Comments: <div>Comments content</div>
    }
    const views = ['Articles', 'Comments']

    const fetchProfile = async () =>{

        try {
            const response = await getProfile(id)
            setUserData(response)
        } catch (error) {
            console.log(error)
        }
        
    }
    const fetchPosts = async()=>{
        const response = await getUserPosts(id)
        setUserPosts(response)
    }
    useEffect(()=>{
        fetchProfile()
        console.log(userData)
        fetchPosts()
    },[id])

if(userData)  
    return (
    <div className='w-full'>
      <div className="lg:w-200 w-full p-10 shadow-lg mx-auto">
        <div className="flex mb-20">
            <ProfileImage image={userData.media_url} height={180} width={150}/>
            <div className="flex flex-col  mx-10 w-full">
                <div className="flex justify-between items-center w-full">
                    <h2 className='text-3xl'>{userData.username}</h2>
                    <span className="opacity-70">Registered: {getDateDif(userData.created_at)}</span>
                </div>
                <p className="mt-5">{userData.description}</p>
            </div>
        </div>
        <div className="flex flex-col gap-5">
            <div className="flex gap-3">
            {views.map((item, index)=>(
                <div key={index} className="flex flex-col">
                    <button onClick={()=>setSelectedView(item)} className={`${item===selectedView && 'bg-gray-200'} 
                    transition-all duration-300 ease-in hover:cursor-pointer px-6 py-3 hover:opacity-70 rounded-3xl`}>{item}</button>
                </div>
            ))}
            </div>
            {viewComponents[selectedView] || viewComponents['Articles']}
        </div>
      </div>
    </div>
    ); 
    else 
    return (
    <div className='text-center text-4xl font-bold m-50'>User not found</div>
  )
}
