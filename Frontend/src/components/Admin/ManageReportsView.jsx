import React, { useEffect, useState } from "react";
import { GetAllReviewReportsAPI } from "../../api/AdminAPI";

const ManageReportsView = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(1);

  const fetchReports = async () => {
    setLoading(true);

    const data = await GetAllReviewReportsAPI(page);

    if (data && Array.isArray(data.reports)) {
      setReports(data.reports);
      setTotalpage(data.totalpages || 1);
    } else {
      setReports([]);
      setTotalpage(1);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [page]);

  if (loading) {
    return (
      <div className="text-[#00e6e6] font-bold p-4 bg-navbgclr rounded-lg border border-[#333] animate-pulse">
        Loading reports...
      </div>
    );
  }

  return (
    <div>

      {/* TABLE VIEW */}
      <div className="hidden md:block bg-navbgclr rounded-lg border border-[#333] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-[#1a1e24]">
              <tr className="text-sm text-[#b3b3b3] uppercase">
                <th className="p-4">Reporter</th>
                <th className="p-4">Review Owner</th>
                <th className="p-4">Game</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Review</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No reports found
                  </td>
                </tr>
              ) : (
                reports.map((r) => (
                  <tr key={r._id} className="border-b border-[#333]">

                    <td className="p-4 text-white font-bold">
                      @{r.reporterId?.username || "Unknown"}
                    </td>

                    <td className="p-4 text-gray-300">
                      @{r.reviewId?.userid?.username || "Deleted User"}
                    </td>

                    <td className="p-4 text-gray-400">
                      {r.reviewId?.gameid?.title || "Deleted Game"}
                    </td>

                    <td className="p-4 text-gray-400">
                      {r.reason}
                    </td>

                    <td className="p-4 text-gray-500 max-w-xs">
                      {r.reviewId?.review?.slice(0, 80) || "No review"}
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-1 text-xs rounded font-bold bg-yellow-500/10 text-yellow-400">
                        Pending
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-4">

        {reports.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            No reports found
          </div>
        ) : (
          reports.map((r) => (
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
                    Reported @{r.reviewId?.userid?.username || "Deleted User"}
                  </p>

                  <p className="text-[#00e6e6] text-sm mt-1">
                    {r.reviewId?.gameid?.title || "Deleted Game"}
                  </p>
                </div>

                <span className="px-2 py-1 text-xs rounded font-bold bg-yellow-500/10 text-yellow-400">
                  Pending
                </span>

              </div>

              <div className="mt-3">
                <p className="text-red-400 text-sm font-semibold">Reason:</p>
                <p className="text-gray-300 text-sm">{r.reason}</p>
              </div>

              <div className="mt-3">
                <p className="text-white text-sm font-semibold">Review:</p>
                <p className="text-gray-400 text-sm">
                  {r.reviewId?.review || "No review"}
                </p>
              </div>

            </div>
          ))
        )}

      </div>

      {/* PAGINATION */}
      <div className="flex gap-4 items-center justify-center mt-4">

        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-transparent border border-[#00e6e6] text-[#00e6e6] px-5 py-2 rounded font-bold disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-white text-xl font-extrabold">
          {page}
        </span>

        <button
          disabled={page === totalpage}
          onClick={() => setPage((p) => p + 1)}
          className="bg-transparent border border-[#00e6e6] text-[#00e6e6] px-5 py-2 rounded font-bold disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default ManageReportsView;