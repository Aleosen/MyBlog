import React from 'react'
import photo from '../../assets/profileDefault.png'

export default function ProfileImage({image, height, width}) {
  return (
    <div className="aspect-square" style={{height:height, width:width}}>
      {image ? 
        <img src={image} alt="?" className='object-cover w-full h-full rounded-3xl'/> : 
        <img className='object-cover w-full h-full rounded-3xl' src={photo} alt='Default photo'/>}
    </div>
  )
}
