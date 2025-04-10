import React, { useEffect } from 'react'
import {useAuth} from '../context/AuthContext'
import {useNavigate, useLocation} from 'react-router-dom'

export default function ProtectedRoute({children}) {
    const {user} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if(!user){
            navigate('/login', {
                state:{from:location.pathname},
                replace:true
            })
        }
    },[user,navigate,location])

  return user ? children : null
}
