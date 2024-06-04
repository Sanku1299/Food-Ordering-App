import React, { useEffect, useState, useContext } from "react";
import RestaurantCard, { withHeader } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import toast from "react-hot-toast";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log(listOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.07480&lng=72.88560&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING#"
      );
      const json = await data.json();
          setListOfRestaurants(
            json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
          );
          setFilteredRestaurant(
            json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
          );
        };

  const HeaderResCard = withHeader(RestaurantCard);

  // const {loggedInUser, setUserName} = useContext(UserContext);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className=" w-[1144px] mx-auto">
      <div className="flex justify-center gap-5 my-8">
        <div className="border-solid border-2 rounded-[18px] flex justify-between items-center w-[250px] h-[45px] shadow-lg">
          <input
            className="w-full h-full rounded-full focus:outline-none p-2"
            type="text"
            placeholder="Search for restaurants, cuisines"
            value={searchText}
            onChange={(e) => {
              const searchTextValue = e.target.value.toLowerCase();
              setSearchText(searchTextValue);

              if (searchTextValue === "") {
                setFilteredRestaurant(listOfRestaurants);
              } else {
                const filteredList = listOfRestaurants.filter(
                  (res) =>
                    res.info.name.toLowerCase().includes(searchTextValue) ||
                    res.info.cuisines.some((cuisine) =>
                      cuisine.toLowerCase().includes(searchTextValue)
                    )
                );
                setFilteredRestaurant(filteredList);
              }
            }}
          />
          <div
            className=" flex w-12 h-12 items-center justify-center cursor-pointer text-lg"
            onClick={() => {
              console.log(searchText);
              setSearchText("");
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#939393" }}
            ></i>
          </div>
        </div>
        <button
          className="text-black bg-white border-[#e2e2e7] border-[1px] px-3 py-2 rounded-2xl text-sm font-normal"
          onClick={() => {
            setFilteredRestaurant(listOfRestaurants);
            toast.success("All Restaurants Displayed");
          }}
        >
          All Restaurants
        </button>
        <button
          className="text-black bg-white border-[#e2e2e7] border-[1px] px-3 py-2 rounded-2xl text-sm font-normal"
          onClick={() => {
            const filteredRest = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.3
            );
            setFilteredRestaurant(filteredRest);
            toast.success("Highly Rated Restaurants");
          }}
        >
          Ratings 4.3+
        </button>
        <button
          className="text-black bg-white border-[#e2e2e7] border-[1px] px-3 py-2 rounded-2xl text-sm font-normal"
          onClick={() => {
            const filteredRest = listOfRestaurants.filter(
              (res) => res?.info?.veg === true
            );
            setFilteredRestaurant(filteredRest);
            toast.success("Showing Pure Veg Restaurants");
          }}
        >
          Pure Veg
        </button>
        <button
          className="text-black bg-white border-[#e2e2e7] border-[1px] px-3 py-2 rounded-2xl text-sm font-normal"
          onClick={() => {
            const filteredRest = listOfRestaurants.filter(
              (res) => res?.info?.sla?.deliveryTime <= 25
            );
            setFilteredRestaurant(filteredRest);
            toast.success("Fast Delivery Restaurants Displayed");
          }}
        >
          Fast Delivery
        </button>
        <button
          className="text-black bg-white border-[#e2e2e7] border-[1px] px-3 py-2 rounded-2xl text-sm font-normal"
          onClick={() => {
            const filteredRest = listOfRestaurants.filter((res) => {
              const costForTwo = parseInt(
                res?.info?.costForTwo
                  .replace("₹", "")
                  .replace(" for two", "")
                  .trim()
              );
              return costForTwo <= 300;
            });
            setFilteredRestaurant(filteredRest);
            toast.success("Budget-Friendly Restaurants Displayed");
          }}
        >
          Less than ₹300
        </button>
        <button
          className="text-black bg-white border-[#e2e2e7] border-[1px] px-3 py-2 rounded-2xl text-sm font-normal"
          onClick={() => {
            const filteredRest = listOfRestaurants.filter((res) => {
              const costForTwo = parseInt(
                res?.info?.costForTwo
                  .replace("₹", "")
                  .replace(" for two", "")
                  .trim()
              );
              return costForTwo > 300 && costForTwo <= 600;
            });
            setFilteredRestaurant(filteredRest);
            toast.success("Discover Dining Deals: ₹300 - ₹600");
          }}
        >
          Range: ₹300 - ₹600
        </button>
        {/* <div className="search m-4 p-4 flex items-center">
         <label>User Name : </label>
         <input 
         className="border border-black ml-1 px-2"
         value={loggedInUser}
         onChange={(e)=>setUserName(e.target.value)}
         />
        </div> */}
      </div>
      <h1 className=" font-bold text-3xl ml-4 mb-5">
        Top restaurant chains in Mumbai
      </h1>
      <div className="flex flex-wrap ml-4">
        {filteredRestaurant.map((res) => (
          <Link to={"/restaurants/" + res.info.id} key={res.info.id}>
            {res?.info?.aggregatedDiscountInfoV3?.header ? (
              <HeaderResCard resData={res} />
            ) : (
              <RestaurantCard resData={res} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
