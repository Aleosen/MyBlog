import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ModalLogin from '../../../components/ui/Modal/ModalLogin'
import { useAuth } from '../../../context/AuthContext'

export default function BottomSection() {
      const [loginOpen, setLoginOpen] = useState(false)
      const {user} = useAuth()
  return (
    <section className=' mx-auto p-5 select-none  mb-20'>
        { !user &&
        <div className="">
            {loginOpen && <ModalLogin onClose={setLoginOpen}/>}
            <h1 className='text-3xl font-bold mt-20 mb-5'>
                Welcome!
            </h1>
            <h2 className='text-2xl font-bold mb-10'>
                Join our community! Create an account and write your blogs
            </h2>
            <Link to='/register' className="text-2xl text-gray-600 hover:text-blue-600 ml-3">
                Create an account
            </Link>
            <span className='text-2xl font-bold mb-10 ml-3'>
                Already have an account? 
                <button 
                    onClick={()=>setLoginOpen(true)} 
                    className="text-gray-600 hover:text-blue-600 ml-3">Login</button>
            </span>
        </div>
    }
    </section>
  )
}
