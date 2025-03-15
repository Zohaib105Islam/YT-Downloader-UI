import React from 'react';
import './VideoDownloadSections.css';

// Placeholder images and icons (replace with actual paths)
import image1 from './assets/dailymotion.jpg';
import image2 from './assets/soundcloud.jpg';
import image3 from './assets/tiktok.png';
import image4 from './assets/vimeo.png';

const VideoDownloadSections = () => {
  return (
    <div className="video-download-container">
      <div className="download-section">
        <div className="text-box">
          <h3>Step 1: Grab the Link</h3>
          <p className="section-text">
            Copy the video URL from platforms like YouTube or TikTok. Just hit share and paste it into our input field.
          </p>
        </div>
        <div className="image-box">
          <img src={image1} alt="Copy Video URL" className="section-image" />
        </div>
      </div>

      <div className="download-section">
        <div className="text-box">
          <h3>Step 2: Choose Your Format</h3>
          <p className="section-text">
            Select your format—MP4, WEBM, or HD. We’ll optimize it for a smooth download.
          </p>
        </div>
        <div className="image-box">
          <img src={image2} alt="Select Format" className="section-image" />
        </div>
      </div>

      <div className="download-section">
        <div className="text-box">
          <h3>Step 3: Download Instantly</h3>
          <p className="section-text">
            Click download to save your video offline. Enjoy it anytime, anywhere!
          </p>
        </div>
        <div className="image-box">
          <img src={image3} alt="Download Video" className="section-image" />
        </div>
      </div>

      <div className="download-section">
        <div className="text-box">
          <h3>Step 4: Emjoy Your Video </h3>
          <p className="section-text">
            Start enjoyinging Your Video
          </p>
        </div>
        <div className="image-box">
          <img src={image4} alt="Select Format" className="section-image" />
        </div>
      </div>

    </div>
  );
};

export default VideoDownloadSections;