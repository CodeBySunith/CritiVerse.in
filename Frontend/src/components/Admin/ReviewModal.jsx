import React from "react";
import { FaTimes } from "react-icons/fa";

const ReviewModal = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      
      <div className="bg-navbgclr w-[90%] md:w-130 rounded-lg p-4 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#00e6e6]"
        >
          <FaTimes />
        </button>

        <h2 className="text-white text-lg font-bold mb-3">
          Review Details
        </h2>

        <p className="text-sm text-gray-400 mb-2">
          User: <span className="text-white">
            @{review?.userid?.username || "Unknown"}
          </span>
        </p>

        <p className="text-sm text-gray-400 mb-2">
          Game: <span className="text-white">
            {review?.gameid?.title || "Unknown Game"}
          </span>
        </p>

        <p className="text-sm text-gray-400 mb-2">
          Rating: <span className="text-[#00e6e6]">
            {review?.rating ?? "N/A"}
          </span>
        </p>

        <div className="mt-3 p-3 bg-bgclr rounded text-gray-300 text-sm">
          {review?.review || "No review text"}
        </div>

      </div>
    </div>
  );
};

export default ReviewModal;