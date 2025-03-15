import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./Footer";
import { FaBars, FaTimes, FaPaste } from "react-icons/fa";
import DownloadInstructions from "./DownloadInstructions";
import AllResources from "./AllResources";
import VideoDownloadSection from "./VideoDownloadSections";
import { Link } from "react-router-dom";

const InstagramPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pasteIcon, setPasteIcon] = useState(true);

  const API_URL = "http://localhost:8080";

  const fetchVideoDetails = async () => {
    setError("");
    setVideoData(null);
    try {
      const response = await axios.get(`${API_URL}/api/youtube/video`, {
        params: { url: videoUrl },
      });
      if (response.data.items?.length > 0) {
        setVideoData(response.data.items[0]);
      } else {
        setError("No Instagram video found.");
      }
    } catch (err) {
      setVideoData({
        snippet: {
          title: "Sample Instagram Video",
          thumbnails: {
            high: {
              url: "https://via.placeholder.com/300",
            },
          },
        },
      });
      setError("API not available. Showing mock data for testing.");
    }
  };

  const downloadFile = async (format, fileName) => {
    try {
      const response = await axios.get(`${API_URL}/api/youtube/download`, {
        params: { url: videoUrl, format, fileName },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: format === "audio" ? "audio/mp3" : "video/mp4",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError("Download not available. API might be down.");
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVideoUrl(text);
      setPasteIcon(false);
    } catch (err) {
      setError("Failed to paste from clipboard on Instagram page.");
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
          <h1>Instagram Video Downloader</h1>
          <p>Download videos from Instagram with ease.</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Paste the Instagram video link here"
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
          <button onClick={fetchVideoDetails}>Start Instagram Download</button>
        </section>

        {error && <p className="error">{error}</p>}

        {videoData && (
          <section className="video-details">
            <h2>Instagram Video Found</h2>
            <div className="video-container">
              <img
                src={videoData.snippet.thumbnails?.high?.url}
                alt={videoData.snippet.title}
              />
              <h3>{videoData.snippet.title}</h3>
            </div>
            <div className="download-options">
              <button
                onClick={() => downloadFile("audio", `${videoData.snippet.title}.mp3`)}
              >
                Download Instagram MP3
              </button>
              <button
                onClick={() =>
                  downloadFile("video360p", `${videoData.snippet.title}.mp4`)
                }
              >
                Download Instagram 360p
              </button>
              <button
                onClick={() =>
                  downloadFile("video720p", `${videoData.snippet.title}.mp4`)
                }
              >
                Download Instagram 720p
              </button>
              <button
                onClick={() =>
                  downloadFile("video1080p", `${videoData.snippet.title}.mp4`)
                }
              >
                Download Instagram 1080p
              </button>
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

export default InstagramPage;