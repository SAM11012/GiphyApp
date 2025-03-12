import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
const GifContext = createContext();
const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filters, setFilters] = useState("gifs");
  const [favorites, setFavorites] = useState([]);
  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);
  console.log(gf, "the following");
  const AddtoFavorites = (id) => {
    if (favorites.includes(id)) {
      const updatedFav = favorites.filter((item) => item !== id);
      setFavorites(updatedFav);
      localStorage.setItem("favoritesGif", JSON.stringify(updatedFav));
    } else {
      const updatedFav = [...favorites, id];
      setFavorites(updatedFav);
      localStorage.setItem("favoritesGif", JSON.stringify(updatedFav));
    }
  };
  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favoritesGif")) || [];
    setFavorites(fav);
  }, []);
  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        filters,
        favorites,
        setGifs,
        setFilters,
        setFavorites,
        AddtoFavorites
      }}
    >
      {children}
    </GifContext.Provider>
  );
};
export const GifSate = () => {
  return useContext(GifContext);
};
export default GifProvider;
