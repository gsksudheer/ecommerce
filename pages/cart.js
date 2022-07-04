import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { Store } from "../utils/Store";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import Layout from "../components/Layout";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from "@mui/material";
import { useRouter } from "next/router";
function Cart() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock <= 0) {
      window.alert("oops!, Product is out of stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const checkoutHandler = () => {
    router.push("/shipping");
  };
  return (
    <Layout>
      <div>
        <div></div>
        <div className="px-20 flex flex-row items-start justify-center gap-6">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <NextLink href={`/product/${item.slug}`} passHref>
                        <Link>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                        </Link>
                      </NextLink>
                    </TableCell>

                    <TableCell>
                      <NextLink href={`/product/${item.slug}`} passHref>
                        <Link>
                          <Typography>{item.name}</Typography>
                        </Link>
                      </NextLink>
                    </TableCell>
                    <TableCell align="right">
                      <Select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="right">${item.price}</TableCell>
                    <TableCell align="right">
                      <Button
                        className="bg-red-600 px-2 py-1 text-gray-50"
                        onClick={() => removeItemHandler(item)}
                      >
                        <span>Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="w-80 border-1 bg-gray-100 flex flex-col gap-2 px-6 py-4">
            <div className="flex items-center justify-between w-full border-b pb-1">
              <h4 className="text-lg font-semibold">
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                : ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              </h4>
              <h3 className="text-lg text-gray-500 font-bold"></h3>
            </div>

            <button
              className="bg-yellow-400 py-0.5 rounded-sm mt-3 text-gray-50 font-bold"
              onClick={checkoutHandler}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
