import React, { useContext, useState, useEffect } from "react";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";
import CheckOutStatus from "../components/checkoutStatus";
import { Controller, useForm } from "react-hook-form";

export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);

  const submitHandler = () => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set("shippingAddress", {
      name,
      address,
      city,
      postalCode,
    });
    router.push("/payment");
  };
  return (
    <Layout>
      <CheckOutStatus activeStep={1} />
      <div className="w-full h-full flex flex-col items-center justify-center -mt-36">
        <div className="mt-44 flex flex-col items-start justify-center gap-5 border-gray-200 w-96 py-6 rounded-md">
          <h4 className="text-xl font-bold text-blue-700">
            Shipping setAddress
          </h4>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-6 w-80">
              <div>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={name ? name : ""}
                      className="form w-80-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="User name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                ></Controller>
              </div>
            </div>
            <div className="mb-6 w-80">
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    value={address ? address : ""}
                    className="form w-80-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="setAddress"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                )}
              ></Controller>
            </div>
            <div className="mb-6 w-80">
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    value={city ? city : ""}
                    className="form w-80-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                )}
              ></Controller>
            </div>
            <div className="mb-6 w-80">
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <input
                    type="Postal Code"
                    value={postalCode ? postalCode : ""}
                    className="form w-80-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="postal code"
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                )}
              ></Controller>
            </div>
            <div className="text-center lg:text-left w-80">
              <NextLink href="/payment">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 w-full text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Continue
                </button>
              </NextLink>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
