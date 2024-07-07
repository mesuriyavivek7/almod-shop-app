import React from 'react'
import { useState,useEffect,useContext } from 'react'

import { AuthContext } from '../../context/AuthContext'

import OtpInput from 'react-otp-input';

import axios from 'axios'

export default function OtpWindow({mobileNo,setMainContactWindow,setOtpWindow,setAddressWindow}) {
  const baseURL=process.env.REACT_APP_API_BASE_URL
  const [Error,setError]=useState(null)

  const {user,dispatch}=useContext(AuthContext)
  const [second,setSecond]=useState(59)

  const changeWindow=()=>{
    setMainContactWindow(false)
    setOtpWindow(false)
    setAddressWindow(true)
  }

  const resendOtp=async ()=>{
     setError(null)
     setSecond(59)
     try{
        await axios.post(`${baseURL}/user/sendotp`,{phoneNumber:"+91"+mobileNo,userId:user._id},{withCredentials:true})
        
     }catch(err){
        setError(err.message)
     }
  }

  //here set timer for otp entering
  

  useEffect(()=>{
    const interval=setInterval(()=>{
        if(second>0){
            setSecond(second-1)
        }

        if(second===0){
            clearInterval(interval)
        }
    },1000)


   return ()=>clearInterval(interval)
   
  })
  
  //if verification successfully completed then save mobile no
  const saveMobileNo=async ()=>{
    try{
        const res=await axios.put(`${baseURL}/user/${user._id}`,{mobileno:"+91"+mobileNo,verified:true},{withCredentials:true})
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        changeWindow()
    }catch(err){
        setError("there is something wrong...!")
        dispatch({type:"LOGIN_FAILURE",payload:"error-savemobileno"})
    }
  }

    
   const [otp,setOtp]=useState("")

   const verifyOtp=async ()=>{
    try{
      await axios.post(`${baseURL}/user/verifyotp`,{phoneNumber:"+91"+mobileNo,otp:otp},{withCredentials:true})
      console.log("Mobile no verified successfully")
      saveMobileNo()
    }catch(err){
      let errorCode=err.response?.status
      if(errorCode===401){
        setError("Entered otp is incorrect..!")
      }else if(errorCode===402){
        setError("Otp is Expired..!")
      }else{
        setError("There is something wrong...!")
      }
    }
  }

  useEffect(()=>{
    if(otp.length===4){
      verifyOtp()
    }
  },[otp])

  
  
  return (
    <div className='infoWindow'>
        <div className='infoMainBody'>
          <h1 className='mainText'>OTP Verification</h1>
          <span className='otpInstruction'>we have sent verification code to your mobile number</span>
          <div className='inputBox otpVerify'>

            <OtpInput
               value={otp}
               onChange={setOtp}
               numInputs={4}
               renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
              containerStyle={{
                width:'100%',
                height:'100%',
                display:'flex',
                gap:'.1rem',
                alignItems:'center',
                justifyContent:'center',
              }}
              inputStyle={
                {
                  fontSize:'1.5rem',
                  height:'100%',
                  width:'3rem',
                  outline:'none'
                }
              }

            />
         </div>
         

         <button onClick={()=>verifyOtp()} className={(otp.length===4)?("continueBtn active"):("continueBtn")}>Verify</button>
         <div className='resendOtpSec'>
            <span className='resendMsg'>{(second<10)?(`Resend otp in: 0${second}`):(`Resend otp in: ${second}`)}</span>
            <button className='resendOtpBtn' disabled={(second===0)?(false):(true)} onClick={()=>resendOtp()}>Resend Otp</button>
         </div>
      
         
         <span className='errMsg'>{Error}</span>
        </div>
    </div>
  )
}
