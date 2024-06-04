import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex, resInfo }) => {

  const handleClick = () => {
    setShowIndex();
  };
  
  return (
    <div>
      {/* Header */}
      <div className="my-4 bg-gray-50 shadow-lg p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>
        {/* <ItemList items={data.itemCards} /> */}
        {showItems && <ItemList resInfo={resInfo} items={data.itemCards}/>}
      </div>
    </div>
  );
};

export default RestaurantCategory;