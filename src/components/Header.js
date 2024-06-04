import { useState, useContext } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  // const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-white">
      <div className="logo-container">
        <Link to={"/"}><img className="w-32 m-4 ml-10" src={LOGO_URL} alt="food" /></Link>
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            <Link to="/"><span>
                  <i className="fa-solid fa-house"></i>
                </span>Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          {/* <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li> */}
          <li className="px-4 font-bold">
            <Link to="/cart">
            <span>
                  <i className="fa-solid fa-cart-shopping"></i>
                </span>
              Cart <p className=" bg-orange-600 rounded-full absolute w-6 h-6 text-center top-[52px] right-[150px]">{totalQuantity}</p>
            </Link>
          </li>
          <button
            className="px-4"
            onClick={() => {
              btnName === "Logout" ? setBtnName("Login") : setBtnName("Logout");
            }}
          >   <span>
                <i className="fa-solid fa-user"></i>
              </span>
            {btnName}
          </button>
          {/* <li className="px-4 font-semibold">{loggedInUser}</li> */}
        </ul>
      </div>
    </div>
  );
};
export default Header;
