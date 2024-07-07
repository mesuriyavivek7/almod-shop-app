import React from 'react'


import useFetch from '../../hooks/useFetch'

import { Link } from 'react-router-dom'

export default function OrderItem({productId}) {

   
  const {data,loading}=useFetch(`/product/find/${productId}`)
  
   let isDiscountAvailable=false
   let orgPrice=data.price;
   let sellingPrice;
   let savingMoney=0;
   if(data.discount!==0){
      isDiscountAvailable=true
      savingMoney=Math.floor((data.discount*orgPrice)/100)
      sellingPrice=orgPrice-savingMoney
    }else{
      sellingPrice=orgPrice
    }

    let productTitle=data.title
    if(data.length!==0){
    
    if(productTitle.length>32){
       productTitle=productTitle.slice(0,32)
       productTitle+="..."
    }
    }
       


  return (
   (loading===true)?(<span>Loading please wait...</span>):(
    (data.length!==0)  && (
    <Link to={`${productId}`} style={{textDecoration:'none'}}>
     <div className='orderitem'>
       <div className='orderimage'>
         <img src={data.images[0]} alt=''></img>
        </div>
       <div className='ordercontent'>
         <span className='ordertitle'>{productTitle}</span>
         <span className='orderprice'>Rs. {sellingPrice}.00 {isDiscountAvailable && <span className='orgPrice'>Rs. {orgPrice}.00</span>} </span>
         <span className='orderqnt'>qnt: {data.size}</span>
       </div>
     </div>
   </Link>
    )
   )
   
  )
}
