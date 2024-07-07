import React, {useState} from 'react'
import { useContext } from 'react'
import { TransContext } from '../../context/TransContext'
import {AuthContext} from '../../context/AuthContext'
import {CartContext} from '../../context/CartContext'

//importing images
import UpiImg from '../../assets/upi.png'
import BankImg from '../../assets/banking.png'
import VisaImg from '../../assets/visa.png'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'



export default function PayWindow() {
    const baseURL=process.env.REACT_APP_API_BASE_URL
    const navigate=useNavigate()
    const currency="INR"
    const receipt="qwsaq1"
   
    const transObj=useContext(TransContext)
    const {priceDetails,shippingCharge}=transObj
    const transDispatch=transObj.dispatch
    const {user}=useContext(AuthContext)
    const {cart,dispatch}=useContext(CartContext)
    
    const [error,setError]=useState(null)
    const payprice=(priceDetails.totalPrice+shippingCharge.charge)*100

    let user_address=`${user.address.flateno}, ${user.address.locality}, ${user.address.city}-${user.address.postcode}, ${user.address.state}`

    const emptycart=async ()=>{
       try{
        //empty cart on db
         await axios.post(`${baseURL}/user/cart/${user._id}`,[])
         //empty cart on localstorage
         dispatch({type:"EMPTY_CART"})
         //clear tran data
         transDispatch({type:"TRANS_CLEAR"})
         navigate('/')
       }catch(err){
         console.log("There is something wrong in empty cart..!")
       }
    }
    const notifyuser=async (paymentInfo)=>{
       try{
           let usermail={
            to:user.email,
            subject:'Ordered recived successfully',
            body:`<p>Ordered Id ${paymentInfo.order_id} </p>
            <br>
            <p>Hellow 👋 <br>
            <br>
            We’re excited to welcome you to the fuelflex family!<br><br>

            You will receive your order with in 7 days <br><br>
            
            Every single one of us is here to make sure you’re happy with fuelflex foods.  <br>
            
            If you need any help at all, drop us a line anytime at fuelflexindia@gmail.com or message us @fuelflex.in We’ll be more than happy to lend a hand!
            `
           }

           let adminmail={
            to:'mesuriyavivek49@gmail.com',
            subject:'New Order recieved 🥳🥳',
            body:`<h4>order id: ${paymentInfo.order_id} </h4> <br><br>

            <span>username: ${user.first_name} ${user.last_name}</span><br>
            <span>mobileno: ${user.mobileno}</span><br>
            <span>address: ${user_address}</span><br>
            <br><br>
            <h4>Product amount recived: ${priceDetails.totalPrice}</h4><br>
            <h4>shipping charge: ${shippingCharge.charge}</h4>
            <br>
            <p>For more info please check out admin panel and razorpay dashboard payment check</p>

            `
           }
           //for sending to user
           await axios.post(`${baseURL}/mail/send`,usermail)
           //for sending to admin
           await axios.post(`${baseURL}/mail/send`,adminmail)
       }catch(err){

       }
    }
    const makeTransaction=async (paymentInfo)=>{
       const transObj={
          user_id:user._id,
          order_id:paymentInfo.order_id,
          payment_id:paymentInfo.payment_id,
          transaction_status:paymentInfo.msg,
          product_list:cart,
          product_pay:priceDetails.totalPrice,
          shipping_charge:shippingCharge.charge,
          delivery_address:user_address,
          ordered_date:Date.now()
       }

       try{
         await axios.post(`${baseURL}/transaction/`,transObj,{ withCredentials: true })
         if(paymentInfo.msg==="success"){
            notifyuser(paymentInfo)
            emptycart()
         }
       }catch(err){
         console.log("There is something wrong in making transition")
       }
    }

    const paymentHandler=async ()=>{

      try{
         const response=await axios.post(`${baseURL}/payment/paynow`,{amount:payprice,currency,receipt},{withCredentials:true})
         const order=response.data
                
         //razorpay option value
         var options = {
          "key": "rzp_test_SCY1Bxb9fJzZa4", // Enter the Key ID generated from the Dashboard
          "amount":payprice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency,
          "name": "Fuelflex", //your business name
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id":order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler":async function (response){
            const validateRes=await axios.post(`${baseURL}/payment/validatepayment`,{...response},{withCredentials:true})
            
            makeTransaction(validateRes.data)
          },
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
              "name": `${user.first_name} ${user.last_name}`, //your customer's name
              "email": user.email,
              "contact": user.mobileno  //Provide the customer's phone number for better conversion rates 
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
         };
         var rzp1 = new window.Razorpay(options);
             rzp1.on('payment.failed', function (response){
                    console.log(response.error)
        });
        rzp1.open();
  

      }catch(error){
        setError("There is something wrong...!")
      }
    }





  return (
    <div className='infoWindow paywide'>
       <div className='payWindowContainer'>
          <div className='pleft'>
            <input className='checkbox-round' type='checkbox' defaultChecked></input>
          </div>
          <div className='pright'>
             <div className='payimages'>
               <img src={UpiImg} alt=''></img>
               <img src={VisaImg} alt=''></img>
               <img src={BankImg} alt=''></img>
             </div>
             <div className='payInfo'>
              <p>Make your payment with different payment option click on pay now to procced to payment window.</p>
              <span>Shipping charges Rs. {shippingCharge.charge}.00</span>
              <span>Totap Pay: Rs. {priceDetails.totalPrice+shippingCharge.charge}.00</span>
             </div>
          </div>
       </div>
       <button className='paynowBtn' onClick={paymentHandler}>Pay Now</button>
       <span className='errMsg'>{error}</span>
    </div>
  )
}
