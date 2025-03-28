import React from 'react'
import { Link } from 'react-router-dom'
export default function NavBar() {
  return (
    <nav className="w-full h-20 sticky top-0 flex bg-white shadow-lg z-50">
        <div className="w-full flex justify-between items-center mx-10">
            <Link to='/' className="p-2">
                <h1 className="text-4xl text-black opacity-70">Bloggy</h1>
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
    </nav>
  )
}
