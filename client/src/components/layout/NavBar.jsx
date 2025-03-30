import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import { useState } from 'react';

export default function NavBar() {
    const [MenuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const buttonRef = useRef(null)
    useEffect(()=>{
        const handleClickOutside = (e) => {
            if (MenuOpen && 
                !menuRef.current?.contains(e.target) && 
                !buttonRef.current?.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return ()=>document.removeEventListener('click', handleClickOutside)
    })
  return (
    <nav className="w-full h-17 sticky top-0 flex items-center justify-between bg-white shadow-lg z-50">
            <Link to='/' className="p-5 lg:hidden">
                <h1 className="text-3xl lg:text-4xl text-black opacity-70">Bloggy</h1>
            </Link>
            <div className="hidden w-full lg:flex justify-between items-center mx-10">
            <Link to='/' className="p-2">
                <h1 className="text-3xl lg:text-4xl text-black opacity-70">Bloggy</h1>
            </Link>
            <div className="flex gap-6">
            <Link to='/' className="p-2">
                    Main
                </Link>
                <Link to='/blogs' className="p-2">
                    Blogs
                </Link>
                <Link to='/create-blog' className='border-b-1 p-2'>
                    Write blog
                </Link>
                <Link to='/about' className="p-2">
                    About
                </Link>
            </div>
            <div className="flex items-center gap-6 p-2">
                <Link to='/login'>
                    Login
                </Link>
                <Link to='/register' className="p-2">
                    Register
                </Link>
            </div>
        </div>
        <button
        ref={buttonRef}
        className='lg:hidden text-3xl p-5' 
        onClick={()=>setMenuOpen(!MenuOpen)}>
            <FiMenu/>
        </button>
        {MenuOpen && 
            <div 
            className={`absolute lg:hidden top-15 right-0 w-full bg-white shadow-lg transition-all duration-500 ease-in-out 
                ${MenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
                ${MenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            ref={menuRef}
            onClick={()=> setMenuOpen(false)}>
                <div className="flex flex-col gap-6 p-2">
                    <div className="flex flex-col gap-6 p-2">
                        <Link to='/' className="p-2">
                            Main
                        </Link>
                        <Link to='/blogs' className="p-2">
                            Blogs
                        </Link>
                        <Link to='/create-blog' className='p-2'>
                            Write blog
                        </Link>
                        <Link to='/about' className="p-2">
                            About
                        </Link>
                    </div>
                    <div className="flex flex-col border-t-1 gap-6 p-2">
                        <Link to='/login' className="p-2">
                            Login
                        </Link>
                        <Link to='/register' className="p-2">
                            Register
                        </Link>
                    </div>
                </div>
            </div>}
    </nav>
  )
}
