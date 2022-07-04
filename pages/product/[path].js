import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

//Models
import db from "../../utils/db";
import Product from "../../models/Product";
import { Store } from "../../utils/Store";

export default function ProductPage(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < 0) {
      window.alert("oops!, Product is out of stock");
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...data, quantity },
    });
    router.push("/cart");
  };

  return (
    <Layout>
      <div className="border-2w-full px-44 flex flex-row items-center justify-center gap-10">
        <div className="w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          ></Image>
        </div>
        <div className="w-1/2 h-auto flex flex-col items-center justify-between gap-20">
          <div className="bg-gray-100 border-1 flex flex-col gap-3 px-6 py-4">
            <h4 className="text-xl font-bold text-center bg-gray-400 text-gray-50">
              {product.name}
            </h4>
            <div className="flex items-center justify-between w-full border-b pb-1">
              <h4 className="text-lg font-semibold">category: </h4>
              <span className="text-lg text-gray-500 font-bold">
                {product.category}
              </span>
            </div>
            <div className="flex items-center justify-between w-full border-b pb-1">
              <h4 className="text-lg font-semibold">Brand:</h4>{" "}
              <span className="text-lg text-gray-500 font-bold">
                {product.brand}
              </span>
            </div>
            <div className="flex items-center justify-between w-80 border-b pb-1">
              <h4 className="text-lg font-semibold">Description:</h4>
              <span className="text-lg text-gray-500 font-bold">
                {product.description}
              </span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <Rating value={product.rating} readOnly></Rating> (
              {product.numReviews} reviews)
            </div>
          </div>
          <div className="w-1/2 border-1 bg-gray-100 flex flex-col gap-2 px-6 py-4">
            <div className="flex items-center justify-between w-full border-b pb-1">
              <h4 className="text-lg font-semibold">Price</h4>
              <h3 className="text-lg text-gray-500 font-bold">
                ${product.price}
              </h3>
            </div>
            <div className="flex items-center justify-between w-full border-b pb-1">
              <h4 className="text-lg font-semibold">Status</h4>
              <h3 className="text-lg font-bold">
                {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </h3>
            </div>
            <button
              className="bg-yellow-400 py-0.5 rounded-sm mt-3 text-gray-50 font-bold"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { path } = params;
//   await db.connect();
//   const product = await Product.findOne({ path }).lean();
//   await db.disconnect();
//   return {
//     props: {
//       product: db.convertDocToObj(product),
//     },
//   };
// }

export async function getServerSideProps(context) {
  const { params } = context;
  const { path } = params;
  const slug = path;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
