
import { createContext, useEffect, useReducer } from "react"

let cartItems=JSON.parse(localStorage.getItem("cart"))
let TransObj=JSON.parse(localStorage.getItem("Trans"))
if(TransObj!==null){
    let {totalPrice,totalSaving}=TransObj.priceDetails
    if(totalPrice<0 || totalSaving<0){
       TransObj.priceDetails={totalPrice:0,totalSaving:0}
    }
}

if(TransObj===null && cartItems!==null){
   if(cartItems.length!==0){
   localStorage.removeItem("cart");
   }
}

if(cartItems===null || cartItems.length===0){
    if(TransObj!==null){
      TransObj.priceDetails={totalPrice:0,totalSaving:0}
    }
}


const INITIAL_STATE={
    priceDetails:(TransObj===null)?({totalPrice:0,totalSaving:0}):(TransObj.priceDetails),
    shippingCharge:{state:null,charge:0}
}

export const TransContext=createContext(INITIAL_STATE)


const TransReducer=(state,action)=>{
    switch(action.type){
        case "TRANS_PRICE":
            return {
                priceDetails:action.payload,
                shippingCharge:state.shippingCharge
            }
        case "TRANS_SHIPPING":
            return{
                priceDetails:state.priceDetails,
                shippingCharge:action.payload
            }
        
        case "TRANS_CLEAR":
            return {
                priceDetails:{totalPrice:0,totalSaving:0},
                shippingCharge:{state:null,charge:0}
            }
       
        default:
            return state
    }

}


export const TransContextProvider=({children})=>{
    const [state,dispatch]=useReducer(TransReducer,INITIAL_STATE)
    useEffect(()=>{
        localStorage.setItem("Trans",JSON.stringify({"priceDetails":state.priceDetails,"shippingCharge":state.shippingCharge}))
    })

    return(
        <TransContext.Provider
        value={
            {
                priceDetails:state.priceDetails,
                shippingCharge:state.shippingCharge,
                dispatch
            }
        }
        >
           {children}
        </TransContext.Provider>
    )
}