import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import Button from "../components/Button";
import { runFireworks } from "../lib/utils";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );

  return { props: { order } };
}

function Success({ order }) {
  const router = useRouter();

  useEffect(() => {
    runFireworks();
  }, []);

  return (
    <div>
      <div className="bg-gray-100 h-screen flex">
        <main className="max-w-2xl mx-auto  flex-col mt-10 lg:mt-20 justify-center items-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white py-8 px-4 md:px-10 md:py-12 lg:p-14 flex flex-col mx-3 text-center justify-center items-center"
          >
            <BsBagCheckFill className="text-green-500 w-10 lg:w-22 mb-4" />
            <div className="flex items-center space-x-3">
              <h1 className="text-base lg:text-2xl  font-light md:text-lg">
                Thank You {order?.customer_details?.name}!
              </h1>
            </div>
            <p className="mt-4  font-light"> Your order has been confirmed!</p>
            <p className="my-4  font-light">
              Expected delivery is{" "}
              {order?.shipping_rate === "shr_1LDAEGItA6gJosNwpPMftpTY"
                ? "1-2 working days"
                : "4-5 working days"}
              .
            </p>
            <div className="flex space-x-4 w-full justify-center">
              <Button
                btnName="Continue Shopping"
                handleClick={() => router.push("/")}
              />
              <Button
                btnName="Your Order"
                handleClick={() => router.push("/profile")}
              />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Success;
