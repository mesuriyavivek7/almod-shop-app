import React, { useEffect, useState } from 'react'
import { useContext} from 'react'

//import motion framer
import {motion} from 'framer-motion'

import axios from 'axios'

//importing css 
import './store.css'




//importing require components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

//importing mui icons
import SearchIcon from '@mui/icons-material/Search';

//importing uselocation for fetching product keyword 
import { useLocation } from 'react-router-dom'

import { Link } from 'react-router-dom'

//importing components
import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import { TransContext } from '../../context/TransContext'


export default function Store() {
  const location=useLocation()

  const baseURL=process.env.REACT_APP_API_BASE_URL

  const transition={
    duration: 0.5,
    delay: 0.2,
    ease: [0, 0.71, 0.2, 1.01]
  }

  const attributes={
    placeholder:'what are you looking for?',
  }
  if(location.state!==null){
     attributes.defaultValue=location.state
  }
  //for refetch data
  const [min,setMin]=useState(undefined)
  const [max,setMax]=useState(undefined)
  const [qnt,setQnt]=useState('none')
  const [keyword,setKeyword]=useState(location.state!==null?location.state:'none')


  const {data,loading,refetch}=useFetch(`/product?min=${min || 0}&max=${max || 10000}&keyword=${keyword}&size=${qnt}`)

  const {user}=useContext(AuthContext)

  const {dispatch}=useContext(CartContext)
  const TransObj=useContext(TransContext)
  const transDispatch=TransObj.dispatch
  const {totalPrice,totalSaving}=TransObj.priceDetails

  useEffect(()=>{
    refetch()
  },[keyword,min,max])

  const changeCartItemRequest= async(cartItems,sellingPrice,discountedMoney)=>{
    const userId=user._id
    try{
       await axios.post(`${baseURL}/user/cart/${userId}`,cartItems)
       dispatch({type:"CART_CHANGE",payload:cartItems})
       transDispatch({type:"TRANS_PRICE",payload:{totalPrice:totalPrice+sellingPrice,totalSaving:totalSaving+discountedMoney}})
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
    }
    
}


  
  return (
    <>
    <Navbar></Navbar>
    <div className='store'>
        <div className='storeTitle'>
            <span className='storeheading'>Our Store</span>
            <hr className='sline'></hr>
        </div>


        {/* this below code is for filter */}
        {/* <div className='filterSec'>
           <h2 className='filterHead'>Filter</h2>
           <div className='filterItem'>
             <span className='filterItemHead'>Price</span>
             <div className='filterBody'>
                <div className='filterInputBox'>
                  <span className='inputText'>min:</span>
                  <input min={0} className='filterInput' placeholder='0' type='number'></input>
                </div>
                <div className='filterInputBox'>
                  <span className='inputText'>max:</span>
                  <input min={0} className='filterInput' placeholder='999' type='number'></input>
                </div>
             </div>
           </div>
           <div className='filterItem'>
            <span className='filterItemHead'>Qnt</span>
            <div className='filterBody'>
               <div className='filterInputBox'>
                 <span className='inputText'>Price/gram:</span>
                 <select className='filterInput'>
                   <option>200gm</option>
                   <option>350gm</option>
                   <option>500gm</option>
                   <option>1kg</option>
                 </select>
               </div>
            </div>
           </div>
           <div className='filterItem'>
            <span className='filterItemHead'>Variety</span>
            <div className='filterVarietyBody'>
              <div className='filterInputBox'>
                <input className='filterCheckBox' type='checkbox'></input>
                <span className='filterText'>Natural</span>
              </div>
              <div className='filterInputBox'>
                <input className='filterCheckBox' type='checkbox'></input>
                <span className='filterText'>Creamy</span>
              </div>
              <div className='filterInputBox'>
                <input className='filterCheckBox' type='checkbox'></input>
                <span className='filterText'>Crunchy</span>
              </div>
              <div className='filterInputBox'>
                <input className='filterCheckBox' type='checkbox'></input>
                <span className='filterText'>Hazelnut</span>
              </div>
            </div>
           </div>
           <button className='resetBtn'>Reset</button>
        </div> */}
        


        <div className='productSec'>
             <div className='productTopSec'>
                <div className='storeSearch'>
                 <SearchIcon></SearchIcon>
                 <input type='text' {...attributes} onChange={(e)=>setKeyword(e.target.value)} className='storeSearchInputBox'></input>
                </div>
              <div className='filterSec'>
                <div className='priceFilter'>
                  <span>PRICE:</span>
                  <input min="0" onKeyUp={(e)=>e.target.value<0?e.target.value="":e.target.value} onChange={(e)=>setMin((e.target.value<0)?(undefined):(e.target.value))} type='number' placeholder='min' className='priceFilterInputBox'></input>
                  <input min="0" onKeyUp={(e)=>e.target.value<0?e.target.value="":e.target.value} onChange={(e)=>setMax((e.target.value<0)?(undefined):(e.target.value))} type='number' placeholder='max' className='priceFilterInputBox'></input>
                </div>
                <div className='sizeFilter'>
                   <span>QNT:</span>
                   <select className='sizeSelect' onChange={(e)=>setQnt(e.target.value)}>
                     <option value='none'>none</option>
                     <option value="350gm">350gm</option>
                     <option value="850gm">850gm</option>
                     <option value="1250gm">1250gm</option>
                   </select>
                </div>
              </div>

            </div>
            
            <div className='storeProductContainer'>
        
           
            {
              loading?(<div className='loading'></div>):(
                (data.length===0)?(<span>There is no item for your search🙂‍↕️</span>):(
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
                    
                    <Link  to={`${product._id}`} style={{textDecoration:'none'}}>
                     <div className='productimage'>
                      <img src={product.images[0]} alt='' className='productImg'></img>
                    </div>
                    </Link>
                    <div className='productContent'>
                        <span className='productText'>{productTitle}</span>
                        <span className='productPrice'>Rs. {sellingPrice}.00/<small>{product.size}</small> {isDiscountAvailable && <span className='orgPrice'>Rs. {orgPrice}/Kg</span>}</span>
                        <div className='productSize'><i>pack of </i>{product.size}</div>
                        <button className='productBtn' onClick={()=>handleCart(product._id,sellingPrice,savingMoney,product.size)}>Add to cart</button>
                    </div>
                  </motion.div>
                  )
                  
                }))
              )
            }

            
        </div>
        </div>
       

    </div>
    <Footer></Footer>
    </>
  )
}
