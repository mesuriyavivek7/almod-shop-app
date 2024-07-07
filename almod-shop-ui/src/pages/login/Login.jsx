import React, {useState,useContext} from 'react'

//importing components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

import { useLocation } from 'react-router-dom'

//importing css
import './login.css'
//import navigate

import { useNavigate } from 'react-router-dom'

//import Link
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import {TransContext} from '../../context/TransContext'


export default function Login() {
  const baseURL=process.env.REACT_APP_API_BASE_URL
  const location=useLocation()

  const {loading,error,dispatch}=useContext(AuthContext)


  const [Error,setError]=useState(null)
  //fetching cart object and destructuring it
  const cartObj=useContext(CartContext)
  const cart=cartObj.cart
  const cartErr=cartObj.error
  const cartDispatch=cartObj.dispatch
  const cartLoading=cartObj.loading

  //fetching trans object and destructuring it
  const TransObj=useContext(TransContext)
  const transDispatch=TransObj.dispatch
  const priceDetails=TransObj.priceDetails
  let {totalPrice,totalSaving}=priceDetails


  const [credantial,setCredantial]=useState({
    email:undefined,
    password:undefined
  })

  const navigate=useNavigate()

  const handlechange=(e)=>{
    setCredantial((prev)=>({...prev,[e.target.id]:e.target.value}))
  }
  

  //pattern for email validation
  //const pattern= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

  // const setCookie=async ()=>{
  //      try{
  //          axios.post(`${baseURL}/auth/set-cookie`,{},{withCredentials:true})
  //      }catch(e){
  //          console.log(e)
  //      }
  // }

  // const getCookie=async ()=>{
  //   try{
  //      axios.post(`${baseURL}/auth/get-cookie`,{withCredentials:true})
  //   }catch(e){
  //     console.log(e)
  //   }
  // }

  const handleLogin=async (e)=>{
       e.preventDefault()
       const localcartItems=cart  
     
       dispatch({type:"LOGIN_START"})
       cartDispatch({type:"CART_START"})

       try{
         const res=await axios.post(`${baseURL}/auth/login`,credantial,{withCredentials:true})
         const dbcartitems=res.data.details.cartItems

         dispatch({type:"LOGIN_SUCCESS",payload:res.data.details})
         
         let cartitemslist=[]
         //newitemlist is array of that cart items which are not presant in localstorage
         let newitemlist=[]
         if(localcartItems!==null && localcartItems.length!==0 && dbcartitems.length!==0){
            cartitemslist=cartitemslist.concat(localcartItems)

            dbcartitems.forEach(dbitem => {
                let isavailable=false
                cartitemslist.forEach(citem=>{
                   if(citem.productId===dbitem.productId){
                    isavailable=true
                   }
                })
                if(isavailable===false){
                  cartitemslist.push(dbitem)
                  newitemlist.push({productId:dbitem.productId,qnt:dbitem.qnt})
                }
            });
         }else if((localcartItems===null || localcartItems.length===0) && dbcartitems.length!==0){
             cartitemslist=cartitemslist.concat(dbcartitems)
             dbcartitems.map((dbitem)=>{
                newitemlist.push({productId:dbitem.productId,qnt:dbitem.qnt})
             })
         }else if((localcartItems!==null && localcartItems.length!==0) && dbcartitems.length===0){
            cartitemslist=cartitemslist.concat(localcartItems)
         }

         

         if(cartitemslist.lenght!==0){
          try{
            await axios.post(`${baseURL}/user/cart/${res.data.details._id}`,cartitemslist)
            cartDispatch({type:"CART_CHANGE",payload:cartitemslist})

            if(newitemlist.length!==0){
        
               let cObj={
                 cartitems:newitemlist
               }
               try{
               let priceObj=await axios.post(`${baseURL}/product/price`,cObj)
            
               totalPrice+=priceObj.data.totalPrice
               totalSaving+=priceObj.data.totalSaving

               transDispatch({type:"TRANS_PRICE",payload:{totalPrice,totalSaving}})
               }catch(err){
                setError(err.message)
               }

            }

          }catch(err){
            cartDispatch({type:"CART_FAILURE",payload:err.response.data})
          }
         }



         navigate('/')
       }catch(err){
         dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
       }

  }
  return (
    <div>
      <Navbar></Navbar>
         <div className='loginSec'>
          
            <div className='login'>
             <span className='successmsg'>{location.state}</span>
             <h2 className='loginTitle'>Login</h2>
             <div className='inputContent'>
                 <input type='email' onChange={handlechange} id='email' placeholder='email address' required></input>
                 <input type='password' onChange={handlechange} id='password' placeholder='password' required></input>
             </div>
             <button type='submit' disabled={loading || cartLoading} onClick={handleLogin} className='loginBtn'>Sign In</button>
             <div className='newUser'>
                 <span>New Customer?</span>
                 <Link to='/register'><button href='##' className='alreadyBtn'>Regiter</button></Link> 
             </div>
             {
               error && <span className='errorMsg'>{error.message}</span> 
             }
             {
              cartErr && <span className='errorMsg'>{cartErr.message}</span>
             }
             {
              Error && <span className='errorMsg'>{Error}</span>
             }
            </div> 
         </div>
      <Footer></Footer>
    </div>
  )
}