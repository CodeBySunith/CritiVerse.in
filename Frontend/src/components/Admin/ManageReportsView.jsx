import React, { useEffect, useState } from "react";
import {
  GetAllReviewReportsAPI,
  DeleteReportAPI,
  UpdateReportStatusAPI,
} from "../../api/AdminAPI";

import ReviewModal from "../Admin/ReviewModal";

const ManageReportsView = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(1);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    const data = await GetAllReviewReportsAPI(page);

    if (data?.reports) {
      setReports(data.reports);
      setTotalpage(data.totalpages || 1);
    } else {
      setReports([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [page]);

  const updateStatus = async (id, status) => {
    const res = await UpdateReportStatusAPI(id, status);
    if (!res?.report) return;

    setReports((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status } : r
      )
    );
  };

  const deleteReport = async (id) => {
    const res = await DeleteReportAPI(id);
    if (!res?.msg) return;

    setReports((prev) => prev.filter((r) => r._id !== id));
  };

  if (loading) {
    return (
      <div className="text-[#00e6e6] p-4 bg-navbgclr rounded-lg">
        Loading reports...
      </div>
    );
  }

  return (
    <div>

      <div className="hidden md:block bg-navbgclr rounded-lg border border-[#333] overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-[#1a1e24] text-sm text-gray-400">
            <tr>
              <th className="p-4">Reporter</th>
              <th className="p-4">Owner</th>
              <th className="p-4">Game</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Review</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r) => (
              <tr key={r._id} className="border-b border-[#333]">

                <td className="p-4 text-white">
                  @{r.reporterId?.username || "Unknown"}
                </td>

                <td className="p-4 text-gray-300">
                  @{r.reviewId?.userid?.username || "Deleted"}
                </td>

                <td className="p-4 text-gray-400">
                  {r.reviewId?.gameid?.title || "Unknown"}
                </td>

                <td className="p-4 text-gray-400">
                  {r.reason}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => setSelectedReview(r.reviewId)}
                    className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded"
                  >
                    View
                  </button>
                </td>

                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded ${
                    r.status === "resolved"
                      ? "text-green-400 bg-green-500/10"
                      : r.status === "rejected"
                      ? "text-red-400 bg-red-500/10"
                      : "text-yellow-400 bg-yellow-500/10"
                  }`}>
                    {r.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2 flex-wrap">

                  {r.status === "pending" ? (
                    <>
                      <button
                        onClick={() => updateStatus(r._id, "resolved")}
                        className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded"
                      >
                        Resolve
                      </button>

                      <button
                        onClick={() => updateStatus(r._id, "rejected")}
                        className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => deleteReport(r._id)}
                      className="text-xs px-2 py-1 bg-gray-500/20 text-gray-300 rounded"
                    >
                      Delete
                    </button>
                  )}

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <div className="md:hidden space-y-4">

        {reports.map((r) => (
          <div
            key={r._id}
            className="bg-navbgclr border border-[#333] rounded-lg p-4"
          >

            <div className="flex justify-between items-start">

              <div>
                <h3 className="text-white font-bold">
                  @{r.reporterId?.username || "Unknown"}
                </h3>

                <p className="text-gray-400 text-sm">
                  @{r.reviewId?.userid?.username || "Deleted"}
                </p>

                <p className="text-[#00e6e6] text-sm">
                  {r.reviewId?.gameid?.title || "Unknown Game"}
                </p>
              </div>

              <span className={`text-xs px-2 py-1 rounded ${
                r.status === "resolved"
                  ? "text-green-400 bg-green-500/10"
                  : r.status === "rejected"
                  ? "text-red-400 bg-red-500/10"
                  : "text-yellow-400 bg-yellow-500/10"
              }`}>
                {r.status}
              </span>

            </div>

            <p className="text-gray-400 text-sm mt-3">
              Reason: {r.reason}
            </p>

            <button
              onClick={() => setSelectedReview(r.reviewId)}
              className="mt-3 px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded"
            >
              View Review
            </button>

            <div className="mt-3 flex gap-2 flex-wrap">

              {r.status === "pending" ? (
                <>
                  <button
                    onClick={() => updateStatus(r._id, "resolved")}
                    className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded"
                  >
                    Resolve
                  </button>

                  <button
                    onClick={() => updateStatus(r._id, "rejected")}
                    className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => deleteReport(r._id)}
                  className="text-xs px-2 py-1 bg-gray-500/20 text-gray-300 rounded"
                >
                  Delete
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}

    </div>
  );
};

export default ManageReportsView;