import React from "react";
import { addItem, decrementQuantity, incrementQuantity } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";

const ItemList = ({ items, resInfo }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(store => store.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem({item, resInfo}));
  };
  const handleIncrement = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.card.info.id === item.card.info.id
    );

    if (existingItemIndex !== -1) {
      // If item already exists in the cart, dispatch the incrementQuantity action
      dispatch(incrementQuantity(existingItemIndex));
    }
  };

  const handleDecrement = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.card.info.id === item.card.info.id
    );

    if (existingItemIndex !== -1) {
      // If item already exists in the cart, dispatch the decrementQuantity action
      dispatch(decrementQuantity(existingItemIndex));
    }
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-b-2 text-left flex justify-between border-[#d3d3d3]"
        >
          <div className="flex flex-col gap-[2px] w-8/12">
            { item.card.info.itemAttribute.vegClassifier === "VEG" ? <i
              id="veg-logo"
              class="fa-regular fa-circle-stop text-[#0f8a65]"
            ></i> : <i id="nonveg-logo" class="fa-regular fa-square-caret-up text-[#e43b4f]"></i>}
            <h3 className="text-[#3e4152] text-lg font-medium">
              {item.card.info.name}
            </h3>
            <h4 className="text-[#3e4152] text-sm font-normal">
              - ₹ {(item.card.info.price || item.card.info.defaultPrice) / 100}
            </h4>
            <p className="text-sm mt-[14px] text-[#282c3f73] w-[95%] -tracking-[0.3]">
              {item.card.info.description}
            </p>
          </div>
          <div className="h-[120px] relative w-4/12 flex justify-center">
          <img className="w-[120px] h-24 rounded-md object-cover" src={CDN_URL + item.card?.info?.imageId} />
          {cartItems.some(
              (cartItem) => cartItem.card.info.id === item.card.info.id
            ) ? (
              // If item is in the cart, show inc-dec-counter
              <div className="flex text-center bg-white absolute  text-[#60b246] select-none border-solid border-0 bottom-[5%] left-[33%] border-[#d4d5d9] rounded-lg justify-around items-center w-[92px] font-semibold shadow-[0_3px_8px_#e9e9eb]">
                <div className=" text-[#bebfc5] cursor-pointer w-[33.33%] pb-[3px] text-[150%] font-semibold" onClick={() => handleDecrement(item)}>-</div>
                <span>
                  {
                    cartItems.find(
                      (cartItem) => cartItem.card.info.id === item.card.info.id
                    )?.quantity
                  }
                </span>
                <div className="cursor-pointer w-[33.33%] text-[100%] font-semibold" onClick={() => handleIncrement(item)}>+</div></div>
            ) : (
              // If item is not in the cart, show ADD button
              <button className="text-[#60b246] cursor-pointer bg-white border-[#60b246] py-[7px] px-8 font-semibold rounded-lg absolute bottom-[5%] left-[33%] shadow-[0_3px_8px_#e9e9eb]" onClick={() => handleAddItem(item)}>ADD</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;