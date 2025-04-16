import React, { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export default function ClickableDropDown({title, children}) {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='mb-5'>
        <button type='button' className='flex items-center hover:cursor-pointer' onClick={()=>setIsOpen(!isOpen)}>
            {isOpen ? <span className='mr-1'><IoMdArrowDropup/></span> : <span className='mr-1'><IoMdArrowDropdown/></span>}{title}
        </button>
        {isOpen && <div className="flex flex-col duration-300 transition-all mt-2">
            {children}
        </div>}
    </div>
  )
}
