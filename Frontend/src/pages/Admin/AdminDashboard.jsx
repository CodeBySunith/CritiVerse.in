import React, { useEffect, useState } from 'react';
import { ReviewCountAPI, GameCountAPI, UserCountAPI, AddGameFromRAWGAPI} from '../../api/AdminAPI'; 
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ManageGamesView from '../../components/Admin/ManageGamesView';
import ManageUsersView from '../../components/Admin/ManageUsersView';
import ManageReportsView from '../../components/Admin/ManageReportsView';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userscount, setUserscount] = useState(0);
  const [reviewcount, setReviewcount] = useState(0);
  const [gamecount, setGamecount] = useState(0);

  const [rawgId, setRawgId] = useState("");
  const [importLoading, setImportLoading] = useState(false);
  const [importMessage, setImportMessage] = useState({ text: "", type: "" }); 

  useEffect(() => {
    const getData = async () => {
      try {
        const [ReviewcountData, GamecountData, UsercountData] = await Promise.all([
          ReviewCountAPI(),
          GameCountAPI(),
          UserCountAPI(),
        ]);

        if (ReviewcountData && ReviewcountData.Reviewcount) setReviewcount(ReviewcountData.Reviewcount);
        if (GamecountData && GamecountData.Gamecount) setGamecount(GamecountData.Gamecount);
        if (UsercountData && UsercountData.Usercount) setUserscount(UsercountData.Usercount);
      } catch (error) {
        console.error("Error fetching page layout data:", error);
      }
    };
    getData();
  }, []);

  const handleFetchAndSave = async (e) => {
    e.preventDefault();
    setImportMessage({ text: "", type: "" });

    if (!rawgId.trim()) {
      setImportMessage({ text: "Please enter a valid RAWG Game ID first.", type: "error" });
      return;
    }

    setImportLoading(true);
    try {
      const res = await AddGameFromRAWGAPI(rawgId.trim());

      if (res && (res.details || res.message === "Game successfully imported from RAWG.")) {
        setImportMessage({ text: res.message || "Game successfully saved to database!", type: "success" });
        setRawgId(""); 
        setGamecount(prev => prev + 1);
      } else {
        setImportMessage({ text: res.message || res.msg || "Failed to import game.", type: "error" });
      }
    } catch (err) {
      console.error("RAWG Import Network failure:", err);
      setImportMessage({ text: "Server error occurred. Please check network logs.", type: "error" });
    } finally {
      setImportLoading(false);
    }
  };

  const getTabClass = (tabName) => {
  return `
    whitespace-nowrap
    text-left
    p-3
    rounded
    font-bold
    transition-colors
    duration-200
    ${
      activeTab === tabName
        ? 'bg-[#00e6e6] text-[#1a1e24]'
        : 'text-[#b3b3b3] hover:text-white'
    }
  `;
};

  return (
  <div>
    <Navbar />

    <div className="flex flex-col lg:flex-row min-h-screen bg-bgclr text-white font-sans">

      <div
        className=" w-full lg:w-64 bg-navbgclr p-4 lg:p-6 flex lg:flex-col flex-row gap-2 overflow-x-auto border-b lg:border-b-0 lg:border-r border-white/10">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`${getTabClass('dashboard')} min-w-fit`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab('addGames')}
          className={`${getTabClass('addGames')} min-w-fit`}
        >
          Add Games
        </button>

        <button
          onClick={() => setActiveTab('manageGames')}
          className={`${getTabClass('manageGames')} min-w-fit`}
        >
          Manage Games
        </button>

        <button
          onClick={() => setActiveTab('manageUsers')}
          className={`${getTabClass('manageUsers')} min-w-fit`}
        >
          Manage Users
        </button>

        <button
          onClick={() => setActiveTab('manageReports')}
          className={`${getTabClass('manageReports')} min-w-fit`}
        >
          Manage Reports
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">

        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">

          {activeTab === 'dashboard' && (
            <div className="animate-fade-in space-y-6">

              <h1 className="text-2xl md:text-3xl font-bold">
                Overview
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                <div className="bg-navbgclr p-6 rounded-xl border border-white/10 ">
                  <h3 className="text-[#b3b3b3] text-sm mb-2">
                    Total Users
                  </h3>

                  <p className="text-3xl font-bold text-[#00e6e6]">
                    {userscount}
                  </p>
                </div>

                <div className="bg-navbgclr p-6 rounded-xl border border-white/10 ">
                  <h3 className="text-[#b3b3b3] text-sm mb-2">
                    Games in Database
                  </h3>

                  <p className="text-3xl font-bold text-[#00e6e6]">
                    {gamecount}
                  </p>
                </div>

                <div className="bg-navbgclr p-6 rounded-xl border border-white/10 ">
                  <h3 className="text-[#b3b3b3] text-sm mb-2">
                    Number of Reviews
                  </h3>

                  <p className="text-3xl font-bold text-[#00e6e6]">
                    {reviewcount}
                  </p>
                </div>

              </div>

            </div>
          )}

          {activeTab === 'addGames' && (
            <div className="animate-fade-in space-y-">

              <h1 className="text-2xl md:text-3xl font-bold">
                Add a New Game
              </h1>

              <div
                className="bg-navbgclr p-6 rounded-xl max-w-xl mt-20 mx-auto"
              >
                <p className="text-[#b3b3b3] mb-4">
                  Enter a RAWG Game ID to fetch and add to the database.
                </p>

                <form
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={handleFetchAndSave}
                >
                  <input
                    type="number"
                    value={rawgId}
                    onChange={(e) => setRawgId(e.target.value)}
                    disabled={importLoading}
                    className=" flex-1 bg-[#1a1a1a] border border-[#333]  p-3 rounded-lg text-white outline-none focus:border-[#00e6e6]"
                  />

                  <button
                    type="submit"
                    disabled={importLoading}
                    className="bg-[#00e6e6] text-[#1a1e24] font-bold px-5 py-3 rounded-lg transition-all duration-300 hover:opacity-90 disabled:bg-gray-500"
                  >
                    {importLoading ? "Fetching..." : "Fetch & Save"}
                  </button>
                </form>

                {importMessage.text && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-sm font-semibold ${
                      importMessage.type === "success"
                        ? "bg-green-500/20 border border-green-500 text-green-400"
                        : "bg-red-500/20 border border-red-500 text-red-400"
                    }`}
                  >
                    {importMessage.text}
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === 'manageGames' && (
            <div className="animate-fade-in space-y-6">

              <h1 className="text-2xl md:text-3xl font-bold">
                Manage Games Database
              </h1>

              <ManageGamesView />

            </div>
          )}

          {activeTab === 'manageUsers' && (
            <div className="animate-fade-in space-y-6">

              <h1 className="text-2xl md:text-3xl font-bold">
                User Management
              </h1>

              <ManageUsersView />

            </div>
          )}

          {activeTab === 'manageReports' && (
            <div className="animate-fade-in space-y-6">

              <h1 className="text-2xl md:text-3xl font-bold">
                Manage Review Reports
              </h1>

              <ManageReportsView />

            </div>
          )}

        </div>

      </div>

    </div>

    <Footer />
  </div>
);
};

export default AdminDashboard;