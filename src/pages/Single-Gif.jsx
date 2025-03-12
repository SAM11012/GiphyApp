import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifSate } from "../context/GifContext";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import SocialMedia from "../components/SocialMedia";
import Gif from "../components/Gif";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";
const contentType = ["gifs", "stickers", "texts"];
import { ImDownload } from "react-icons/im";

import { FaShareAlt, FaWhatsapp, FaInstagram, FaLink } from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Stack,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { downloadGif } from "../helper";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light blue
    },
    secondary: {
      main: "#f48fb1", // Pink
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e", // Darker modal background
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
});
const GifPage = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGif, setRelatedGif] = useState([]);
  const [readmore, setReadmore] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { gf, favorites, AddtoFavorites } = GifSate();
  const current_url = window.location.href;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(current_url);
    alert("Link copied to clipboard!");
  };
  const getGifData = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGif(related);
  };
  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }

    getGifData();
  }, [type, slug]);
  console.log(gif, "the gif");
  return (
    <>
      <div className="grid grid-cols-4 my-10 gap-4">
        <div className="hidden sm:block">
          {gif?.user && (
            <>
              <div className="flex gap-1">
                <img
                  src={gif?.user?.avatar_url}
                  alt={gif?.user?.display_name}
                  className="h-14"
                />
                <div className="px-2">
                  <div className="font-bold">{gif?.user?.display_name}</div>
                  <div className="font-bold text-sm text-gray-400">
                    @{gif?.user?.username}
                  </div>
                </div>
              </div>
              {gif?.user?.description && (
                <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                  {readmore
                    ? gif?.user?.description
                    : gif?.user?.description.slice(0, 100) + "..."}
                  <div
                    className="flex items-center font-bold text-sm text-gray-400 cursor-pointer"
                    onClick={() => setReadmore(!readmore)}
                  >
                    {readmore ? (
                      <>
                        Read less <HiMiniChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        Read more <HiMiniChevronDown size={20} />
                      </>
                    )}
                  </div>
                </p>
              )}
            </>
          )}
          <SocialMedia />

          <div className="w-full h-0.5 my-6 bg-gray-800" />

          {gif?.source && (
            <div>
              <span
                className="font-bold text-sm text-gray-400" //custom - faded-text
              >
                Source
              </span>
              <div className="flex items-center text-sm font-bold gap-1">
                <HiOutlineExternalLink size={25} />
                <a href={gif.source} target="_blank" className="truncate">
                  {gif.source}
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-4 sm:col-span-3">
          <div className="flex gap-6">
            <div className="w-full sm:w-3/4">
              <div className="font-bold text-sm text-gray-400 truncate mb-2">
                {gif.title}
              </div>
              <Gif gif={gif} hover={false} />

              {/* -- Mobile UI -- */}
              <div className="flex sm:hidden gap-1">
                <img
                  src={gif?.user?.avatar_url}
                  alt={gif?.user?.display_name}
                  className="h-14"
                />
                <div className="px-2">
                  <div className="font-bold">{gif?.user?.display_name}</div>
                  <div className="font-bold text-sm text-gray-400">
                    @{gif?.user?.username}
                  </div>
                </div>

                <button className="ml-auto" onClick={() => {}}>
                  <FaPaperPlane size={25} />
                </button>
              </div>
              {/* -- Mobile UI -- */}
            </div>

            <div className="hidden sm:flex flex-col gap-5 mt-6 ">
              <button
                onClick={() => {
                  AddtoFavorites(gif.id);
                }}
                className="flex gap-5 items-center font-bold text-lg cursor-pointer"
              >
                <HiMiniHeart
                  size={30}
                  className={`${
                    favorites.includes(gif.id) ? "text-red-500" : ""
                  } hover:scale-125 transition-transform duration-200 `}
                />
                Favorite
              </button>
              <button
                onClick={() => setOpenModal(true)} // Assignment
                className="flex gap-6 items-center font-bold text-lg cursor-pointer"
              >
                <FaPaperPlane
                  size={25}
                  className="hover:scale-125 transition-transform duration-200"
                />
                Share
              </button>
              <button
                onClick={() => {
                  downloadGif(gif);
                }} // Assignment
                className="flex gap-5 items-center font-bold text-lg cursor-pointer "
              >
                <ImDownload
                  size={30}
                  className="hover:scale-125 transition-transform duration-200"
                />
                Download
              </button>
            </div>
          </div>

          <div>
            <span className="font-extrabold">Related GIFs</span>
            <div className="columns-2 md:columns-3 gap-2">
              {relatedGif.slice(1).map((gif) => (
                <Gif gif={gif} key={gif.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ThemeProvider theme={darkTheme}>
        {" "}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "background.paper",
              color: "text.primary",
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle>
            Share
            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "text.primary",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {/* WhatsApp Share */}
              <Button
                variant="contained"
                startIcon={<WhatsAppIcon />}
                color="success"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  current_url
                )}`}
                target="_blank"
              >
                Share on WhatsApp
              </Button>

              {/* Instagram Share */}
              <Button
                variant="contained"
                startIcon={<InstagramIcon />}
                color="secondary"
                href="https://www.instagram.com/"
                target="_blank"
              >
                Share on Instagram
              </Button>

              {/* Copy Link */}
              <Button
                variant="contained"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopyLink}
              >
                Copy Link
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default GifPage;
