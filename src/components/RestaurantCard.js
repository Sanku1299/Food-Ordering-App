import React, { useContext } from 'react'
import { CDN_URL } from '../utils/constant';
import UserContext from '../utils/UserContext';

const RestaurantCard = ({resData}) => {
  // const {loggedInUser} = useContext(UserContext);

  const {name, cuisines, avgRating, cloudinaryImageId, sla, costForTwo} = resData?.info;

  return (
    <div className='m-4 p-4 w-[250px] h-[500px] rounded-lg bg-gray-100 hover:bg-gray-200'>
      <img 
      className='rounded-lg'
      src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating}⭐</h4>
      <h4>{sla?.slaString}</h4>
      <h4>{costForTwo}</h4>    
    </div>
  )
}

export const withHeader = (RestaurantCard) => {
  return ({ resData, ...restProps }) => {
    const {header, subHeader} = resData?.info?.aggregatedDiscountInfoV3;
    return (
      <div>
        <label className='absolute bg-black text-white m-2 p-2 rounded-lg'>
          {header} {subHeader}
        </label>
        <RestaurantCard resData={resData} {...restProps} />
      </div>
    );
  };
};


export default RestaurantCard