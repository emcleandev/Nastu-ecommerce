import React from "react";
import Stripe from "stripe";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import formatMoney from "../lib/formatMoney";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });

    return { props: { orders: paymentIntents.data } };
  },
});

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

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

function Profile({ user, orders }) {
  const route = useRouter();

  console.log(`orders`, orders);
  console.log(`user`, user);
  return (
    user && (
      <div>
        <main className="max-w-screen-lg mx-auto">
          <div className="mt-10">
            <h1 className="text-2xl border-b border-black p-2">Your Orders</h1>
            <p className="my-2 text-sm pl-2">
              {orders.length === 0 ? "0" : orders.length} order(s)
            </p>
          </div>
          <motion.div variants={cards} initial="hidden" animate="show">
            {orders.map((order, i) => (
              <motion.div variants={card} key={i}>
                <div className="flex flex-col  p-4 r mb-2">
                  <div className="flex flex-col   space-y-5 md:space-y-0 md:flex-row p-4 lg:p-5  bg-white">
                    <div className="flex flex-col mr-10 space-y-2 justify-start text-left">
                      <p className="text-xs font-normal">RECEIPT EMAIL</p>
                      <p className="text-xs font-light">{user.email}</p>
                    </div>
                    <div className="flex flex-col space-y-2 justify-start text-left">
                      <p className="text-xs font-normal">ORDER AMOUNT</p>
                      <p className="text-xs font-light">{formatMoney(order.amount)}</p>
                    </div>
                    <div className="flex flex-col space-y-2 justify-start text-left md:text-right md:ml-auto">
                      <p className="text-xs font-normal">ORDER NUMBER</p>
                      <p className="text-xs font-light">{order.id}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    )
  );
}

export default Profile;
