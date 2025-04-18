import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'


export default function Mission() {

  const {user} = useAuth()

  return (
    <section className='w-full bg-gray-900 text-white pb-20'>
        <div className="lg:w-200 p-10 mx-auto flex justify-center items-center">
            <div className="flex flex-col gap-5 ">
                <h1 className="text-3xl text-blue-500 ">Our mission</h1>
                <h1 className='text-2xl'>I believe that everyone has something to share with the world.</h1>
                <span>Our platform is designed for those who want to:</span>
                <ul className='list-disc ml-10 flex flex-col gap-5'>
                  <li><span className='font-semibold'>Write</span> — about their experiences, ideas, hobbies, or discoveries.</li>
                  <li><span className='font-semibold'>Read</span> — be inspired by the stories of others, find unexpected perspectives on familiar things.</li>
                  <li><span className='font-semibold'>Unite</span> — in a community that values ​​freedom of expression and respect for different opinions.</li>
                </ul>
                <span>We have no boundaries for topics: you can publish articles about travel, technology, cooking, psychology, creativity 
                  — or anything that excites you.</span>
                <span className="">The main thing is your <span className='font-bold'>voice.</span></span>
                <h1 className='text-4xl text-blue-500 my-7'>Why us?</h1>
                <ul className='flex flex-col gap-5'>
                  <li>🚀 There are no “uninteresting” topics here — only people who are ready to listen and be heard.</li>
                  <li>🌟 You decide what your content will be: serious analytical research or light sketches from life.</li>
                  <li>🔑 Registration will take a minute, and publishing an article — another five. No complicated rules, just your thoughts and the “Publish” button.</li>
                </ul>
                {!user && <div className="">
                  <Link to='/register' className="font-bold hover:opacity-70">Join us!</Link>
                  <p className="mt-5">Become part of a community where every text is an opportunity to learn something new, 
                    start a dialogue, or simply find those who think the same way as you.</p>
                </div>}
            </div>
        </div>
    </section>
  )
}
