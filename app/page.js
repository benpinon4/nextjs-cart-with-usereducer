"use client";

import { useState } from "react";
import Image from "next/image";
import ShoppingItemList from "./components/ShoppingItemList";
import ShoppingCart from "./components/ShoppingCart";

export default function Home() {
  const [cartItemList, setCartItemList] = useState([]);
  return (
    <div className="">
 <div className="place-items-center"><h1>Items for Purchase</h1></div>
      
    <div className="page-container">
      <ShoppingItemList className="product-grid" setCartItemList={setCartItemList} cartItemList={cartItemList} />
      <ShoppingCart cartItemList={cartItemList} className="cart-sidebar" />
    </div>
    </div>
  );
}
