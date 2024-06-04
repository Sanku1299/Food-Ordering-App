import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(clearCart());
  };

  return cartItems.length === 0 ? (
    <div className=" flex flex-col justify-center items-center">
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
        alt=""
      />
      <h3 className="text-[#535665] mt-6 text-xl font-semibold">Your cart is empty</h3>
      <p className="text-[#7e808c] mt-2">You can go to home page to view more restaurants</p>
      <Link
            className=" mt-8 bg-black text-white px-4 py-2 rounded-lg"
            to={"/"}
          >
            <span>SEE RESTAURANTS NEAR YOU</span>
          </Link>
    </div>
  ) : (
    <div className="text-center p-4 m-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <button
        className="py-3 px-5 m-2 bg-black text-white shadow-lg rounded-lg font-semibold"
        onClick={() => {
          handleCart();
          toast.success("Cart cleared.");
        }}
      >
        Clear Cart
      </button>
      {cartItems.length === 0 && <h1>Cart is Empty. Please Add Some Items!</h1>}
      <div className="w-6/12 m-auto bg-gray-100 shadow-lg">
        <ItemList items={cartItems}/>
      </div>
      <div className="p-2 m-2 mt-8 flex justify-center items-center">
          <Link className=" py-3 px-5 bg-black text-white rounded-3xl font-bold"
            onClick={() => {
              toast.success("Order Placed Successfully"),
              handleCart();
            }}
            to={"/"}
          >Place Order
          </Link>
        </div>
    </div>
  );
};

export default Cart;