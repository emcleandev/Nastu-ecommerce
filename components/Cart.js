/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useStateContext } from "../lib/context";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "./Button";

import { motion } from "framer-motion";
import getStripe from "../lib/getStripe";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import toast from "react-hot-toast";

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { delay: 1 } },
};
const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.5, staggerChildren: 0.1 },
  },
};

function Cart() {
  const { user, error, isLoading } = useUser();
  const { cartItems, setShowCart, onAdd, removeItem, totalPrice } =
    useStateContext();

  // payment
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });

    const data = await response.json();

    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  const notify = () => {
    toast.error(`Please Login to continue`, {
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 right-0 h-screen w-full duration-300  bg-black/40"
    >
      <motion.div
        initial={{ x: "50%" }}
        exit={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 0.8 }}
        className="float-right h-screen overflow-y-scroll relative  bg-[#f1f1f1] w-full md:w-10/12 lg:w-6/12 xl:w-4/12 p-8 z-100"
      >
        <div className="flex justify-between items-center mb-6 border-b border-black pb-5">
          {user ? (
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => {
                setShowCart(false);
              }}
            >
              <Link href={"/profile"}>
                <img src={user.picture} alt="user" className="w-10 h-10" />
              </Link>
              <a
                className="text-xl font-light leading-tight cursor-pointer"
                href="/api/auth/logout"
              >
                Logout
              </a>
            </div>
          ) : (
            <a
              className="text-xl font-light leading-tight cursor-pointer"
              href="/api/auth/login"
            >
              Login
            </a>
          )}

          <AiOutlineCloseCircle
            className="w-5 h-5 cursor-pointer"
            onClick={() => setShowCart(false)}
          />
        </div>

        {cartItems.length < 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col mt-8"
          >
            <p className="font-light">You have no items in your cart.</p>
          </motion.div>
        )}

        <motion.div layout variants={cards} initial="hidden" animate="show">
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <motion.div
                  layout
                  variants={card}
                  key={item.slug}
                  className="bg-white flex px-5 py-6 space-y-4 my-3"
                >
                  <img
                    src={item?.image?.data?.attributes?.formats?.thumbnail?.url}
                    alt="product"
                  />

                  <div className="w-[2px] h-32 my-5 bg-[#f1f1f1] mx-8" />

                  <div className="flex  flex-col justify-between">
                    <h1>{item.title}</h1>
                    <h1>
                      {item.quantity} x{" "}
                      <span className="font-light">£{item.price}</span>
                    </h1>
                    <div className="w-full">
                      <Button
                        btnName="Remove"
                        handleClick={() => {
                          removeItem(item);
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>

        {cartItems.length >= 1 && (
          <motion.div layout className="mt-10 flex flex-col space-y-4">
            <h3>
              Subtotal:{" "}
              <span className="font-light">£{totalPrice.toFixed(2)}</span>
            </h3>
            <Button
              btnName="Purchase"
              handleClick={() => {
                if (!user) {
                  notify();
                } else {
                  handleCheckout();
                }
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Cart;
