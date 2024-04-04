import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import HambergurMenu from "../assets/HambergurMenu.svg";
import Logo from '../assets/Smarty (3).png';
import NavCartButton from "../components/cart/NavCartButton";
import { logout } from "../store/actions/auth-actions";

const MainNavigation = () => {
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const navHandler = () => {
    setShowNav(!showNav);
  };

  const logoutUser = () => {
    dispatch(logout(token));
  };

  const svgVariants = {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { duration: 1 },
    },
  };

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 2px #ffffff",
      boxShadow: "0px 0px 4px #243E8B",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="w-full h-[80px]">
      <div className="flex  justify-between items-center w-full h-full px-8 sm:mb-6">
        <div className="flex">
          <div className="flex items-center">
            <motion.div
              className="w-[50px] h-[50px]"
              drag
              dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
              dragElastic={0.7}
            >
              {/* <NavLink to='/'><img src={Logo} alt="" /></NavLink> */}
              <NavLink to="/">
      {/* Replace motion.svg with motion.img */}
      <motion.img
        height="50"
        width="50"
        src={Logo} 
        alt="Your Alt Text"
        variants={svgVariants} // Assuming you have defined svgVariants elsewhere
        initial="hidden"
        animate="visible"
      />
    </NavLink>
              {/* <NavLink to="/">
                <motion.svg
                  height="50"
                  width="50"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 300.004 300.004"
                  xmlSpace="preserve"
                  variants={svgVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.path
                    d="M2305 3314 c-308 -69 -527 -336 -528 -644 0 -117 17 -189 70 -299 85
                    -177 260 -316 449 -356 228 -48 445 16 609 180 133 132 196 281 197 460 1 121
                    -15 192 -69 304 -78 162 -225 286 -407 343 -85 26 -233 32 -321 12z m120 -290
                    c61 -3 121 -8 135 -9 14 -2 32 -4 41 -4 31 -2 28 -28 -17 -137 -24 -60 -44
                    -110 -44 -111 0 -2 45 -3 100 -3 95 0 100 -1 105 -22 2 -13 -8 -117 -23 -233
                    -23 -177 -30 -210 -45 -213 -21 -4 -22 11 -2 223 8 88 15 168 15 178 0 16 -9
                    17 -87 15 l-87 -3 -86 -205 c-60 -144 -90 -206 -102 -208 -10 -2 -18 2 -18 9
                    0 7 56 156 125 332 69 176 124 321 122 323 -5 5 -347 27 -352 23 -2 -3 4 -34
                    15 -69 10 -36 24 -84 30 -107 l11 -43 89 0 c50 0 90 -4 90 -8 0 -5 -6 -16 -13
                    -25 -10 -15 -27 -17 -106 -15 l-94 3 -50 148 c-60 182 -60 182 58 173 44 -3
                    130 -8 190 -12z"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </motion.svg>
              </NavLink> */}
            </motion.div>
            <motion.div
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            >
              <NavLink to="/">
                <h1 className="text-2xl font-bold ml-2 select-none">
                  <span className="text-primary">Smarty</span>
                  <span className="text-secondary-200">Furniture.</span>
                </h1>
              </NavLink>
            </motion.div>
          </div>
          <ul className="hidden md:flex items-center lg:ml-8">
            <li>
              <NavLink className="ml-4 p-2 lg:text-lg font-semibold" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="ml-2 p-2 lg:text-lg font-semibold"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className="ml-2 p-2 lg:text-lg font-semibold"
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li>
              {isAuthenticated && (
                <NavLink
                  className="ml-2 p-2 lg:text-lg font-semibold"
                  to="/checkout"
                >
                  Checkout
                </NavLink>
              )}
            </li>
          </ul>
        </div>
        <div className="hidden md:flex">
          <NavCartButton />
          {!isAuthenticated && (
            <NavLink to="/login">
              <motion.button className="border-primary border-4 text-primary font-bold px-4 py-2 ml-2 rounded-full shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
              >
                Login
              </motion.button>
            </NavLink>
          )}
          {isAuthenticated && (
            <motion.button
              onClick={logoutUser}
              className="border-primary border-4 text-primary font-bold px-4 py-2 ml-2 rounded-full shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
            >
              Logout
            </motion.button>
          )}
        </div>
        <div className="md:hidden cursor-pointer" onClick={navHandler}>
          {!showNav ? (
            <img src={HambergurMenu} alt="" />
          ) : (
            <XIcon className="w-5" />
          )}
        </div>
      </div>

      <ul
        className={
          !showNav
            ? "hidden"
            : "md:hidden px-8 py-4 bg-white w-full h-[20rem] relative z-20"
        }
      >
        <li className="border-b-2 border-zinc-300 w-full text-lg font-semibold text-gray-600">
          <NavLink to="/" onClick={navHandler}>
            Home
          </NavLink>
        </li>
        <li className="border-b-2 border-zinc-300 w-full mt-4 text-lg font-semibold text-gray-600">
          <NavLink to="/about" onClick={navHandler}>
            About
          </NavLink>
        </li>
        <li className="border-b-2 border-zinc-300 w-full mt-4 text-lg font-semibold text-gray-600">
          <NavLink to="/products" onClick={navHandler}>
            Products
          </NavLink>
        </li>
        <li className="border-b-2 border-zinc-300 w-full mt-4 text-lg font-semibold text-gray-600">
          {isAuthenticated && (
            <NavLink to="/checkout" onClick={navHandler}>
              Checkout
            </NavLink>
          )}
        </li>
        <div className="flex flex-col items-center m-4 space-y-4">
          <div onClick={navHandler}>
            <NavCartButton />
          </div>
          {!isAuthenticated && (
            <NavLink
              onClick={navHandler}
              to="/login"
              className="border-primary border-4 text-primary font-bold px-9 py-2 ml-2 rounded-full shadow-lg"
            >
              Login
            </NavLink>
          )}
          {isAuthenticated && (
            <button
              onClick={logoutUser}
              className="border-primary border-4 text-primary font-bold px-9 py-2 ml-2 rounded-full shadow-lg"
            >
              Logout
            </button>
          )}
        </div>
      </ul>
    </div>
  );
};

export default MainNavigation;
