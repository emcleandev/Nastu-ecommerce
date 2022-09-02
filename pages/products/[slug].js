/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "urql";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import { useStateContext } from "../../lib/context";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import toast from "react-hot-toast";

function ProductDetails() {
  const { qty, qtyToggle, cartItems, setCartItems, onAdd, setQty } =
    useStateContext();
  const router = useRouter();
  const { slug } = router.query;
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug },
  });

  useEffect(() => {
    setQty(1);
  }, []);

  const { data, fetching, error } = results;

  const product = data?.products?.data[0]?.attributes;

  const notify = () => {
    toast.success(`${qty} x ${product?.title} added to your cart`, {
      duration: 2000,
    });
  };

  return (
    <div>
      <main className="w-full flex justify-center items-center mt-3 lg:mt-6">
        <div className="lg:w-11/12 flex flex-wrap  bg-white xl:w-11/12 2xl:w-10/12 px-4 py-10 ml-4 mr-4 shadow-lg ">
          <div className="">
            {product?.image && (
              <div className=" w-[350px] h-[350px] lg:w-[500px] mx-auto lg:mx-0 lg:h-[500px] xl:w-[750px] xl:h-[750px]">
                <img
                  src={product?.image?.data?.attributes?.formats?.large?.url}
                  alt="shoe"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          <div className="lg:w-4/12  w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 lg:ml-2  flex flex-col justify-evenly">
            <h1 className="text-sm title-font text-[#FA5400] font-bold tracking-widest">
              {product?.brand}
            </h1>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product?.title}
            </h1>
            <p className="leading-relaxed mt-3 lg:mt-10">
              {product?.description}
            </p>

            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 mt-6 lg:items-center pb-5 border-b-2 border-black mb-5">
              {/* <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-black  w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-black ml-1 bg-gray-700  w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-black ml-1 bg-red-500  w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex lg:ml-6 items-center">
                <span className="mr-3">Size</span>
                <div>
                  <select className=" border appearance-none border-black py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div> */}

              <div className="flex lg:inline-flex  w-full items-center  mr-1 ">
              <h1 className="font-light mr-2">Quantity: </h1>
                <div className="custom-number-input w-32">
                  <div className="flex flex-row h-10 w-full bg-transparent mt-1">
                  
                    <button
                      className=" bg-[#FA5400] text-white  hover:scale-105 duration-300 active:scale-95 h-full w-20  cursor-pointer outline-none"
                      onClick={() => qtyToggle("decrement")}
                    >
                      <span className="m-auto text-2xl font-base">−</span>
                    </button>
                    <p className="flex items-center justify-center px-3 ">
                      {qty}
                    </p>
                    <button
                      className="bg-[#FA5400] text-white  hover:scale-105 duration-300 active:scale-95 h-full w-20  cursor-pointer"
                      onClick={() => qtyToggle("increment")}
                    >
                      <span className="m-auto text-2xl font-base">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
              £{product?.price}
              </span>
              <Button
                btnName="Add to Cart"
                addtionalStyles="flex ml-auto text-white border-0 py-2 px-6 focus:outline-none"
                handleClick={() => {
                  onAdd(product, qty);
                  notify();
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;
