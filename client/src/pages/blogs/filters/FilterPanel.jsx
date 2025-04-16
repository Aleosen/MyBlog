import React, { useState } from 'react'
import ClickableDropDown from '../../../components/common/ClickableDropDown'
import { useEffect } from 'react';
export default function FilterPanel() {
    const [isSticky, setIsSticky] = useState(false)
    const [selectedDateValue, setSelectedDateValue] = useState('All')
    const [selectedPopularityValue, setSelectedPopularityValue] = useState('None')

    useEffect(() => {
        const handleScroll = () => {
          setIsSticky(window.scrollY > 300);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
  return (
    <>
    <aside className={`lg:flex  lg:flex-col hidden absolute top-0 left-0 w-75 pl-10 pt-10 transition-all duration-300 ${isSticky ? 'fixed top-15 left-0 bg-white bg-opacity-80 backdrop-blur-sm' : ''}`}>
        <form className="">
            <h1 className='text-xl opacity-70 mb-5 flex items-center'>Filters:</h1>
            <ClickableDropDown title={<div>
                By date: {selectedDateValue}
            </div>}>
                {['All', 'Last day', 'Last week', 'Last month', 'Last year'].map((item, index) => (
                    <div className="flex items-center" key={index}>
                        <input 
                        type='radio' 
                        id={item} 
                        value={item}
                        checked={selectedDateValue === item}
                        className="mr-2 text-left opacity-70 hover:opacity-50 hover:cursor-pointer"
                        name="dateFilter" 
                        onChange={(e)=>setSelectedDateValue(e.target.value)}/>
                        <label htmlFor={item}>{item}</label>
                    </div>
                ))}
            </ClickableDropDown>
            <ClickableDropDown title={
                <div>By popularity: {selectedPopularityValue}</div>
            }>
                {['None', 'Comments', 'Likes', 'Views'].map((item, index) => (
                    <div className="flex items-center" key={index}>
                    <input 
                    type='radio' 
                    id={item} 
                    value={item} 
                    className="mr-2 text-left opacity-70 hover:opacity-50 hover:cursor-pointer"
                    name="popularityFilter" 
                    onChange={(e)=>setSelectedPopularityValue(e.target.value)}
                    checked={selectedPopularityValue===item}/>
                    <label htmlFor={item}>{item}</label>
                </div>
                ))}
            </ClickableDropDown>
            <button className='px-4 py-2 bg-blue-500 rounded text-white hover:opacity-70 hover:cursor-pointer'>Применить</button>
        </form>
    </aside>
    {isSticky && <div className="h-[50px]"></div>}
    </>
  )
}
