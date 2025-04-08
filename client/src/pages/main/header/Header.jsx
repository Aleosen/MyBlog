import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import ModalLogin from '../../../components/ui/Modal/ModalLogin'
import { useAuth } from '../../../context/AuthContext'

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false)
  const {user} = useAuth()
  return (
    <div className='w-full bg-gray-900 h-120 flex flex-col items-center justify-center'>
      {loginOpen && <ModalLogin onClose={setLoginOpen}/>}
      <h1 className='text-5xl text-blue-500 font-bold'>Depositary</h1>
      <h2 className='text-3xl text-white font-bold p-5'>The storage of various blogs</h2>
        {user ? (
          <div className="mt-5">
            <Link to='/create-blog' className='transition-all duration-300 px-4 py-2 rounded-[4px] text-white bg-[#007bff] hover:cursor-pointer m-10 hover:opacity-70'>
            Write your blog
            </Link>
          </div>
        ):(
      <div className="">
        <button 
        onClick={()=>setLoginOpen(true)} 
        className='transition-all duration-300 px-4 py-2 rounded-[4px] text-white bg-[#007bff] hover:cursor-pointer my-5 mx-10 hover:opacity-70'>Login</button>
        <Link 
        className='transition-all duration-300 px-4 py-2 rounded-[4px] text-white bg-[#007bff] hover:cursor-pointer my-5 mx-10 hover:opacity-70' 
        to='/register'>Create account</Link>
        </div>
        )
        }
    </div>
  )
}
