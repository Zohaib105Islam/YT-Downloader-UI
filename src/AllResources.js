import React from 'react';
import './AllResources.css';

import dailymotionIcon from './assets/dailymotion.jpg'
import vimeoIcon from './assets/vimeo.png';
import vkIcon from './assets/vk.png';
import soundcloudIcon from './assets/soundcloud.jpg';
import tiktokIcon from './assets/tiktok.png';
import threadsIcon from './assets/threads.png'

const AllResources = () => {
  return (
    <div className="all-resources">
      <h2>ALL RESOURCES</h2>
      <div className="resources-grid">
        <a href="https://dailymotion.com" className="resource-item">
          <img src={dailymotionIcon} alt="Dailymotion" />
          <span>dailymotion.com</span>
        </a>
        <a href="https://vimeo.com" className="resource-item">
          <img src={vimeoIcon} alt="Vimeo" />
          <span>vimeo.com</span>
        </a>
        <a href="https://vk.com" className="resource-item">
          <img src={vkIcon} alt="VK" />
          <span>vk.com</span>
        </a>
        <a href="https://soundcloud.com" className="resource-item">
          <img src={soundcloudIcon} alt="SoundCloud" />
          <span>soundcloud.com</span>
        </a>
        <a href="https://tiktok.com" className="resource-item">
          <img src={tiktokIcon} alt="TikTok" />
          <span>tiktok.com</span>
        </a>
        <a href="https://threads.net" className="resource-item">
          <img src={threadsIcon} alt="Threads" />
          <span>threads</span>
        </a>
      </div>
    </div>
  );
};

export default AllResources;