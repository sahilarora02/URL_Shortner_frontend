import React, { useState } from 'react';
import './styles.css'; // Import the CSS file where you'll define the extracted Tailwind classes

const MainPage = () => {
  const [URL, setUrl] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8001/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ URL }),
      });

      const data = await response.json();
      setShortenedURL(data.new_url); // Update state with the shortened URL
    } catch (error) {
      console.error('Error :', error.message);
    }
  }

  return (
    <div className="main-container">
      <div className="content-container">
        <LinkIcon className="link-icon" />
        <h1 className="title">Unlock the Power of Quick Link Management!</h1>
        <p className="description">
          Bid farewell to lengthy URLs and embrace a streamlined method to shorten, share, and organize your links.
        </p>
        <div className="input-message">Enter your link now to shorten it.</div>
        <div className="input-container">
          <input className="input" placeholder="Enter link to be shortened" value={URL} onChange={(e) => setUrl(e.target.value)} />
          <button className="shorten-button" onClick={handleSubmit}>Shorten link</button>
        </div>
        {shortenedURL && (
          <div className="shortened-url-container">
            <a href={shortenedURL} target="_blank" rel="noopener noreferrer" className="shortened-url">{shortenedURL}</a>
          </div>
        )}
      </div>
    </div>
  );
}

function LinkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default MainPage;
