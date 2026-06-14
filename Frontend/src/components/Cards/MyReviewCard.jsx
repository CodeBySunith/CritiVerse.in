import React from "react";
import { FaStar } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const MyReviewCard = ({ review, onDelete }) => {
  if (!review) return null;

  return (
    <div className="flex flex-col max-w-full bg-navbgclr p-3 rounded-lg border border-white/5 shadow-md">

      {/* Rating + Review */}
      <div className="flex gap-4 pb-5">
        <div className="flex flex-col gap-y-1.5 p-2.5 w-full">

          <div className="flex items-center gap-1 my-2">
            {[...Array(10)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-xs ${
                  index < (review.rating || 0)
                    ? "text-[#00e6e6]"
                    : "text-neutral-700"
                }`}
              />
            ))}
          </div>

          <p className="line-clamp-4 text-sm text-secText font-light leading-relaxed">
            {review.review || "No review content provided."}
          </p>
        </div>
      </div>

      <hr className="border-neutral-800 mb-3" />

      {/* Footer */}
      <div className="flex justify-between items-center">

        {/* Date */}
        <div className="flex pt-1 pl-2">
          <p className="text-secText text-xs">
            {`${review.createdAt === review.updatedAt ? "Review added on" : "Review edited on"} ${
              review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recent"
            }`}
          </p>
        </div>

        {/* Delete Button */}
        <div className="flex gap-x-1.5 items-center">
          <button
            aria-label="Delete"
            onClick={() => onDelete(review.gameid)}
          >
            <MdDelete className="text-2xl md:text-3xl text-white hover:text-red-500 transition-colors" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyReviewCard;