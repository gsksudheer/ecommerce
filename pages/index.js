import Head from 'next/head'
import Image from 'next/image'
import Layout from "../components/Layout";
import { Rating } from "@mui/material";
import styles from "../styles/Home.module.css";
import NextLink from "next/link";
import data from "../utils/data";
import db from "../utils/db";
import product from "../models/Product";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/Store";
import axios from "axios";

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products } = props;
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
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
      <div className="flex flex-wrap items-center justify-center gap-10 mx-20">
        {products.map((data) => (
          <div
            key={data.name}
            className="bg-gray-100 border-1 border-gray-300 rounded-lg shadow-xl"
          >
            <NextLink href={`/product/${data.slug}`}>
              <div className="">
                <div className="w-96 h-96">
                  <img
                    src={data.image}
                    className="w-full h-full rounded-t-lg"
                  />
                </div>
                <div className="pt-1 flex items-center justify-around">
                  <h4 className="text-lg font-semibold">{data.name}</h4>
                  <Rating value={data.rating} readOnly></Rating>
                </div>
              </div>
            </NextLink>
            <div className="flex items-center justify-around pt-2 border-b pb-4">
              <h6 className="text-xl font-semibold">${data.price}</h6>
              <button
                className="text-sm bg-yellow-500 text-white px-2 py-0.5 rounded-md"
                onClick={() => addToCartHandler(data)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}