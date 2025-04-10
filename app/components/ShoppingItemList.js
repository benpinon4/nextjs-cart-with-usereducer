"use client";

import { useEffect, useState } from "react";

export default function ShoppingItemList(props) {
  const [itemsForPurchase, setItemsForPurchase] = useState(null);
  const setCartList = props.setCartItemList;
  const cartItemList = props.cartItemList
  useEffect(() => {
    async function retrieveItemsForPurchase() {
      const response = await fetch("https://fakestoreapi.com/products");
      const parsedList = await response.json();

      setItemsForPurchase(parsedList);
      
    }
    retrieveItemsForPurchase();
  }, []);

  function handleAdd(item) {
    let newCartItem = {...item, quantity: 1}
    console.log(newCartItem.id)
    console.log(item.id)
    console.log(item.id === newCartItem.id ? console.log(true) : console.log(false))
   // setCartList([...cartItemList, newCartItem])

    cartItemList.some((item)=>item.id === newCartItem.id) ? 
    cartItemList.forEach(element => { 
        if(element.id === item.id){
           console.log("in if")
        element.quantity++
        setCartList([...cartItemList])
        }
        
     }) :
    setCartList([...cartItemList, newCartItem])
    
  }

  itemsForPurchase ? console.log(itemsForPurchase) : console.log("NO DATA");
  return (
    <>
      <ul className="flex flex-row flex-wrap product-grid">
        {itemsForPurchase
          ? itemsForPurchase.map((item, index) => {
              return (
                <li key={index}  >
                  <div className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden w-auto text-white card-holder">
                    <img
                      src={item.image}
                      alt="Product Image"
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-300 mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold">$49.99</span>
                        <span className="text-sm bg-green-600 text-white px-2 py-1 rounded-full">
                          In Stock
                        </span>
                      </div>

                      <button onClick={()=>handleAdd(item)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl transition-all duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              );
            })
          : "Loading"}
      </ul>
    </>
  );
}
