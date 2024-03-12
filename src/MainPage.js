import React, { useState, useEffect } from 'react';
import './styles.css';

const MainPage = () => {
  const [URL, setUrl] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('urlList'));
    if (storedUrls) {
      setUrlList(storedUrls);
    }
  }, []);

  function extractDomain(url) {
    let domain = url.replace(/(^\w+:|^)\/\//, '');
    domain = domain.split('/')[0];
    return domain;
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://url-shortner-backend-zltz.onrender.com/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ URL }),
      });
      if (response.ok) {
      const domain =   extractDomain(URL);
        const data = await response.json();
        setShortenedURL(data.new_url);
        const newUrlList = [...urlList, { domain: domain, shortenedURL: data.new_url }];
        setUrlList(newUrlList);
        localStorage.setItem('urlList', JSON.stringify(newUrlList));
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleShortenedUrlClick = () => {
    window.location.href = `https://url-shortner-backend-zltz.onrender.com/${shortenedURL}`;
  };

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
            <p className="short-url-text">
              Shortened URL :
              <a href="#" onClick={handleShortenedUrlClick} target="_blank" rel="noopener noreferrer" className="shortened-url">
                {shortenedURL}
              </a>
            </p>
          </div>
        )}

        <div className="table-container">
          <h2>Domains and URLs</h2>
          <table className="url-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Shortened URL</th>
              </tr>
            </thead>
            <tbody>
              {urlList.map((item, index) => (
                <tr key={index}>
                  <td>{item.domain}</td>
                  <td>
                    <a href={`http://localhost:8001/${item.shortenedURL}`} target="_blank" rel="noopener noreferrer">{item.shortenedURL}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

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
