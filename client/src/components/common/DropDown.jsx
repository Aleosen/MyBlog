import React from 'react'

export default function DropDown({ title, children }) {
  return (
    <div className="relative inline-block group">
      <button className="px-4 py-2 hover:bg-gray-100 transition-colors flex items-center">
        {title}
      </button>
      <div className="z-20 absolute flex flex-col right-0 top-full pt-3 w-48 bg-white shadow-xl
                      rounded-b
                      opacity-0 invisible 
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-200 ease-out delay-100
                      transform -translate-y-1 group-hover:translate-y-0">
        {children}
      </div>
    </div>
  )
}