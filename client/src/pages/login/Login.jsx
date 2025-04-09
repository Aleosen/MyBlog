import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authUser } from '../../services/authService'

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [loginValue, setLoginValue] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
  
    const {login} = useAuth()
  
    useEffect(()=>{
          if(loginValue.trim() && password)
              setError('')
      }, [loginValue, password])
  
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submit started')
        setIsLoading(true);
        if (!loginValue.trim() || !password) {
          setError('Please fill in all fields');
          setIsLoading(false);
          return;
        }
        try {
          console.log(`Sending login`)
          const result = await login({loginValue, password})
          
          if(result.success){
            navigate('/');
          }
        } catch (err) {
          setError(err.message || 'Authorization error');
          console.error('Login error:', err);
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <div className='w-full lg:w-200 mx-auto lg:flex block shadow-lg p-25'>
      <form onSubmit={handleSubmit} className="lg:w-150 w-full lg:border-r-1 lg:border-gray-200 lg:pr-10 pb-10 relative">
      <h1 className="text-3xl opacity-70">Login</h1>
      {error && <p className='absolute top-10 left-0 text-red-500'>{error}</p>}
        <div className="pt-10">
            <input 
            type="text" 
            value={loginValue}
            onChange={(e)=>setLoginValue(e.target.value)}
            placeholder='Username or email...' 
            className='px-4 py-2 border border-gray-200 w-full rounded-xl'/>
        </div>
        <div className="mt-5">
                <input 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Password...' 
                className='px-4 py-2 border border-gray-200 w-full rounded-xl'/>
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember</label>
          </div>
          <Link to='/login/password-recover' className='text-blue-600'>
            Forget password?
          </Link>
        </div>
        <button 
          type="submit"
          className='w-full px-4 py-2 bg-blue-600 text-white rounded-[4px]' 
          disabled={isLoading}>
            {isLoading?<div>Loading...</div>:<div>Submit</div>}
          </button>
      </form>
      <div className="w-full lg:pl-10 pt-10 text-2xl">
        <span className='mr-2'>Don't have an account?</span>
        <Link to='/register' className='font-bold hover:text-blue-500 transition-all duration-300'>Register</Link>
      </div>
    </div>
  )
}
