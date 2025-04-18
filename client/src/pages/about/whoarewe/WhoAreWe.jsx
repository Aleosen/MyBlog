import React from 'react'
import photo from '../../../assets/photo.jfif'
import { FaGithub } from "react-icons/fa";

export default function WhoAreWe() {
  return (
    <section className='w-full py-10'>
      <div className="lg:w-250 p-10 mx-auto">
      <h1 className="text-3xl text-blue-500">Who i am?</h1>
      </div>
      <div className="flex items-center justify-center gap-10 h-full my-5">
            <div className="flex flex-col gap-5 w-100">
                <h2 className="text-3xl">Alexander, 25 years old.</h2>
                <p className='text-xl opacity-70'>Hello. I'm Alexander, a begining full-stack developer. I love turning mockups into live sites, as well as connecting the unconnectable.</p>
                <p className="text-xl opacity-70">I created this site because I wanted a platform where I could freely experiment with content.</p>
                <p className="text-xl">E-mail: <span className='text-gray-600'>dongohago@gmail.com</span></p>
                <a href='https://github.com/Aleosen' target='_blank' className='hover:opacity-70 w-fit mx-auto'><FaGithub className='text-5xl'/></a>
            </div>
            <img src={photo} alt="photo" className='w-100 h-100 rounded-full shadow-lg' />
      </div>
      <form  className="w-100 mt-20 p-10 mx-auto flex flex-col gap-5">
      <h1 className="text-4xl text-blue-500">Contact</h1>
          <input 
          required
          className='bg-gray-200 px-4 py-2 outline-none w-full rounded-[10px]' 
          type="text" 
          name="" 
          id="name"
          placeholder='Name...' />
          <input 
          required
          className='bg-gray-200 px-4 py-2 outline-none w-full rounded-[10px]' 
          type="text" 
          name="" 
          id="email"
          placeholder='E-mail...' />
          <textarea
          required
          className='bg-gray-200 min-h-30 px-4 py-2 outline-none w-full rounded-[10px]'
          placeholder='Message...'
          />
          <button className='transition-all duration-300 px-1 py-2 rounded-[4px] text-white bg-[#007bff] hover:cursor-pointer hover:opacity-70'>Send</button>
      </form>
    </section>
  )
}
