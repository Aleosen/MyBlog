import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import { useState } from 'react';
import icon from '../../assets/icon.png'
import './NavBar.css'
import SearchComponent from '../ui/SearchComponent';
import ModalLogin from '../ui/Modal/ModalLogin'
import { useAuth } from '../../context/AuthContext';
import { FaUser } from 'react-icons/fa';
import DropDown from '../common/DropDown';
import { IoMdHome } from "react-icons/io";
import { FaBlogger } from "react-icons/fa6";
import { FaPenAlt } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import ProfileImage from '../ui/ProfileImage'

export default function NavBar() {
    const [MenuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const buttonRef = useRef(null)
    const [modalLogin, setModalLogin] = useState(false)
    const location = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)
    const {user, logout} = useAuth()

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
    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
          const context = this;
          const args = arguments;
          if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
          } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
              if ((Date.now() - lastRan) >= limit) {
                func.apply(context, args);
                lastRan = Date.now();
              }
            }, limit - (Date.now() - lastRan));
          }
        };
      }
      const handleModalClick = () => {
        if(location.pathname!=='/login')
            setModalLogin(true)
      }
    useEffect(()=>{
        const handleScroll =()=> {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop
            if(scrollPosition>500) setIsScrolled(true)
                else setIsScrolled(false)
        }
        const throttledScroll = throttle(handleScroll, 100);
    
        window.addEventListener('scroll', throttledScroll);
        return () => window.removeEventListener('scroll', throttledScroll);
    },[])
  return (
    <nav className="navbar w-full h-17 sticky top-0 flex items-center justify-between bg-white shadow-lg z-50">
        {modalLogin && <ModalLogin onClose={setModalLogin}/>}
            <Link to='/' className="p-5 lg:hidden flex items-center">
                <img src={icon} alt="icon" loading='lazy' className='mr-2 w-10'/>
                <h1 className="text-3xl lg:text-4xl text-blue-700 opacity-70">Depositary</h1>
            </Link>
            <div className="hidden w-full lg:flex justify-between items-center mx-10">
            <Link to='/' className="p-2 flex items-center ml-10">
                <img src={icon} alt="icon" loading='lazy' className='mr-2 w-10'/>
                <h1 className="text-3xl lg:text-4xl text-blue-700 opacity-70">Depositary</h1>
            </Link>
            <div className="flex gap-6">
                <Link to='/' className="p-2 flex items-center gap-1">
                    <IoMdHome/> Main
                </Link>
                <Link to='/blogs' className="p-2 flex items-center gap-1">
                    <FaBlogger/> Articles
                </Link>
                <Link to='/create-blog' className='border-b-1 p-2 flex items-center gap-1'>
                    <FaPenAlt/> Write
                </Link>
                <Link to='/about' className="p-2 flex items-center gap-1">
                    <IoIosInformationCircle/> About
                </Link>
            </div>
            <div className="flex items-center gap-6 p-2 mr-10">
            {location.pathname !== '/blogs' || isScrolled ? <SearchComponent classes={'hidden lg:flex '}/> : <div className=""></div>}
            {user ? (
                <div className='flex items-center'>
                    <DropDown title={
                        <div className="flex items-center gap-2">
                            <ProfileImage image={user.media_url} height={30} width={30}/>
                            <span>{user.username}</span>
                        </div>
                    }>
                        <Link to={`/profile/${user.id}`} className='px-6 py-3 m-2 flex items-center gap-1 hover:cursor-pointer hover:bg-gray-100 text-left'><FaUser/>Profile</Link>
                        <button className='px-6 py-3 m-2 flex items-center gap-1 hover:cursor-pointer hover:bg-gray-100 text-left'><IoSettings/>Settings</button>
                        <button className='px-6 py-3 m-2 flex items-center gap-1 hover:cursor-pointer hover:bg-gray-100 text-red-500 text-left' onClick={logout}><IoLogOut/>Logout</button>
                    </DropDown>
                </div>
            ):(
                <div className="flex gap-6">
                    <button className="flex items-center gap-1 hover:cursor-pointer hover:opacity-70" onClick={handleModalClick}>
                        <IoLogIn className='text-xl'/>Login
                    </button>
                    <Link to='/register' className="flex items-center gap-1 p-2">
                        <FaUserPlus/>Register
                    </Link>
                </div>
            )}
            </div>
        </div>
        
        {location.pathname !== '/blogs' || isScrolled ? <SearchComponent classes={'lg:hidden'}/>:<div></div>}
        <button
        ref={buttonRef}
        className='lg:hidden text-3xl p-5 z-10' 
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
                <div className="flex flex-col p-2">
                    <div className="flex flex-col gap-2 p-2">
                    <Link to='/' className="py-4 flex items-center gap-1">
                    <IoMdHome/> Main
                </Link>
                <Link to='/blogs' className="py-4 flex items-center gap-1">
                    <FaBlogger/> Articles
                </Link>
                <Link to='/create-blog' className='py-4 flex items-center gap-1'>
                    <FaPenAlt/> Write
                </Link>
                <Link to='/about' className="py-4 flex items-center gap-1">
                    <IoIosInformationCircle/> About
                </Link>
                    </div>
                        {user ? (
                            <div className='flex flex-col border-t-1 gap-6 p-2'>
                                <span className='flex items-center gap-2'><FaUser/>{user.username}</span>
                                <button  className='text-left flex items-center gap-1' onClick={logout}><IoLogOut/>Logout</button>
                            </div>
                        ):(
                            <div className="flex flex-col border-t-1 gap-6 p-2">
                                <button className='text-left' onClick={()=>setModalLogin(true)}>
                                    Login
                                </button>
                                <Link to='/register' className="">
                                    Register
                                </Link>
                            </div>
                        )}
                </div>
            </div>}
    </nav>
  )
}
