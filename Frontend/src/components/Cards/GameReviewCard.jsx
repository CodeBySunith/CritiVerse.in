import React from "react";
import { FaStar } from "react-icons/fa6";
import { MdOutlineReport } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  ReportReviewAPI,
  CheckReportAPI,
} from "../../api/ReviewAPI";

const REPORT_REASONS = [
  "Spam",
  "Hate speech",
  "Harassment",
  "Fake information",
  "Off-topic",
];

const GameReviewCard = ({ review }) => {
  const [openReport, setOpenReport] = React.useState(false);
  const [selectedReason, setSelectedReason] = React.useState("");
  const [reported, setReported] = React.useState(false);

  React.useEffect(() => {
    const check = async () => {
      const res = await CheckReportAPI(review._id);
      if (res?.reported) setReported(true);
    };

    check();
  }, [review._id]);

  const handleSubmitReport = async () => {
    if (!selectedReason) return;

    const res = await ReportReviewAPI(review._id, selectedReason);

    if (res?.msg === "Reported successfully") {
      setReported(true);
      setOpenReport(false);
      alert("Reported successfully");
    } else {
      alert(res?.msg || "Already reported or failed");
    }
  };

  if (!review) return null;

  return (
    <div className="flex flex-col max-w-full bg-navbgclr p-4 rounded-lg border border-white/5 shadow-md mb-4">

      {review.rating && (
        <div className="flex items-center gap-1 my-2">
          {[...Array(10)].map((_, index) => (
            <FaStar
              key={index}
              className={`text-[8px] md:text-xs ${
                index < review.rating
                  ? "text-[#00e6e6]"
                  : "text-neutral-700"
              }`}
            />
          ))}
        </div>
      )}

      <p className="text-sm text-secText font-light whitespace-pre-line">
        {review.review || "No review content provided."}
      </p>

      <hr className="border-neutral-800 my-3" />

      <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10"
              src={review.userid?.avatarURL}
              alt="avatar"
            />

            <div className="flex flex-col pt-1 pl-2">
              <h1 className="text-white text-sm md:text-base">
              @{review.userid?.username || "Anonymous"}
            </h1>
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
            
          </div>


        <button
          disabled={reported}
          onClick={() => setOpenReport(true)}
          className={`p-2 ${
            reported ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <MdOutlineReport className="text-2xl md:text-3xl hover:text-red-500" />
        </button>
      </div>

      {openReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-navbgclr p-4 rounded-lg w-80">

            <h2 className="text-white mb-3">Report Review</h2>

            {REPORT_REASONS.map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-2 text-sm text-white mb-2"
              >
                <input
                  type="radio"
                  name="report"
                  value={reason}
                  onChange={() => setSelectedReason(reason)}
                />
                {reason}
              </label>
            ))}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpenReport(false)}
                className="text-gray-300 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitReport}
                className="bg-black px-3 py-1 rounded text-red-600 text-sm  hover:bg-red-600 hover:text-black"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default GameReviewCard;