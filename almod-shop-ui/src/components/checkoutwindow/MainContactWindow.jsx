import React from 'react'
import { useState,useContext,useEffect } from 'react'

import { AuthContext } from '../../context/AuthContext'

import axios from 'axios'

export default function MainContactWindow({mobileNo,setMobileNo,setContactWindow,setOtpWindow}) {
  
  const [Error,setError]=useState(null)
  const {user}=useContext(AuthContext)
  const baseURL=process.env.REACT_APP_API_BASE_URL
  
  const validateMobileNo=async ()=>{
    try{
       const res=await axios.post(`${baseURL}/user/mobile`,{mobileno:"+91"+mobileNo},{withCredentials:true})
       if(res.data===false){
        sendOtp()
        
       }else{
        setError("Entered mobile no is alredy in using...!")
       }
    }catch(err){
       setError("mobile no is alredy in using...!")
    }
  }

  const sendOtp=async ()=>{
    try{
       await axios.post(`${baseURL}/user/sendotp`,{phoneNumber:"+91"+mobileNo,userId:user._id},{withCredentials:true})
       setContactWindow(false)
       setOtpWindow(true)
    }catch(err){
       setError("There is something wrong...!")
    }
 }

  useEffect(()=>{
    if(mobileNo.length===10){
       validateMobileNo()
    }
 },[mobileNo])

 

  return (
    <div className='infoWindow'>
         <div className='infoMainBody'>
          <h1 className='mainText'>Enter Mobile Number</h1>
          <div className='inputBox'>
            <span>+91</span>
            <input className='inputMobileNo' type='number' onChange={(e)=>setMobileNo(e.target.value)} placeholder='Enter Number'></input>
          </div>
         </div>
         <button disabled={(mobileNo.length!==10)?(true):(false)} className={(mobileNo.length===10)?("continueBtn active"):("continueBtn")}>
          VERIFY ME
         </button>

         <span className='errMsg'>{Error}</span>
    </div>
  )
}
