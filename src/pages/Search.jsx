import React, { useEffect, useState } from "react";
import { GifSate } from "../context/GifContext";
import { useParams } from "react-router-dom";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

const SearchPage = () => {
  const [seachResult, setSearchResult] = useState([]);
  const { gf, filters } = GifSate();
  const { query } = useParams();
  const fetchSearchedGifs = async () => {
    const {data} = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filters,
      limit: 20,
    });
    setSearchResult(data);
  };
  useEffect(() => {
    fetchSearchedGifs();
  }, [filters,query]);
  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterGif alignLeft={true} />
      {seachResult.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {seachResult.map((gif) => {
            return <Gif gif={gif} key={gif.id} />;
          })}
        </div>
      ) : (
        <span>No Gifs Found for ${query}</span>
      )}
    </div>
  );
};

export default SearchPage;
