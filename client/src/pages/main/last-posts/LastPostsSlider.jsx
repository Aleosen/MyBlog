import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { getPosts } from '../../../services/postService';
import { Link } from 'react-router-dom';
import {FaEye} from 'react-icons/fa'
import {GrLike} from 'react-icons/gr'
import { IoTimeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import DOMPurify from 'dompurify'
import { generateSafeHTML } from '../../../utils/TextFromJSON';
import { tryParseJSON } from '../../../utils/helpers';


export default function LastPostsSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef(null)
    const [autoPlay, setAutoPlay] = useState(true)
    const [data, setData] = useState([])

    const startAutoPlay = () => {
        timerRef.current = setInterval(nextSlide, 5000)
    }

    const stopAutoPlay = () => {
        clearInterval(timerRef.current)
    }
    const handleSlideClick = () => {
        setAutoPlay(false);
        stopAutoPlay();
        

        setTimeout(() => {
          setAutoPlay(true);
        }, 20000);
      };
    const handlers = useSwipeable({
        onSwipedLeft: () => nextSlide(),
        onSwipedRight: () => prevSlide(),
        trackMouse: true
    });

    const nextSlide = () => {
        setCurrentIndex(prev => 
        prev === 5 - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex(prev => 
        prev === 0 ? 5 - 1 : prev - 1
        );
    };
    const fetchPosts = async () => {
        const response = await getPosts(1, 5, 'time', '');
        setData(response.posts);
    }
    useEffect(()=>{
        fetchPosts()
    },[])
    useEffect(() => {
        if(autoPlay) {
            startAutoPlay()
        }
        return ()=> stopAutoPlay()
      }, [autoPlay, currentIndex]);


    const handleManualNavigation = () => {
        setAutoPlay(false);
        stopAutoPlay();
      };
      const getDateDif = (old_date) =>{
        const postDate = new Date(old_date)
        const now = new Date();
        const milliDiff = now - postDate;
        const hoursDif = milliDiff/(1000*60*60)
        if(Math.floor(hoursDif)===0) return 'few minutes ago'
        else if(Math.floor(hoursDif)>=24) return `${postDate.toLocaleDateString()}`
        else return (Math.floor(hoursDif) + ' hours ago')
    }
  return (
    <section className='mx-auto p-5 select-none'>
        <h1 className='text-3xl font-bold mt-20 mb-10'>
            Last pages
        </h1>
        <div className="relative overflow-hidden w-full">
      <div 
        {...handlers}
        className="flex transition-transform duration-300"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${5 * 100}%`
        }}
      >
        {data.map((item, index) => (
          <div 
            key={index}
            className="w-full flex-shrink-0"
            style={{ width: `${100}%` }}
          >
            {/* Контент слайда */}
            <div className="relative mx-2 p-10 bg-white rounded-lg shadow-md h-120 lg:h-150"
                style={{ width: `${100/5-1}%`}}
                onClick={handleSlideClick}
                onMouseEnter={()=>setAutoPlay(false)}
                onMouseLeave={()=>setAutoPlay(true)}>
              <div className="flex justify-between text-gray-600 items-center">
              <span className="flex items-center gap-2"><FaUser/>{item.username}</span>
                <span className="flex items-center gap-2"><IoTimeOutline/>{getDateDif(item.created_at)}</span>
              </div>
              <h3 className="text-xl font-bold mt-2 mb-5">{item.title}</h3>
              <div 
                id="editor"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(generateSafeHTML(tryParseJSON(item.content))) }}
                className="prose overflow-hidden text-ellipsis line-clamp-6 lg:line-clamp-10 break-words"
              />
              <div className="absolute bottom-0 right-0 left-0 p-10">
                <div className="flex mt-2 flex-col">
                    <div className="flex justify-end">
                      <Link 
                      to={`/blogs/${item.post_id}`} 
                      className='transition-all duration-300 max-w-fit px-4 py-2 rounded-[4px] text-white bg-[#007bff] hover:cursor-pointer my-5 hover:opacity-70'>
                          Read
                      </Link>
                    </div>
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2"><GrLike/>{item.likes_count}</span>
                        <span className='flex items-center gap-2'><FaEye/>{item.views_count}</span>
                    </div>
                </div>
                </div>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={()=> {prevSlide(); handleManualNavigation()}}
        className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 py-2 px-4 rounded-full shadow-lg hover:bg-white hover:py-3 hover:px-5">
        &lsaquo;
      </button>
      <button 
        onClick={()=> {nextSlide(); handleManualNavigation()}}
        className="cursor-pointer absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 bg-white/80 py-2 px-4 rounded-full shadow-lg hover:bg-white  hover:py-3 hover:px-5">
        &rsaquo;
      </button>
      <div className="flex justify-center space-x-2 mt-4">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => {setCurrentIndex(index); handleManualNavigation()}}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
    </section>
  )
}