
import React, { useContext,useEffect }  from 'react'
import { useState } from 'react'

import { useLocation } from 'react-router-dom'

//importing components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

//importing images

//importing react image slider
import ImageGallery from "react-image-gallery";

//importing css
import './product.css'

//importing icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import { TransContext } from '../../context/TransContext'

import axios from 'axios'


export default function Product() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
   const baseURL=process.env.REACT_APP_API_BASE_URL
   const {user} =useContext(AuthContext)
   const {dispatch}=useContext(CartContext)
   const TransObj=useContext(TransContext)
   const transDispatch=TransObj.dispatch
   const {totalPrice,totalSaving}=TransObj.priceDetails

   const [qnt,setQnt]=useState(1)

   const path=useLocation().pathname
   const id=path.split("/")[2]

   //fetching data
   const {data,loading}=useFetch(`/product/find/${id}`)
   console.log(data)
   let images=[]
   if(data.length!==0){
    images=data.images.map((item)=>{
         return (
            {
               original:item,
               thumbnail:item
            }
         )
      
     })
   }

   // const images=[
   //    {
   //       original:ProductImg,
   //       thumbnail:ProductImg
   //    }
   //    ,{
   //       original:ProductImg,
   //       thumbnail:ProductImg
   //    },
   //    {
   //       original:ProductImg,
   //       thumbnail:ProductImg
   //    },
   //    {
   //       original:ProductImg,
   //       thumbnail:ProductImg
   //    },
   //    {
   //       original:ProductImg,
   //       thumbnail:ProductImg
   //    }
      
   // ]

   const changeCartItemRequest= async(cartItems,sellingPrice,discountedMoney)=>{
      const userId=user._id
      try{
         await axios.post(`${baseURL}/user/cart/${userId}`,cartItems)
         dispatch({type:"CART_CHANGE",payload:cartItems})
         transDispatch({type:"TRANS_PRICE",payload:{totalPrice:totalPrice+(sellingPrice*qnt),totalSaving:totalSaving+(discountedMoney*qnt)}})
      }catch(err){
         console.log("error occured")
         dispatch({type:"CART_FAILURE",payload:err.response.data})
      }
  }

   const handleCart=(productId,sellingPrice,discountedMoney,productSize)=>{
      const cartObject={
        productId,
        qnt:qnt,
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
                element.qnt=element.qnt+qnt
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
          transDispatch({type:"TRANS_PRICE",payload:{totalPrice:totalPrice+(sellingPrice*qnt),totalSaving:totalSaving+(discountedMoney*qnt)}})
        }
        
    }

  const handleClick=(cammd)=>{
    switch(cammd){
       case "Inc":
         setQnt(qnt+1)
         break

       case "Dec":
         setQnt(qnt-1)
         break
     
       default:
         break
    }
  }

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

  return (
    <>
    <Navbar></Navbar>
    {
      (loading)?(<span>Loading please wait.....</span>):(
         <div className='product'>
         <div className='productContainerSec'>
           <div className='productSlider'>
            <ImageGallery
            showFullscreenButton={false} showPlayButton={false} autoPlay={true} showNav={true} items={images}
            ></ImageGallery>
             {/* <ProductSlider images={sliderImages}></ProductSlider> */}
           </div>
           <div className='productInfo'>
             <div className='productOfferSec'>
                {(data.discount!==0) && <span className='offerSecText'>{data.discount}% off</span>} 
                {(data.discount===0) && <span className='categoryText'>{data.category}</span>}
             </div>
             <span className='productSecTitle'>{data.title}</span>
             <div className='productPriceSec'>
                <span className='productSecPrice'>Rs. {sellingPrice}.00 {(isDiscountAvailable) && (<span className='orgProductPrice'> Rs.{orgPrice}</span>)} </span>
                {(isDiscountAvailable)&&( <span className='productSavePrice'>You save: {data.discount}% (Rs.{savingMoney})</span>)}
               
             </div>
            
             <div className='productSizeSec'>
                <div className='productSizeHeadSec'>
                  <span className='productSizeHeadText'>size</span>
                </div>
                <div className='productSizeInfo'>
                  <span className={(data.size==="350gm")?("productSizeText active"):("productSizeText")}>350gm</span>
                  <span className={(data.size==="850gm")?("productSizeText active"):("productSizeText")}>850gm</span>
                  <span className={(data.size==="1250gm")?("productSizeText active"):("productSizeText")}>1250gm</span>
                </div>
             </div>
             <div className='productQnt'>
                <span className='qnttext'>Qnt</span>
                <div className='qntBtnSec'>
                  <button className='minBtn' disabled={(qnt===1)?(true):(false)} onClick={()=>handleClick("Dec")}><RemoveIcon></RemoveIcon></button>
                  <span className='numQty'>{qnt}</span>
                  <button className='plusBtn' onClick={()=>handleClick("Inc")}><AddIcon></AddIcon></button>
                </div>
             </div>
             <div className='productBtnSec'>
                <button className='productCartBtn' onClick={()=>handleCart(data._id,sellingPrice,savingMoney,data.size)}> <ShoppingBagIcon></ShoppingBagIcon> Add to cart</button>
             </div>
             <div className='productDescSec'>
                <p className='productDescText'>
                  {data.desc}
                </p>
             </div>
           </div>
       </div>
      </div>
      )
    }
    
    <Footer></Footer>
   </>
  )
}
