import React, { useEffect, useState } from 'react'
import FileUploader from '../../components/ui/FileUploader'
import ModalLogin from '../../components/ui/Modal/ModalLogin'
import { register } from '../../services/registerService'
import { useNavigate, Link } from 'react-router-dom'
export default function Registration() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [modalLogin, setModalLogin] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        if(userName.trim() && password.trim() && email.trim())
            setError('')
    }, [userName, password, email])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email && !emailRegex.test(email)) {
            setError("Invalid email format")
            return
        }
        try {
            console.log(`username: ${userName} email: ${email} password: ${password} repeated password: ${repeatedPassword}`)
            if(!userName.trim() || !password.trim()) {
                setError("Required fields are empty")
                return
            }
            if(password!==repeatedPassword) {
                setError("Passwords do not match")
                return
            }
            const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
            if(!isStrongPassword){
                setError('Password should contain a-z, uppercase, numbers and special symbols')
                return
            }
            const response = await register(userName.trim(), email.trim(), password)
            if(response.success) navigate('/')
        } catch (err) {    
            setError(err.message)
          }
        
    }

  return (
    <div className='relative w-full lg:w-200 shadow-lg mx-auto p-10'>
      <h1 className='text-3xl mb-10'>Register</h1>
      {error && <p className='absolute top-20 left-10 text-red-600'>
        *{error}</p>}
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col mb-5">
            <label htmlFor="username" className='mb-3'><span className='text-red-600 mr-1'>*</span>Username:</label>
            <input 
            type="text" 
            id='username' 
            onChange={
                (e)=>
                    setUserName(e.target.value)
            }
            value={userName}
            className='py-2 px-4 border border-gray-200 rounded-xl'
            />
        </div>
        <div className="flex flex-col mb-5">
                <label htmlFor="email" className='mb-3'>E-mail:</label>
                <input 
                type="text" 
                id='email'
                value={email}
                onChange={
                    (e)=>
                        setEmail(e.target.value)
                }
                className='py-2 px-4 border border-gray-200 rounded-xl'
                />
        </div>
        <div className="flex flex-col mb-5">
                <label htmlFor="password" className='mb-3'><span className='text-red-600 mr-1'>*</span>Password:</label>
                <input 
                type="password" 
                id='password'
                value={password}
                onChange={
                    (e)=>
                        setPassword(e.target.value)
                }
                className='py-2 px-4 border border-gray-200 rounded-xl'
                />
        </div>
        <div className="flex flex-col mb-5">
                <label htmlFor="repeat_password" className='mb-3'><span className='text-red-600 mr-1'>*</span>Repeat password:</label>
                <input 
                type="password" 
                id='repeat_password'
                value={repeatedPassword}
                onChange={
                    (e)=>
                        setRepeatedPassword(e.target.value)
                }
                className='py-2 px-4 border border-gray-200 rounded-xl'
                />
        </div>
        <div className="flex justify-between mt-20">
        <div className="">Have an account?<Link to='/login' className='text-blue-600 ml-1'
        >Login</Link></div>
        <button type='submit' className='hover:opacity-70 hover:cursor-pointer px-4 py-2 bg-blue-600 rounded-[4px] text-white'>
                Confirm
        </button>
        </div>
    </form>
    {modalLogin && <ModalLogin onClose={setModalLogin}/>}
    </div>
  )
}
