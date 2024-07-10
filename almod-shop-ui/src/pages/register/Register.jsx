import React, { useState ,useEffect} from 'react'

//importing components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

//importing css
import './register.css'

import { Link } from 'react-router-dom'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const baseURL=process.env.REACT_APP_API_BASE_URL
  const navigate=useNavigate()
  const [credantial,setCredantial]=useState({
     first_name:undefined,
     last_name:undefined,
     email:undefined,
     password:undefined
  })

  const [error,setError]=useState(null)

  const handlechange=(e)=>{
     setCredantial((prev)=>({...prev,[e.target.id]:e.target.value}))
  }
  
 
  const saveregister=async ()=>{
       try{
          await axios.post(`${baseURL}/auth/register`,credantial)
          navigate('/login',{state:"Successfully registered, Now please Login..."})
         
       }catch(err){
         setError(err.response.data.message)
       }
  }

  const handleregister=async (e)=>{
    e.preventDefault()
    //regax for validate email address
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if(Object.keys(credantial).length!==4){
        setError("Please enter all marked fields..!")
    }else if(credantial.password.length<6){
      setError("Password length must be equal to 6 or greater..!")
    }else if(!emailRegex.test(credantial.email)){
      setError("Please enter valid email address..!")
    }else{
      setError(null)
      saveregister()
    }
    

  }
  return (

    <div>
        <Navbar></Navbar>
           <div className='registerSec'>
             <form className='register'>
                <h2 className='registerTitle'>Create Account</h2>
                <div className='registerContent'>
                  <input type='text' onChange={handlechange} placeholder='first name' id='first_name'></input>
                  <input type='text' onChange={handlechange} placeholder='last name' id='last_name'></input>
                  <input type='email' onChange={handlechange} placeholder='email' id='email'></input>
                  <input type='password' onChange={handlechange} placeholder='password' id='password'></input>
                </div>
                <button className='registerBtn' onClick={handleregister}>Sign Up</button>
                <div className='alreadyregister'>
                 <span>already have you account?</span>
                 <Link to='/login'><button className='alreadyBtn'>Login</button></Link> 
                 
                </div>
                {
                  error && <span className='errorMsg'>{error}</span>
                 }
             </form>
             

           </div>
        <Footer></Footer>
    </div>
  )
}
