import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifSate } from "../context/GifContext";
import GifSearch from "./GifSearch";
const Header = () => {
  const [categories, setCatergories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const { gf, gifs, filters, favorites } = GifSate();
  const fetchCategories = async () => {
    const response = await gf.categories();
    console.log(response);
    setCatergories(response.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="./logo.svg" alt="logo" className="w-8" />
          <h1 className="text-5xl font-bold cursor-pointer tracking-tight">
            GIPHY
          </h1>
        </Link>
        <div className="font-bold flex text-md gap-2 items-center">
          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link
                key={category.name}
                to={`/${category.name_encoded}`}
                className="px-4 py-1 hover:bg-gradient-to-r from-teal-600 via-blue-600 to-pink-600 border-b-4 hidden lg:block"
              >
                {category?.name}
              </Link>
            );
          })}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:${
                showCategories
                  ? "bg-gradient-to-r from-teal-600 via-blue-600 to-pink-600"
                  : ""
              } border-b-4 hidden lg:block cursor-pointer`}
            />
          </button>
          {favorites.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favorites">Favorite Gifs</Link>
            </div>
          )}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden"
              size={30}
            />
          </button>
        </div>

        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full bg-gradient-to-r from-teal-600 via-blue-600 to-pink-600 z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => {
                return (
                  <Link
                    className="font-bold"
                    key={category.name}
                    to={`/${category.name_encoded}`}
                    onClick={()=>setShowCategories(!showCategories)}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* gif Search */}
      <GifSearch/>
    </nav>
  );
};

export default Header;
