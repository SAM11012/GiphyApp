import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./layouts/Applayout";
import Home from "./pages/Home";
import GifPage from "./pages/Single-Gif";
import Category from "./pages/Category";
import SearchPage from "./pages/Search";
import Favorites from "./pages/Favorites";
import GifProvider from "./context/GifContext";

function App() {
  const router = createBrowserRouter([
    {
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:type/:slug",
          element: <GifPage />,
        },
        {
          path: "/:category",
          element: <Category />,
        },
        {
          path: "/search/:query",
          element: <SearchPage />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
      ],
    },
  ]);

  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
