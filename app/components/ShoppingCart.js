


import { useEffect, useReducer, useState } from "react";
import cartReducer from "./cartReducer";

export default function ShoppingCart(props) {
  let cartItemList = props.cartItemList;
  let setAddNew = props.setAddnew
  let addNew = props.addNew


  const [cartTotal, setCartTotal] = useState(0)
  const [cartState, dispatch] = useReducer(cartReducer,{action: "", total: cartTotal, cartItemList: []})
  let deleted = false
  // console.log(cartState)

  useEffect(()=>{
    
    if(cartItemList.length == 0 && cartItemList.length > cartState.cartItemList.length){
      console.log("No list")
      // cartItemList = cartState.cartItemList
    // } else if(cartItemList.length != 0 && cartItemList.length === cartState.cartItemList.length) {
    //   dispatch({type: "NEW_CART_ITEM_LIST", payload: cartItemList})
         
    // } else if(cartItemList.length === 0 && cartItemList.length === cartState.cartItemList.length){
    } else if( cartState.cartItemList.length >= 0 && !deleted && addNew ){
      dispatch({type: "NEW_CART_ITEM_LIST", payload: cartItemList})
      deleted = false
      setAddNew(false)
    }
    
    setCartTotal(cartState.total)

  },[cartItemList, cartState.total])


console.log(cartState.total)

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-lg z-50 flex flex-col cart-sidebar">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button className="text-gray-400 hover:text-white text-sm">✕</button>
      </div>
      <div className="overflow-auto">
        {cartState.cartItemList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex-1 overflow-hidden p-4 space-y-4"
                >
                  {/* Cart Item */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <div className="flex flex-row">
                        <p className="text-xs text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                        <button
                          className="p-3 py-1 text-lg bg-gray-800 text-white rounded hover:bg-gray-700"
                          onClick={()=>{
                            item.quantity--
                            dispatch({type: "SUBTRACT_QUANTITY",payload: cartItemList})}}
                        >
                          −
                        </button>
                        <button
                          className="px-3 py-1 text-lg bg-gray-800 text-white rounded hover:bg-gray-700"
                          onClick={()=>{
                            item.quantity++
                            dispatch({type: "ADD_QUANTITY", payload: cartItemList})}}
                        >
                          +
                        </button>
                        <button
                          className="px-1 py-1 text-sm bg-red-800 text-white rounded hover:bg-red-700"
                          onClick={()=>{
                            
                            deleted = true
                            dispatch({type: "DELETE_CART_ITEM", payload: item.id})}}
                        >
                          Remove
                        </button>
                      </div>

                      <div>
                        <p className="text-sm font-semibold mt-1">
                          {item.price}
                        </p>
                        <div className="flex items-center gap-2"></div>
                      </div>
                    </div>
                  </div>

                  {/* Repeat cart items here */}
                </div>
              );
            })
          }
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-400">Subtotal</span>
          <span className="text-sm font-bold">{cartTotal.toFixed(2)}</span>
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl transition-all duration-300">
          Checkout
        </button>
      </div>
    </div>
  );
}
