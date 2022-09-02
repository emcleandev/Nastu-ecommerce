import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useStateContext } from "../lib/context";
import Cart from "./Cart";

function Navbar() {
  const {
    qty,
    qtyToggle,
    cartItems,
    setCartItems,
    onAdd,
    showCart,
    setShowCart,
    totalQuantities,
  } = useStateContext();


  return (
    <div className="px-10 h-11 justify-between flex max-w-4xl mx-auto">
      <Link href={"/"}>
        <p className="text-2xl font-light leading-tight cursor-pointer my-4">
          Shu
        </p>
      </Link>

     
      <div
        className="h-10 w-10 relative rounded-full  my-4 hover:bg-white flex items-center justify-center duration-300 cursor-pointer"
        onClick={() => setShowCart(true)}
      >
        <FiShoppingBag className="w-5 h-5" />
        {totalQuantities > 0 && (
          <div className="h-4 w-4 bg-black rounded-full absolute -right-1 -top-1 flex items-center justify-center text-white p-2">
            <p className="text-xs">{totalQuantities}</p>
          </div>
        )}
      </div>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </div>
  );
}

export default Navbar;
