import React from "react";
import "./App.css";
import Footer from "./Footer";
import { FaBars, FaTimes } from "react-icons/fa";
import DownloadInstructions from "./DownloadInstructions";
import AllResources from "./AllResources";
import VideoDownloadSection from "./VideoDownloadSections";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

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
        <section className="about-us">
          <h1>About Us</h1>
          <p>
            We are a dedicated team passionate about making video downloading simple and accessible. Our platform supports multiple social media sites, allowing you to save your favorite videos offline with ease. Learn more about our mission and services below.
          </p>
        </section>
      </main>
      <AllResources />
      <DownloadInstructions />
      <VideoDownloadSection />
      <Footer />
    </div>
  );
};

export default AboutUsPage;