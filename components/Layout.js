import React, { useContext, useState } from "react";
import Head from "next/head";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { Badge, Link } from "@mui/material";
import NextLink from "next/link";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { cart } = state;
  const router = useRouter();
  const logoutClickHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    Cookies.remove("shippinhAddress");
    Cookies.remove("paymentMethod");
    router.push("/");
  };
  return (
    <div className="">
      <nav
        style={{
          background: "#17163b",
        }}
        className="py-2 text-gray-100 flex flex-row items-center justify-between px-44"
      >
        <NextLink href="/">
          <div className="text-2xl font-bold cursor-pointer">
            <h1>ECommerce</h1>
          </div>
        </NextLink>
        <div className="flex flex-row items-center gap-6 text-md font-semibold">
          <div className="cursor-pointer">
            <NextLink href="/cart">
              {cart.cartItems.length > 0 ? (
                <span className="relative">
                  <p>Cart</p>
                  <div className="absolute -top-1 -right-3 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    <h6>{cart.cartItems.length}</h6>
                  </div>
                </span>
              ) : (
                <p>Cart</p>
              )}
            </NextLink>
          </div>
          <div>
            {userInfo ? (
              <div className="flex flex-row items-center justifu-center gap-5">
                <div>
                  <span className="cursor-pointer">Hi ,{userInfo.name}</span>
                </div>
                <div>
                  <button onClick={() => setIsDropDownOpen((prev) => !prev)}>
                    <FaUserAlt />
                  </button>
                  {isDropDownOpen && (
                    <div className="absolute cursor-pointer px-1 py-2 border-1 bg-gray-300 text-black px-3 mt-3">
                      <button onClick={logoutClickHandler}>Logout</button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <NextLink href="/login">
                <span className="cursor-pointer">Login</span>
              </NextLink>
            )}
          </div>
        </div>
      </nav>
      <div className="mt-20">{children}</div>
    </div>
  );
}
// <div>
//   <Head>
//     <title>ECommerce</title>
//   </Head>
//   <AppBar>
//     <Toolbar>
//       <Typography>EC</Typography>
//     </Toolbar>
//   </AppBar>
//   <Container>
//     <div className="bg-green-300 pt-10">{children}</div>
//   </Container>
//   <footer>
//     <Typography>Footer</Typography>
//   </footer>
// </div>
