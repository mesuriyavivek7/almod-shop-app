import React, { useContext} from 'react'


//import css
import './product.css'

//importing animation
import {useAutoAnimate} from '@formkit/auto-animate/react'

//importing usefetch
import useFetch from '../../hooks/useFetch'

import { useNavigate } from 'react-router-dom'

//importing motion for animation
import { motion} from 'framer-motion'

import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { CartContext } from '../../context/CartContext'
import {TransContext} from '../../context/TransContext'
import { Link } from 'react-router-dom'

export default function Products() {
  //for animation
  const navigate=useNavigate()
  const transition={
    duration: 1,
    delay: 0.1,
    ease: [0, 0.71, 0.2, 1.01]
  }

  const baseURL=process.env.REACT_APP_API_BASE_URL



  const {data,loading}=useFetch('/product/top')
  
  const [parent]=useAutoAnimate()

  const {user}=useContext(AuthContext)

  const {dispatch}=useContext(CartContext)
  const TransObj=useContext(TransContext)
  const transDispatch=TransObj.dispatch
  const {totalPrice,totalSaving}=TransObj.priceDetails

  
  
  const changeCartItemRequest= async(cartItems,sellingPrice,discountedMoney)=>{
      const userId=user._id
      try{
         await axios.post(`${baseURL}/user/cart/${userId}`,cartItems)
         dispatch({type:"CART_CHANGE",payload:cartItems})
         transDispatch({type:"TRANS_PRICE",payload:{totalPrice:totalPrice+sellingPrice,totalSaving:totalSaving+discountedMoney}})
         navigate('/cart')
      }catch(err){
         console.log("error occured")
         dispatch({type:"CART_FAILURE",payload:err.response.data})
      }
  }
  
  const handleCart=(productId,sellingPrice,discountedMoney,productSize)=>{
    const cartObject={
      productId,
      qnt:1,
      size:productSize
    }
    let cartItems=JSON.parse(localStorage.getItem("cart")) || null

       if(cartItems===null){
          cartItems=[]
          cartItems.push(cartObject)
       }else{
          let isProductAvailable=false
          cartItems.forEach(element => {
            if(element.productId===productId){
              element.qnt=element.qnt+1
              isProductAvailable=true
            }
          });

          if(isProductAvailable===false){
            cartItems.push(cartObject)
          }
       }
      
      if(user!==null){
        changeCartItemRequest(cartItems,sellingPrice,discountedMoney)
      }else{
        dispatch({type:"CART_CHANGE",payload:cartItems})
        transDispatch({type:"TRANS_PRICE",payload:{totalPrice:totalPrice+sellingPrice,totalSaving:totalSaving+discountedMoney}})
        navigate('/cart')
      }
      
  }
   

 
  return (
    <div className='products'>
         <div className='productTitle'>
            <span className='topheading'>Top Products</span>
            <hr className='topline'></hr>
        </div>
        <div className='productContainer' ref={parent}>
            
            {
              (loading===true)?(
                 <span>Loading please wait....</span>
              ):(

                 data.map((product,i)=>{
                   //calculation if discount available
                   let isDiscountAvailable=false
                   let orgPrice=product.price;
                   let sellingPrice;
                   let savingMoney=0;
                   if(product.discount!==0){
                     isDiscountAvailable=true
                     savingMoney=Math.floor((product.discount*orgPrice)/100)
                     sellingPrice=orgPrice-savingMoney
                   }else{
                     sellingPrice=orgPrice
                   }
                   
    
                  //calculation for split title
                   let productTitle=product.title
                   if(productTitle.length>32){
                      productTitle=productTitle.slice(0,32)
                      productTitle+="..."
                   }
                   

                 return (
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={transition}
                    key={i} className='productItem'>

                    {
                     isDiscountAvailable && <span className='discountSec'>{product.discount}% off</span>
                    } 
                    
                    <Link  to={`product/${product._id}`} style={{textDecoration:'none'}}>
                    <div className='productimage'>
                      <img src={product.images[0]} alt='' className='productImg'></img>
                    </div>    
                    </Link>
                    <div className='productContent'>
                        <span className='productText'>{productTitle}</span>
                        <span className='productPrice'>Rs. {sellingPrice}.00/<small>{product.size}</small> {isDiscountAvailable && <span className='orgPrice'>Rs. {orgPrice}.00/{product.size}</span>}</span>
                        <div className='productSize'><i>Pack of </i>{product.size}</div>
                        <button className='productBtn' onClick={()=>handleCart(product._id,sellingPrice,savingMoney,product.size)}>Add to cart</button>
                    </div>
                  </motion.div>
                  )
                  
                })
              )
            }

        </div>
        <Link to='/store'><button className='productEndBtn'>Explore Store</button></Link>
    </div>
  )
}
