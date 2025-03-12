import React from "react";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const SocialMedia = () => {
  return (
    <div
      className="font-bold text-sm text-gray-400 pt-2" //custom - faded-text
    >
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://www.youtube.com/roadsidecoder">
          <FaYoutube size={20} />
        </a>
        <a href="https://www.instagram.com/roadsidecoder">
          <FaInstagram size={20} />
        </a>
        <a href="https://www.twitter.com/piyush_eon">
          <FaXTwitter size={20} />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
