import { useEffect, useReducer } from "react";
import cartReducer from "./cartReducer";

export default function ShoppingCart(props) {
  const cartItemList = props.cartItemList;
  const init = (propProducts) => ({
    products: propProducts
  });
  const [cartState, dispatch] = useReducer(cartReducer,{total: 0, cartItemList: []})
  console.log(cartState)

  useEffect(()=>{
    if(cartItemList.length == 0){
      console.log("No list")
    } else {
      console.log("List exists")
          dispatch({type: "NEW_CART_ITEM_LIST", payload: cartItemList})
    }
    

  },[cartItemList])




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
                          onClick={()=>{dispatch({type: "SUBTRACT_QUANTITY"})}}
                        >
                          −
                        </button>
                        <button
                          className="px-3 py-1 text-lg bg-gray-800 text-white rounded hover:bg-gray-700"
                          onClick={()=>{dispatch({type: "ADD_QUANTITY"})}}
                        >
                          +
                        </button>
                        <button
                          className="px-1 py-1 text-sm bg-red-800 text-white rounded hover:bg-red-700"
                          onClick={()=>{dispatch({type: "DELETE_CART_ITEM"})}}
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
          <span className="text-sm font-bold">$89.97</span>
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl transition-all duration-300">
          Checkout
        </button>
      </div>
    </div>
  );
}
