import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CheckOutStatus from "../components/checkoutStatus";
import Layout from "../components/Layout";
import NextLink from "next/link";
import { TiTick } from "react-icons/ti";

export default function PlaceOrder() {
  return (
    <Layout>
      <div>
        <CheckOutStatus activeStep={3} />
      </div>
      <div>
        <div className="flex items-center justify-center gap-5 my-10 text-lg font-bold text-gray-400">
          <div className="w-20 h-20">
            <TiTick className="w-full h-full text-green-500" />
          </div>
          Order Placed
        </div>
        <div className="w-full flex items-center justify-center">
          <NextLink href="/">
            <span className="text-gray-100 rounded-md text-lg font-bold bg-yellow-400 px-3 py-2 text-center cursor-pointer">
              Click here to go to home Page
            </span>
          </NextLink>
        </div>
      </div>
    </Layout>
  );
}
