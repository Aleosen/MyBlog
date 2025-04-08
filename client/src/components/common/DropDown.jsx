import React from 'react'

export default function DropDown({title, children}) {
  return (
    <div className='relative group inline-block'>
      <button className='py-full'>
        {title}
      </button>
      <div className="z-10 absolute -left-5 top-full pt-5 w-32 bg-white shadow-lg 
                      origin-top transform opacity-0
                      group-hover:opacity-100
                      transition-all duration-200 ease-out 
                        rounded-b">
        {children}
      </div>
    </div>
  )
}
