import React from 'react'
import Header from './header/Header'
import LastPostsSlider from './last-posts/LastPostsSlider'
import PopularPosts from './popular-posts/PopularPosts'
import Opportunities from './opportunities/Opportunities'
import BottomSection from './bottom-section/BottomSection'

export default function Main() {
  return (
    <main className='w-full min-h-screen'>
      <Header/>
      <div className="w-[calc(100%-20px)] lg:w-200 mx-auto">
        <LastPostsSlider/>
        <PopularPosts/>
        <Opportunities/>
        <BottomSection/>
      </div>
    </main>
  )
}
