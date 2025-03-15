import React from 'react';
import './DownloadInstructions.css';

const DownloadInstructions = () => {
  return (
    <div className="download-instructions">
      <h2>How to Download Videos Using ALLDownloader    </h2>
      <div className="steps-container">
        <div className="step">
          <span className="step-number">1</span>
          <div className="step-content">
            <h3>Find Your Video</h3>
            <p>
              Navigate to the video you want to download on platforms like YouTube, TikTok, or Instagram, and copy its URL from the address bar or share option.
            </p>
          </div>
        </div>
        <div className="step">
          <span className="step-number">2</span>
          <div className="step-content">
            <h3>Paste the URL</h3>
            <p>
              Visit our, locate the input field at the top of the page, paste the copied video URL, and hit the "Download" button.
            </p>
          </div>
        </div>
        <div className="step">
          <span className="step-number">3</span>
          <div className="step-content">
            <h3>Choose Quality & Download</h3>
            <p>
              Select your preferred video quality from the options provided (e.g., MP4, HD), then click to download the file to your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadInstructions;