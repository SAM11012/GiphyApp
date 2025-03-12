import React, { useEffect, useState } from "react";
import { GifSate } from "../context/GifContext";
import Gif from "../components/Gif";

const Favorites = () => {
  const { favorites, gf } = GifSate();
  const [gifFav, setGIFFav] = useState([]);
  const FAVGIF = async () => {
    const { data } = await gf.gifs(favorites);
    setGIFFav(data);
  };
  useEffect(() => {
    FAVGIF();
  }, [favorites]);
  return (
    <div className="mt-2">
      <span className="font-bold text-sm text-gray-400">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {gifFav.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
