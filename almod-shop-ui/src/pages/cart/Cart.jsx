import React, { useContext, useState } from 'react'

//importing css
import './cart.css'

import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import CartItem from '../../components/cartitem/CartItem'
import { CartContext } from '../../context/CartContext'
import { TransContext } from '../../context/TransContext'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CheckOut from '../checkout/CheckOut'

export default function Cart() {
  const navigate=useNavigate()
  //fetching users details

  const {cart}=useContext(CartContext)
  const {priceDetails}=useContext(TransContext)

  const [openModal,setOpenModal]=useState(false)

  const{user}=useContext(AuthContext)
  const handleClick=()=>{
      if(user!=null){
         setOpenModal(true)
      }else{
         navigate('/login')
      }
  }

  return (
    <>
    <Navbar></Navbar>
      <div className='cart'>
         <div className='cartTitle'>
             <span className='cartheading'>Shopping Cart</span> 
             <hr className='cartline'></hr>           
         </div>
      {
       (cart===null || cart.length===0)?(
           <span className='cartEmpty'>your cart is empty 🙂‍↕️</span>
       ):(
        <>
        <div className='cartContainer'>
            <div className='cartHead'>
               <span className='cartHeadFirst'>Cart Items</span>
               <span className='cartHeadSecond'>Total Price</span>
            </div>
            <div className='cartItems'>
               {
                   
                   cart.map((cartDetails,i)=>(
                    <CartItem  productId={cartDetails.productId} productSize={cartDetails.size} productQnt={cartDetails.qnt} key={i}></CartItem>
                   ))
               }
            </div>
        </div>
        <div className='grandTotal'>
           <div className='totalPriceDesc'>
                 <div className='totalPriceDiv'>
                  <span className='subTotal'>Grandtotal:</span>
                  <span className='subTotal'>Rs. {priceDetails.totalPrice}</span>
                 </div>
                 <div className='totalPriceDiv'>
                   <span className='totalSaving'>Total Saving:</span>
                   <span className='totalSaving'>Rs. {priceDetails.totalSaving}</span>
                 </div>
           </div>
           <div className='checkOutBtn'>
             <Link to='/store'><button className='continue'>Continue Shopping</button></Link>
             <button className='checkOut' onClick={handleClick}>Checkout</button>
           </div>

        </div>
        </>
       )
      }


     
            
      </div>
    <Footer></Footer>
    {openModal && <CheckOut setModal={setOpenModal} cartItems={cart}></CheckOut>}
    </>
    
  )
}
