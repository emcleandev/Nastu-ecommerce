/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useStateContext } from "../lib/context";
import Button from "./Button";

function Product({ product }) {
  const { onAdd } = useStateContext();



  const notify = () => {
    toast.success(`${1} x ${product?.title} added to your cart`, {
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col flex-wrap mx-2 mb-6 md:mx-4 md:mb-10 px-4 py-6 md:px-6 lg:px-8 lg:py-8 bg-white ">
      <Link href={`/products/${product?.slug}`}>
        <div className="w-80 md:w-80 h-96 object-contain cursor-pointer">
          {product?.image && (
            <img
              src={product?.image?.data?.attributes?.formats?.large?.url}
              alt="shoe"
            />
          )}
        </div>
      </Link>
      <div className="flex flex-col w-72 mt-3 md:mt-6  text-left space-y-3">
        <h1 className="font-semibold text-lg md:text-xl">{product?.title}</h1>
        <div className="flex justify-between items-center py-3">
          <h1 className="text-[#111111] font-medium">£{product?.price}</h1>
          <Button
            btnName="Add to Basket"
            addtionalStyles="z-100"
            handleClick={() => {
              onAdd(product, 1);
                  notify();
            }}
          />
          {/* <button className="px-4 py-2 bg-[#FA5400] rounded-full text-white shadow-md font-semibold hover:scale-105 duration-300 active:scale-95">
                Add to Basket
            </button> */}
        </div>
      </div>
    </div>
  );
}

export default Product;
