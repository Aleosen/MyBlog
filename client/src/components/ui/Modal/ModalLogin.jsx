import { MdClose } from "react-icons/md";
import icon from '../../../assets/icon.png'
import { Link, useNavigate } from "react-router-dom";
import './ModalLogin.css'
import { useState, useEffect, useRef } from "react";
import { authUser } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";

export default function ModalLogin({onClose}) {

  const [loginValue, setLoginValue] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const modalRef = useRef(null)

  const {login} = useAuth()

  const handleOverlayClick = (e) => {
    if(modalRef.current && !modalRef.current?.contains(e.target))
      onClose(false)
  }

  useEffect(()=>{
        if(loginValue.trim() && password)
            setError('')
    }, [loginValue, password])

  useEffect(() => {
      if (localStorage.getItem('token')) {
        navigate('/');
      }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit started')
    setIsLoading(true);
    
    if (!loginValue.trim() || !password.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      console.log(`Sending login`)
      const data = await authUser(loginValue, password);
      
      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }
      
      localStorage.setItem('token', data.token);
      console.log('Login success')
      login({username:loginValue})
      if (onClose) onClose();
      navigate('/');
      
    } catch (err) {
      setError(err.message || 'Authorization error');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
    
  };

  
  return (
    <div onClick={handleOverlayClick} className='fixed top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center z-20'>
      <div className="relative modal-login w-100 h-125 bg-white rounded-2xl p-5 z-30" ref={modalRef}>
        <div className="flex justify-between mb-15">
          <h1 className="text-2xl text-blue-700 opacity-70 flex gap-2 items-center">
            <img src={icon} alt="icon" loading='lazy' className='mr-2 w-10'/>Depositary
          </h1>
          <button className='text-2xl px-2 py-1 bg-gray-300 rounded-full' onClick={()=>onClose?.(false)}><MdClose className='text-white'/></button>
        </div>
      <h2 className="text-3xl bold mb-10">Login</h2>
        {error && <p className="text-red-500 absolute top-40 left-5">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input 
        className='p-3 border border-gray-200 rounded-xl' 
        type="text"
        value={loginValue} 
        onChange={(e)=>setLoginValue(e.target.value)} 
        placeholder="Enter username or email..." />
        
        <input 
        className='p-3 border border-gray-200 rounded-xl' 
        type="password" 
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Enter password..." />

        <div className="flex justify-between">
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
      </div>
    </div>
  )
}
