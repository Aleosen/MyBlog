import React, { useEffect, useState, useRef} from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import {getCategories} from '../../services/categoriesService'
import { IoMdCloseCircleOutline } from "react-icons/io";
export default function SearchComponent({classes, items, setCategories, resetVisible, selectedItemsVisible}) {
    const [inputValue, setInputValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState([])
    const searchPanel = useRef(null)
    const [selectedItems, setSelectedItems] = useState(items || [])

    const handleFetch = async () => {
        try {
            const result = await getCategories(inputValue.trim())
            const idsFromSelectedItems = new Set(selectedItems.map(item=>item.id))
            const els = result.filter(item => !idsFromSelectedItems.has(item.id))
            setData(els)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
        handleFetch()
    },[inputValue])
    useEffect(()=>{
        if(typeof setCategories === 'function')
            setCategories(selectedItems)
    },[selectedItems])
    useEffect(()=>{
        const handleClickOutside = (e) => {
            if(isOpen && !searchPanel.current?.contains(e.target))
                setIsOpen(false)
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    })
    const handleChoose = (item) => {
        setSelectedItems(prev => [...prev, item])
        setIsOpen(false)
        setInputValue('')
        setData(prev => (prev.filter(element => element.id!==item.id)))
    }

    const handleDelete = (item) => {
        setSelectedItems(prev => (prev.filter(element => element.id!==item.id)))
        setIsOpen(false)
        setData(prev => [...prev, item])
    }
    const handleReset = () => {
        setData([])
        setSelectedItems([])
        handleFetch()
    }
    return (
        <div className='relative mb-5 '>
            {selectedItems?.length > 0 && resetVisible!==false ? (
            <div className="flex justify-end items-center ">
                <button 
                    type='button'
                    onClick={handleReset}
                    className='underline text-blue-500 hover:cursor-pointer hover:opacity-70 mb-2'>
                    Reset
                </button>
            </div>
            ) : null}
            
            <div className="flex flex-wrap gap-2 mb-5">
                {selectedItemsVisible!==false && selectedItems?.map((item,index)=>(
                    <div key={index} className="px-4 py-2 rounded-4xl bg-gray-100 w-fit flex justify-between items-center ">
                        <span className='ml-2'>{item.name}</span>
                        <button 
                            type='button'
                            onClick={()=>handleDelete(item)}
                            className='px-1 py-2 hover:cursor-pointer hover:opacity-70' >
                                <IoMdCloseCircleOutline className='text-red-400 text-xl'/>
                        </button>
                    </div>
                ))}
            </div>
            <div className={classes + " flex items-center rounded-xl bg-gray-100 px-4 relative"} ref={searchPanel}>
                <input 
                    type="text" 
                    placeholder='Select category...'
                    value={inputValue}
                    onChange={(e) => {
                        const filtered = e.target.value.replace(/[\\|$]/g, '')
                        setInputValue(filtered)
                    }}
                    onClick={()=>{setIsOpen(true)}}
                    className='bg-gray-100 px-4 py-2 outline-none w-full'
                />
                {
                    isOpen ? <IoMdArrowDropup className='text-xl'/> : <IoMdArrowDropdown className='text-xl'/>
                }
                {
                    isOpen && <div className='absolute top-full left-0 right-0 bg-white shadow-lg max-h-50 overflow-scroll z-20'>
                        {data?.length>0 ? <div className="">
                        {data.map((item, index) => (
                            <div key={index} className="px-6 py-3 m-2 hover:bg-gray-100 hover:cursor-pointer flex flex-col" onClick={()=>{
                                handleChoose(item)
                            }}>
                                <span className='text-xl'>{item.name}</span>
                                <span className='text-[12px] overflow-hidden opacity-60'>{item.description}</span>
                            </div>
                        ))}
                        </div> : <div className='px-6 py-3 m-2'>No results found...</div>}
                    </div>
                }
            </div>
        </div>
    )
}