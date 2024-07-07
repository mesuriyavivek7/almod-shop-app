import React from 'react'

import ProductImg from '../../assets/almodpng.png'
import useFetch from '../../hooks/useFetch'

//importing css
import './smallproduct.css'

export default function SmallProducts({productId,productSize,productQnt}) {
  
  const {data,loading}=useFetch(`/product/find/${productId}`)
  
  let discountedMoney=0;
  let orgPrice=data.price;
  let discountPrice=null;
  if(data.discount!==0){
   discountedMoney=Math.floor((data.discount*orgPrice)/100)
   discountPrice=orgPrice-discountedMoney
  }

  const getSellingPrice=()=>{
    let sellingPrice;
    if(discountPrice===null){
      sellingPrice=orgPrice
    }else{
      sellingPrice=discountPrice
    }

    switch(productSize){
           case "350":
             return Math.ceil((sellingPrice*35)/100)
           case "500":
             return Math.ceil(sellingPrice/2)
           case "1000":
             return sellingPrice
           default:
             return sellingPrice
    }
   }
    
  return (
    
    
      (loading===true)?(<span>Loading please wait...</span>):(
        <div className='smallProduct'>
             <img src={ProductImg} alt=''></img>
             <div className='smallProductInfo'>
                <span>{data.title}</span>
                <span>Price: Rs. {getSellingPrice()}.00</span>
                <span>Quantity:{productQnt}  Size:{productSize}gm</span>
             </div>
        </div>
      )

    
  )
}
