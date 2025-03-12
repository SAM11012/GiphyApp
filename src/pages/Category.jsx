import React, { useEffect, useState } from "react";
import { GifSate } from "../context/GifContext";
import { useParams } from "react-router-dom";
import Gif from "../components/Gif";
import SocialMedia from "../components/SocialMedia";

const Category = () => {
  const [seachResult, setSearchResult] = useState([]);
  const { gf } = GifSate();
  const { category } = useParams();
  const fetchCategoryResult = async () => {
    const { data } = await gf.gifs(category, category);
    setSearchResult(data);
  };
  useEffect(() => {
    fetchCategoryResult();
  }, [category]);
  console.log(seachResult, "the search result");
  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {seachResult.length > 0 && <Gif gif={seachResult[0]} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <SocialMedia />
        <div className="w-full h-0.5 mt-6 bg-gray-800" />
      </div>
      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {seachResult.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {seachResult.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
