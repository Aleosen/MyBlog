import React, { useState} from 'react';
import { FaSearch } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
export default function SearchComponent({classes, onSearch}) {
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate()
    const handleEnterPress = async (e)=>{
        if(e.key==='Enter'){
            const encodedQuery = encodeURIComponent(inputValue.trim())
                navigate(`/blogs?search=${encodedQuery}`);
                if (typeof onSearch === 'function')
                    onSearch(inputValue.trim())
        }
    }
    return (
        <div className='relative'>
            <div className={classes + " flex items-center rounded-xl bg-gray-200 px-4"}>
                <FaSearch className='opacity-50'/>
                <input 
                    type="text" 
                    placeholder='Search...'
                    value={inputValue}
                    onKeyUp={handleEnterPress}
                    onChange={(e) => {
                        const filtered = e.target.value.replace(/[\\|$]/g, '')
                        setInputValue(filtered)
                    }}
                    className='bg-gray-200 px-4 py-2 outline-none w-full'
                />
            </div>
        </div>
    )
}