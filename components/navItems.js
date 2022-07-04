// import React, { useContext } from "react";
// import NextLink from "next/link";
// import { FaUserAlt } from "react-icons/fa";
// import { Store } from "../utils/Store";
// import { useRouter } from "next/router";

// export default function NavItems() {
//   const { state, dispatch } = useContext(Store);
//   const { userInfo } = state;
//   const { cart } = state;
//   const router = useRouter();
//   const logoutClickHandler = () => {
//     dispatch({ type: "USER_LOGOUT" });
//     Cookies.remove("userInfo");
//     Cookies.remove("cartItems");
//     Cookies.remove("shippinhAddress");
//     Cookies.remove("paymentMethod");
//     router.push("/");
//   };
//   return (
//     <div>
//       <div className="flex flex-row items-center gap-6 text-md font-semibold">
//         <div className="cursor-pointer">
//           <NextLink href="/cart">
//             {cart.cartItems.length > 0 ? (
//               <span className="relative">
//                 <p>Cart</p>
//                 <div className="absolute -top-1 -right-3 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   <h6>{cart.cartItems.length}</h6>
//                 </div>
//               </span>
//             ) : (
//               <p>Cart</p>
//             )}
//           </NextLink>
//         </div>
//         <div>
//           {userInfo ? (
//             <div className="flex flex-row items-center justify-center gap-5">
//               <span className="cursor-pointer">Hi ,{userInfo.name}</span>
//               <div className="flex flex-col items-center justify-center relative">
//                 <span className="cursor-pointer">
//                   <FaUserAlt className="w-full h-full" />
//                 </span>
//                 <div className="absolute px-1 py-2 border-1 bg-blue-800 mt-20 px-2">
//                   <button onClick={logoutClickHandler}>Logout</button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <NextLink href="/login">
//               <span className="cursor-pointer">Login</span>
//             </NextLink>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
