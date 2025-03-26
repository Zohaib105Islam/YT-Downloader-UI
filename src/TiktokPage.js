import React, { useState } from "react";
import { fetchVideoDetails, downloadFile } from "./helpers/videoHelper"; // Import the helper functions
import "./App.css";
import Footer from "./Footer";
import { FaBars, FaTimes, FaPaste } from "react-icons/fa";
import DownloadInstructions from "./DownloadInstructions";
import AllResources from "./AllResources";
import VideoDownloadSection from "./VideoDownloadSections";
import { Link } from "react-router-dom";

const TikTokPage = () => {
      const [videoUrl, setVideoUrl] = useState("");
      const [videoData, setVideoData] = useState(null);
      const [error, setError] = useState("");
      const [menuOpen, setMenuOpen] = useState(false);
      const [pasteIcon, setPasteIcon] = useState(true);
      const [loading, setLoading] = useState(false);

  const handleFetchVideoDetails = async () => {
        setError("");
        setVideoData(null);
        setLoading(true);
    
        const result = await fetchVideoDetails(videoUrl);
    
        if (result.success) {
          setVideoData(result.data);
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
      setError("Failed to paste from clipboard on TikTok page.");
    }
  };

  const handleLogoClick = () => {
    window.location.href = "/"; // Redirect to root (App.js)
  };

  return (
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
          <h1>TikTok Video Downloader</h1>
          <p>Download videos from TikTok with ease.</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Paste the TikTok video link here"
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
            <h2>TikTok Video Found</h2>
            <div className="video-container">
                <img src={videoData.thumbnail} />
                <h3>{videoData.title}</h3>
            </div>
            <div className="download-options">
              <button onClick={() => downloadFile("audio", "")}>Download MP3</button>
              <button onClick={() => downloadFile("video360p", "")}>Download 360p</button>
              <button onClick={() => downloadFile("video720p", "")}>Download 720p</button>
              <button onClick={() => downloadFile("video1080p", "")}>Download 1080p</button>
            </div>
          </section>
        )}
      </main>
      <AllResources />
      <DownloadInstructions />
      <VideoDownloadSection />
      <Footer />
    </div>
  );
};

export default TikTokPage;