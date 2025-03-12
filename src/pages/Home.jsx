import React, { useEffect } from "react";
import { GifSate } from "../context/GifContext";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

const Home = () => {
  const { gf, gifs, filters, favorites, setGifs } = GifSate();
  const fetchTrendingGifs = async () => {
    const { data } = await gf.trending({
      limit: 20,
      type: filters,
      rating: "g",
    });
    setGifs(data);
  };
  useEffect(() => {
    fetchTrendingGifs();
  }, [filters]);
  return (
    <div>
      <img
        src="/banner.gif"
        alt="banner-logo"
        className="w-full mt-2 rounded "
      />
      <FilterGif showTrending alignLeft/>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif)=>{
          return <Gif gif={gif}/>
        })}
      </div>
    </div>
  );
};

export default Home;
