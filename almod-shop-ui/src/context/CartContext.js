import { createContext,useEffect, useReducer } from "react"


const INITIAL_STATE={
    cart:JSON.parse(localStorage.getItem('cart')) || null,
    loading:false,
    error:null
}


export const CartContext=createContext(INITIAL_STATE)


const CartReducer=(state,action)=>{
      switch(action.type){
          case "CART_START":
            return {
                cart:state.cart,
                loading:true,
                error:null
            }

          case "CART_CHANGE":
            return {
                cart:action.payload,
                loading:false,
                error:null
            }
          
          case "CART_FAILURE":
            return {
                cart:state.cart,
                loading:false,
                error:action.payload
            }
        
          case "EMPTY_CART":
            return {
                cart:[],
                loading:false,
                error:null
            }
        
          default:
            return state
      }
}

export const CartContextProvider=({children})=>{
    const [state,dispatch]=useReducer(CartReducer,INITIAL_STATE)
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(state.cart))
    })

    return (
        <CartContext.Provider
         value={
            {
                cart:state.cart,
                loading:state.loading,
                error:state.error,
                dispatch
            }
         }
        >
         {children}
        </CartContext.Provider>
    )
}