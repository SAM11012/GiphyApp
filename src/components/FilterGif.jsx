import React from "react";
import { GifSate } from "../context/GifContext";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
const MainFilter = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];
const FilterGif = ({ alignLeft = false, showTrending = false }) => {
  const { filters, setFilters } = GifSate();

  return (
    <div
      className={`flex my-3 gap-3 ${alignLeft ? "" : "justify-end"} ${
        showTrending
          ? "flex-col sm:flex-row sm:items-center justify-between "
          : ""
      }`}
    >
      {showTrending && (
        <span className="flex gap-2">
          {showTrending && (
            <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
          )}
          <span className="font-semibold text-gray-400">Trending</span>
        </span>
      )}
      <div className="flex min-w-80 rounded-full bg-gray-800">
        {MainFilter?.map((f) => {
          return <span
          onClick={()=>setFilters(f.value)}
          className={`${filters==f.value?f.background:""} font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer`}
          >{f.title}</span>;
        })}
      </div>
    </div>
  );
};

export default FilterGif;
