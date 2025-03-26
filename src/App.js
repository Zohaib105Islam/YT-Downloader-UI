import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { fetchVideoDetails, downloadFile } from "./helpers/videoHelper"; // Import the helper functions
import "./App.css";
import Footer from "./Footer";
import { FaBars, FaTimes, FaPaste } from "react-icons/fa";
import DownloadInstructions from "./DownloadInstructions";
import AllResources from "./AllResources";
import VideoDownloadSection from "./VideoDownloadSections";
import YouTubePage from "./YouTubePage";
import FacebookPage from "./FacebookPage";
import InstagramPage from "./InstagramPage";
import TikTokPage from "./TiktokPage";
import AboutUsPage from "./AboutUsPage";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pasteIcon, setPasteIcon] = useState(true);
  const [loading, setLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0); // New state for progress

  const handleFetchVideoDetails = async () => {
    setError("");
    setVideoData(null);
    setLoading(true);

    const result = await fetchVideoDetails(videoUrl);

    if (result.success) {
      setVideoData(result);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVideoUrl(text);
      setPasteIcon(false);
    } catch (err) {
      setError("Failed to paste from clipboard.");
    }
  };

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <header className="topbar">
                <div className="container">
                  <img
                    src="/logoYT.jpeg"
                    alt="Logo"
                    className="logo"
                    onClick={handleLogoClick}
                  />
                  <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
                  </div>
                </div>
                <nav className={`menu ${menuOpen ? "open" : ""}`}>
                  <Link to="/youtube">YouTube</Link>
                  <Link to="/facebook">Facebook</Link>
                  <Link to="/instagram">Instagram</Link>
                  <Link to="/tiktok">TikTok</Link>
                  <Link to="/about-us">About us</Link>
                </nav>
              </header>

              <main>
                <section className="search-box">
                  <h1>Online Video Downloader</h1>
                  <p>Download videos from various platforms.</p>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Paste the video link here"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                    <span
                      className="paste-icon"
                      onClick={() => {
                        pasteIcon ? handlePaste() : setVideoUrl("");
                        setPasteIcon(!pasteIcon);
                      }}
                    >
                      {pasteIcon ? <FaPaste /> : <FaTimes />}
                    </span>
                  </div>
                  <button onClick={handleFetchVideoDetails}>Start</button>
                </section>

                {loading && (
                  <div className="searching-bar">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                )}

                {error && <p className="error">{error}</p>}

                {videoData && (
                  <section className="video-details">
                    <h2>Video Found</h2>
                    <div className="video-container">
                      <img src={videoData.data.thumbnail} alt={videoData.data.title} />
                      <h3>{videoData.data.title}</h3>
                      
                    </div>
                    
                    <div className="download-options">
                      <button onClick={() => downloadFile(videoData,"audio" , "", setDownloadProgress)}>Download MP3</button>
                      <button onClick={() => downloadFile(videoData,"video" , "360p", setDownloadProgress)}>Download 360p</button>
                      <button onClick={() => downloadFile(videoData,"video" , "720p", setDownloadProgress)}>Download 720p</button>
                      <button onClick={() => downloadFile(videoData,"video" , "1080p", setDownloadProgress)}>Download 1080p</button>
                    </div>

                    {/* Progress Bar */}
                   {downloadProgress > 0 && (
                     <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${downloadProgress}%` }}>
                        {downloadProgress}%
                        </div>
                     </div>
                    )}


                  </section>
                )}
              </main>
              <AllResources />
              <DownloadInstructions />
              <VideoDownloadSection />
              <Footer />
            </div>
          }
        />
        <Route path="/youtube" element={<YouTubePage />} />
        <Route path="/facebook" element={<FacebookPage />} />
        <Route path="/instagram" element={<InstagramPage />} />
        <Route path="/tiktok" element={<TikTokPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
};

export default App;


