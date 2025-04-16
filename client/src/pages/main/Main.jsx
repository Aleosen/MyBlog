import React from 'react'
import Header from './header/Header'
import PopularPostsSlider from './popular-blogs/PopularPostsSlider'
import LastPosts from './last-blogs/LastPosts'
import Opportunities from './opportunities/Opportunities'
import BottomSection from './bottom-section/BottomSection'

export default function Main() {
  return (
    <main className='w-full min-h-screen bg-white'>
      <Header/>
      <div className="w-[calc(100%-20px)] lg:w-200 mx-auto">
        <PopularPostsSlider/>
        <LastPosts/>
        <Opportunities/>
        <BottomSection/>
      </div>
    </main>
  )
}
