import React, { useContext, useState } from 'react'

//importing css
import './cartitem.css'

import axios from 'axios';



//importing mui icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useFetch from '../../hooks/useFetch';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { TransContext } from '../../context/TransContext';

export default function CartItem({productId,productSize,productQnt}) {
   const baseURL=process.env.REACT_APP_API_BASE_URL
   const {user}=useContext(AuthContext)
   const cartObj=useContext(CartContext)
   //expand cartObj
   const cartLoading=cartObj.loading
   const cartDispatch=cartObj.dispatch
   
   //fetching transcontext for change total price and total saving
   const {priceDetails,dispatch}=useContext(TransContext)
   let {totalPrice,totalSaving}=priceDetails

   //fetching data by this product id
   const {data,loading,error}=useFetch(`/product/find/${productId}`)


   //discount available
   let savingMoney=0;
   let orgPrice=data.price;
   let sellingPrice;
   if(data.discount!==0){
    savingMoney=Math.floor((data.discount*orgPrice)/100)
    sellingPrice=orgPrice-savingMoney
   }else{
    sellingPrice=orgPrice
   }
   
  

 

   //update cart items on dbms
  const updateCartItem=async (cartItems)=>{
       const userId=user._id
       try{
          await axios.post(`${baseURL}/user/cart/${userId}`,cartItems)
          cartDispatch({type:"CART_CHANGE",payload:cartItems})
          dispatch({type:"TRANS_PRICE",payload:{totalPrice,totalSaving}})
       }catch(err){
          cartDispatch({type:"CART_FAILURE",payload:err.response.data})
       }
  }

   //fetch data from localstorage
   const ChangeCartQnt=(cammd)=>{
         cartDispatch({type:"CART_START"})
         let cartItems=JSON.parse(localStorage.getItem("cart"))
         
          cartItems.forEach(item => {
              if(item.productId===productId){
                 if(cammd==="Inc"){ 
                   item.qnt=item.qnt+1
                   totalPrice+=sellingPrice
                   totalSaving+=savingMoney
                 }else{
                  item.qnt=item.qnt-1
                  totalPrice-=sellingPrice
                  totalSaving-=savingMoney
                 }
                  
              }
           })
         
        
        if(user!==null){
           updateCartItem(cartItems)
        }else{
          cartDispatch({type:"CART_CHANGE",payload:cartItems})
          dispatch({type:"TRANS_PRICE",payload:{totalPrice,totalSaving}})
        }

   }

   const removeCartItem=()=>{
       let cartItems=JSON.parse(localStorage.getItem("cart"))
       let newCartItems=[]
       totalPrice-=(sellingPrice*productQnt)
       totalSaving-=(savingMoney*productQnt)
       cartItems.forEach(item =>{
         if(item.productId!==productId){
           newCartItems.push(item)
         }
       })

       if(user!==null){
         updateCartItem(newCartItems)
       }else{
         cartDispatch({type:"CART_CHANGE",payload:newCartItems})
         dispatch({type:"TRANS_PRICE",payload:{totalPrice,totalSaving}})
       }
   }
   



   const [qnt,setQnt]=useState(productQnt)

   const handleClick=(cammd)=>{
       switch(cammd){
          case "Inc":
            ChangeCartQnt(cammd)
            setQnt(qnt+1)
            break

          case "Dec":
            ChangeCartQnt(cammd)
            setQnt(qnt-1)
            break
        
          default:
            break
       }
   }

  return (

    

      (loading===true)?(
        <span className='loadingmsg'>Loading please wait....</span>
      ):(

        (data.length!==0) && (
        <div className='cartItemList'>
       <div className='cartProductInfo'>
         <img className='cartProductImg' src={data.images[0]} alt='productimage'></img>
         <div className='cartProductDesc'>
            <h2 className='cartProductTitle'>{data.title}</h2>
            <div className='cartSmallDesc'>
               <span>Variety : {data.category}</span>
               <span>Size : {productSize}</span>
            </div>
            <span className='cartItemPrice'>Rs. {sellingPrice}.00/{(<small>{productSize}</small>)} {(data.discount!==0) && (<small className='cartItemOrgPrice'>Rs. {orgPrice}/kg</small>)}</span>
            <div className='cartDescLower'>
              <div className='cartQntSec'>
                  <button className='cartQntBtn'  disabled={(cartLoading || qnt===1)?(true):(false)} onClick={()=>handleClick("Dec")}><RemoveIcon fontSize='small'></RemoveIcon></button>
                  <span className='cartQntNum'>{qnt}</span>
                  <button className='cartQntBtn' disabled={(cartLoading===true)?(true):(false)}  onClick={()=>handleClick("Inc")}><AddIcon fontSize='small'></AddIcon></button>
              </div>
              <button onClick={removeCartItem} className='cartRemoveBtn'>Remove</button>
            </div>
         </div>
      </div>

      <div className='cartTotalPrice'>
        <span className='cartTotalPriceHead'>Total Price:</span>
        <div className='cartTotalPriceDetails'>
         <span className='priceCalculus'>Rs. {sellingPrice}/<small>{productSize}</small> X {productQnt} </span>
         <span className='TotalPriceText'> Rs. {sellingPrice*productQnt}</span>
        </div>
      </div>

    </div>
        )
      )

    
    
  )
}
