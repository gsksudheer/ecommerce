import React, { useContext, useState, useEffect } from "react";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

import { Store } from "../utils/Store";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      router.push(redirect || "/");
    } catch (err) {
      alert(err.response?.data ? err.response.data.message : err.message);
      //alert("error");
    }
  };
  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center justify-center -mt-36">
        <div className="mt-44 flex flex-col items-center justify-center gap-5 bg-gray-50 border-2 border-gray-200 w-96 py-6 rounded-md">
          <h4 className="text-xl font-bold text-blue-700">Register</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-6 w-80">
              <input
                type="text"
                className="form w-80-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="User name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6 w-80">
              <input
                type="text"
                className="form w-80-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 w-80">
              <input
                type="password"
                className="form w-80-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6 w-80">
              <input
                type="Confirm password"
                className="form w-80-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="text-center lg:text-left w-80">
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 w-full text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Register
              </button>
              <p className="text-sm font-semibold mt-2 pt-1 mb-0 flex">
                Already Registered? &nbsp;
                <NextLink href="/login">
                  <p className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out cursor-pointer">
                    Login
                  </p>
                </NextLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
