import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removefrompaste, updatetopaste } from "../redux/pasteSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Paste() {
  const [SearchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) =>
    paste.titel.toLowerCase().includes(SearchTerm.toLowerCase())
  );
  function handeDelete(pasteId) {
    dispatch(removefrompaste(pasteId));
  }
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const shareUrl = "https://example.com"; // Replace with your shareable link


  return (
    <div className="flex flex-col ">
      <input
        type="search"
        className="p-2 rounded-2xl min-w-[500px] mt-8 mx-auto"
        value={SearchTerm}
        placeholder="Search Here"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mx-auto">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="border-slate-600 border-4 p-2 mt-5 rounded-2xl  flex flex-col items-center"
                key={paste?._id}
              >
                <div>{paste.titel}</div>
                <div className="">{paste.content}</div>
                <div className="flex flex-row justify-around mt-2 gap-8">
                  <div className="border-2 p-1 rounded-md border-slate-900 ">
                    <button>
                      <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                    </button>
                  </div>
                  <div className="border-2 p-1 rounded-md border-slate-900 ">
                    <button onClick={() => handeDelete(paste?._id)}>
                      Delete
                    </button>
                  </div>
                  <div className="border-2 p-1 rounded-md border-slate-900 ">
                    <button>
                      <Link to={`/pastes/${paste?._id}`}>View</Link>
                    </button>
                  </div>
                  <div className="border-2 p-1 rounded-md border-slate-900 ">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast("Copied to ClipBoard");
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  
                    <div>
                      {/* Share Button */}
                      <div className="border-2 p-1 rounded-md border-slate-900">
                        <button onClick={() => setIsPopupOpen(true)}>
                          Share
                        </button>
                      </div>

                      {/* Popup Window */}
                      {isPopupOpen && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ">
                          <div className="bg-white rounded-lg p-4 shadow-lg w-80 hover:border-slate-600 hover:border-4 ">
                            <h3 className="text-xl font-bold mb-4">Share</h3>
                            <ul className=" flex flex-row justify-evenly">
                              <li>
                                <a
                                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  Facebook
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:underline"
                                >
                                  Twitter
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`https://www.linkedin.com/shareArticle?url=${shareUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-700 hover:underline"
                                >
                                  LinkedIn
                                </a>
                              </li>
                            </ul>
                            
                            <button
                              onClick={() => setIsPopupOpen(false)}
                              className="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                
                <div className="mt-2">
                  {(() => {
                    const datetimemonth = paste.createdAt;
                    const date = new Date(datetimemonth);
                    const day = date.getDate();
                    const month = date.toLocaleString("default", {
                      month: "long",
                    });
                    const year = date.getFullYear();
                    const time = date.toLocaleTimeString();

                    return (
                      <div>
                        <p>Date: {`${day} ${month} ${year}`}</p>
                        <p>Time: {time}</p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
