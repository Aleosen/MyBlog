import React, { useState } from 'react'
import ClickableDropDown from '../../../components/common/ClickableDropDown'
import { useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import CategoriesComponent from '../../../components/ui/CategoriesComponent'
import { FaSort } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

export default function FilterPanel({setFilters, onFetch}) {
    const [isSticky, setIsSticky] = useState(false)
    const [selectedDateValue, setSelectedDateValue] = useState('All')
    const [selectedSortValue, setSelectedSortValue] = useState('Default')
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const handleScroll = () => {
          setIsSticky(window.scrollY > 300);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    useEffect(()=>{
        console.log(categories)
    },[categories])
    const handleSubmit = (e) => {
        e.preventDefault()
        setFilters({date:selectedDateValue, sort:selectedSortValue, categories:categories})
    }

  return (
    <>
    <aside className={`lg:flex lg:flex-col hidden absolute top-0 left-0 w-100 h-full p-10 rounded-br-2xl bg-white transition-all duration-300 ${isSticky ? 'shadow-lg fixed top-15 left-0 bg-white bg-opacity-80 backdrop-blur-sm' : ''}`}>
        <form onSubmit={handleSubmit} className="">
            <h1 className='text-xl opacity-70 mb-5 flex items-center gap-2'><FaFilter/> Filters:</h1>
            <ClickableDropDown title={<div className='flex items-center gap-2'>
                <span className='flex items-center gap-2 font-bold'><FaCalendarAlt/>Date:</span> {selectedDateValue}
            </div>}>
                {['All', 'Last day', 'Last week', 'Last month', 'Last year'].map((item, index) => (
                    <div className="flex items-center" key={index}>
                        <input 
                        type='radio' 
                        id={item} 
                        value={item}
                        checked={selectedDateValue === item}
                        className="mr-2 text-left opacity-70 hover:opacity-50 hover:cursor-pointer accent-blue-600"
                        name="dateFilter" 
                        onChange={(e)=>setSelectedDateValue(e.target.value)}/>
                        <label htmlFor={item}>{item}</label>
                    </div>
                ))}
            </ClickableDropDown>
            
            <ClickableDropDown title={
                <div className='flex items-center flex-wrap gap-2 font-bold'>
                    <MdCategory/>Categories: 
                    {categories.map((item, index)=>(
                        <div key={index} className="px-2 py-1 rounded-3xl bg-gray-200 text-[12px] w-fit">
                            {item.name}
                        </div>
            ))}
                </div>
            }>
                <CategoriesComponent setCategories={setCategories} items={categories} selectedItemsVisible={false} />
            </ClickableDropDown>

            <ClickableDropDown title={
                <div className='flex items-center gap-2 '><span className='flex items-center gap-2 font-bold'><FaSort/>Sort:</span> {selectedSortValue}</div>
            }>
                {['Default', 'Newest', 'Hot', 'Discussed'].map((item, index) => (
                    <div className="flex items-center" key={index}>
                    <input 
                    type='radio' 
                    id={item} 
                    value={item} 
                    className="mr-2  accent-blue-600 text-left opacity-70 hover:opacity-50 hover:cursor-pointer"
                    name="popularityFilter" 
                    onChange={(e)=>setSelectedSortValue(e.target.value)}
                    checked={selectedSortValue===item}/>
                    <label htmlFor={item}>{item}</label>
                </div>
                ))}
            </ClickableDropDown>
            <button type='submit' className='px-4 py-2 bg-blue-500 rounded text-white hover:opacity-70 hover:cursor-pointer'>Применить</button>
        </form>
    </aside>
    {isSticky && <div className="h-[50px]"></div>}
    </>
  )
}
