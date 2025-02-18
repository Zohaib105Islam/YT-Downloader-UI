import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { FaBars } from "react-icons/fa";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Replace 'localhost:8080' with your Railway API URL
  const API_URL = "http://localhost:8080"; // <-- Your localhost API URL
  //const API_URL = "https://youtube-api-production-1240.up.railway.app"; // <-- Your Railway API URL

  const fetchVideoDetails = async () => {
    setError("");
    setVideoData(null);

    try {
      const response = await axios.get(`${API_URL}/api/youtube/video`, {
        params: { url: videoUrl },
      });

      if (response.data.items?.length > 0) {
        setVideoData(response.data.items);
      } else {
        setError("No video found.");
      }
    } catch (err) {
      setError("Failed to fetch video details.");
    }
  };

  const downloadFile = async (format, videoUrl, fileName) => {
    setError("");

    try {
      const response = await axios.get(`${API_URL}/api/youtube/download`, {
        params: { url: videoUrl, format, fileName },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: format === "audio" ? "audio/mp3" : "video/mp4" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName; // Use the provided filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError("Failed to download file.");
    }
  };

  function sanitizeFileName(fileName) {
    const invalidCharsRegex = /[\\/:*?"<>|\s]/g;
    return fileName.replace(invalidCharsRegex, "_").replace(/^_+|_+$/g, "");
  }

  return (
    <div>
      <div className="topbar">
        <img src="/logoYT.png" alt="Logo" className="logo" />
        <FaBars className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
        <nav className={`menu ${menuOpen ? "open" : ""}`}>
          <a href="#home" className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
            Home
          </a>
          <a href="#email" className={activeTab === "email" ? "active" : ""} onClick={() => setActiveTab("email")}>
            Email
          </a>
          <a href="#contact" className={activeTab === "contact" ? "active" : ""} onClick={() => setActiveTab("contact")}>
            Contact
          </a>
        </nav>
      </div>

      <div className="container">
        <h1>YT Downloader</h1>
        <input
          type="text"
          placeholder="Enter YouTube Link"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button onClick={fetchVideoDetails}>Start</button>

        {error && <p className="error">{error}</p>}

        {videoData && (
          <div className="video-details">
            {Array.isArray(videoData) ? (
              videoData.map((video, index) => {
                const videoId = video.snippet.resourceId?.videoId || video.id; // Handle missing resourceId
                console.log(`Video Id ${videoId}`)
                const sanitizedTitle = sanitizeFileName(video.snippet.title);
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                return (
                  <div key={index} className="video-item">
                    <h2>{video.snippet.title}</h2>
                    <img src={video.snippet.thumbnails?.high?.url} alt={video.snippet.title} />
                    <div className="download-buttons">
                      <button className="audio-btn" onClick={() => downloadFile("audio", videoUrl, `Y2Mate-${sanitizedTitle}-${Date.now()}.mp3`)}>
                        Download Audio
                      </button>
                      <button className="video-btn" onClick={() => downloadFile("video360p", videoUrl, `Y2Mate-${sanitizedTitle}-${Date.now()}.mp4`)}>
                        Download 360p
                      </button>
                      <button className="video-btn" onClick={() => downloadFile("video720p", videoUrl, `Y2Mate-${sanitizedTitle}-${Date.now()}.mp4`)}>
                        Download 720p
                      </button>
                      <button className="video-btn" onClick={() => downloadFile("video1080p", videoUrl, `Y2Mate-${sanitizedTitle}-${Date.now()}.mp4`)}>
                        Download 1080p
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="video-item">
                <h2>{videoData.snippet.title}</h2>
                <img src={videoData.snippet.thumbnails?.high?.url} alt={videoData.snippet.title} />
                <div className="download-buttons">
                  <button className="audio-btn" onClick={() => downloadFile("audio", videoUrl, `Y2Mate-${sanitizeFileName(videoData.snippet.title)}-${Date.now()}.mp3`)}>
                    Download Audio
                  </button>
                  <button className="video-btn" onClick={() => downloadFile("video360p", videoUrl, `Y2Mate-${sanitizeFileName(videoData.snippet.title)}-${Date.now()}.mp4`)}>
                    Download 360p
                  </button>
                  <button className="video-btn" onClick={() => downloadFile("video720p", videoUrl, `Y2Mate-${sanitizeFileName(videoData.snippet.title)}-${Date.now()}.mp4`)}>
                    Download 720p
                  </button>
                  <button className="video-btn" onClick={() => downloadFile("video1080p", videoUrl, `Y2Mate-${sanitizeFileName(videoData.snippet.title)}-${Date.now()}.mp4`)}>
                    Download 1080p
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;





// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";
// import { FaBars } from "react-icons/fa";

// const App = () => {
//   const [videoUrl, setVideoUrl] = useState("");
//   const [videoData, setVideoData] = useState(null);
//   const [error, setError] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("home");

//   const fetchVideoDetails = async () => {
//     setError("");
//     setVideoData(null);

//     try {
//       const response = await axios.get(`http://localhost:8080/api/youtube/video`, {
//         params: { url: videoUrl },
//       });

//       if (response.data.items?.length > 0) {
//         setVideoData(response.data.items);
//       } else {
//         setError("No video found.");
//       }
//     } catch (err) {
//       setError("Failed to fetch video details.");
//     }
//   };

//   const downloadFile = async (format, videoUrl, fileName) => {
//     setError("");

//     try {
//       const response = await axios.get(`http://localhost:8080/api/youtube/download`, {
//         params: { url: videoUrl, format, fileName },
//         responseType: "blob",
//       });

//       const blob = new Blob([response.data], { type: format === "audio" ? "audio/mp3" : "video/mp4" });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = fileName; // Use the provided filename
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (err) {
//       setError("Failed to download file.");
//     }
//   };

//   function sanitizeFileName(fileName) {
//     const invalidCharsRegex = /[\\/:*?"<>|\s]/g;
//     return fileName.replace(invalidCharsRegex, "_").replace(/^_+|_+$/g, "");
//   }

//   return (
//     <div>
//       <div className="topbar">
//         <img src="/logoYT.png" alt="Logo" className="logo" />
//         <FaBars className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
//         <nav className={`menu ${menuOpen ? "open" : ""}`}>
//           <a href="#home" className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
//             Home
//           </a>
//           <a href="#email" className={activeTab === "email" ? "active" : ""} onClick={() => setActiveTab("email")}>
//             Email
//           </a>
//           <a href="#contact" className={activeTab === "contact" ? "active" : ""} onClick={() => setActiveTab("contact")}>
//             Contact
//           </a>
//         </nav>
//       </div>

//       <div className="container">
//         <h1>YT Downloader</h1>
//         <input
//           type="text"
//           placeholder="Enter YouTube Video or Playlist Link"
//           value={videoUrl}
//           onChange={(e) => setVideoUrl(e.target.value)}
//         />
//         <button onClick={fetchVideoDetails}>Start</button>

//         {error && <p className="error">{error}</p>}

//         {videoData && (
//           <div className="video-details">
//             {Array.isArray(videoData) ? (
//               videoData.map((video, index) => {
//                 const videoId = video.snippet.resourceId?.videoId || video.id; // Handle missing resourceId
//                 console.log(`Video Id ${videoId}`)
//                 const sanitizedTitle = sanitizeFileName(video.snippet.title);
//                 const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

//                 return (
//                   <div key={index} className="video-item">
//                     <h2>{video.snippet.title}</h2>
//                     <img src={video.snippet.thumbnails?.high?.url} alt={video.snippet.title} />
//                     <div className="download-buttons">
//                       <button className="audio-btn" onClick={() => downloadFile("audio", videoUrl, `Y2Mate-${sanitizedTitle}-${Date.now()}.mp3`)}>
//                         Download Audio
//                       </button>
//                       <button className="video-btn" onClick={() => downloadFile("video360p", videoUrl, `Y2Mate-${sanitizedTitle}-${Date.now()}.mp4`)}>
//                         Download 360p
//                       </button>
//                       <button className="video-btn" onClick={() => downloadFile("video720p", videoUrl, `Y2Mate-${sanitizedTitle}-${Date.now()}.mp4`)}>
//                         Download 720p
//                       </button>
//                       <button className="video-btn" onClick={() => downloadFile("video1080p", videoUrl, `Y2Mate-${sanitizedTitle}-${Date.now()}.mp4`)}>
//                         Download 1080p
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="video-item">
//                 <h2>{videoData.snippet.title}</h2>
//                 <img src={videoData.snippet.thumbnails?.high?.url} alt={videoData.snippet.title} />
//                 <div className="download-buttons">
//                   <button className="audio-btn" onClick={() => downloadFile("audio", videoUrl, `Y2Mate-${sanitizeFileName(videoData.snippet.title)}-${Date.now()}.mp3`)}>
//                     Download Audio
//                   </button>
//                   <button className="video-btn" onClick={() => downloadFile("video360p", videoUrl, `Y2Mate-${sanitizeFileName(videoData.snippet.title)}-${Date.now()}.mp4`)}>
//                     Download 360p
//                   </button>
//                   <button className="video-btn" onClick={() => downloadFile("video720p", videoUrl, `Y2Mate-${sanitizeFileName(videoData.snippet.title)}-${Date.now()}.mp4`)}>
//                     Download 720p
//                   </button>
//                   <button className="video-btn" onClick={() => downloadFile("video1080p", videoUrl, `Y2Mate-${sanitizeFileName(videoData.snippet.title)}-${Date.now()}.mp4`)}>
//                     Download 1080p
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
