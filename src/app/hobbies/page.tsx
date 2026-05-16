"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./hobbies.css";
import { games, movies, backlogGames, backlogMovies, backlogSeries, explorations } from "./data";

export default function HobbiesPage() {
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    // Save original state
    const wasDark = document.body.classList.contains("dark-mode");
    // Force dark mode on this page
    document.body.classList.add("dark-mode");

    return () => {
      // Revert when leaving
      if (!wasDark) {
        document.body.classList.remove("dark-mode");
      }
    };
  }, []);

  const handleFakeThemeToggle = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const currentItems = [...games, ...movies].filter(i => i.status === 'current');
  const tiers = ['S', 'A', 'B', 'C'];

  const renderTierRow = (tier: string, data: any[]) => {
    const items = data.filter(i => i.tier === tier);
    if (items.length === 0) return null;
    
    return (
      <div key={tier} className="tier-row">
        <div className={`tier-label tier-${tier.toLowerCase()}`}>{tier}</div>
        <div className="tier-content">
          {items.map((item, idx) => (
            <div key={idx} className="media-card" title={item.title}>
              {item.image ? (
                <img src={item.image} alt={item.title} className="media-poster" loading="lazy" />
              ) : (
                <div className="media-poster-fallback" style={{width: '100%', height: '100%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', textAlign: 'center', fontSize: '0.7rem'}}>
                  {item.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBacklogItem = (text: string, idx: number) => (
    <div key={idx} className="backlog-item">
      <span>{text}</span>
    </div>
  );

  return (
    <>
      <div className="card">
        <header className="page-header">
          <Link href="/" className="back-link">&larr; Back to Portfolio</Link>
          <h1>Offline Mode</h1>
          <p className="subtitle">When I'm not coding, I'm usually here.</p>
        </header>

        <div className="section">
          <h2>Currently On Rotation</h2>
          <p style={{ color: "var(--subtle-text-color)", marginBottom: "1rem" }}>What's currently consuming my free time.</p>
          <div className="current-grid">
            {currentItems.map((item, idx) => (
              <div key={idx} className="current-card">
                {item.image ? (
                  <img src={item.image} className="current-thumb" loading="lazy" alt={item.title} />
                ) : (
                  <div className="current-thumb" style={{ background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📺</div>
                )}
                <div className="current-info">
                  <h3>{item.title}</h3>
                  <p>{item.type || 'Game'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Gaming Profile</h2>
          <div className="steam-profile-card">
            <div className="steam-info">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" alt="Steam" className="steam-logo" />
              <div className="steam-text">
                <span className="steam-label">Steam ID</span>
                <span className="steam-id">76561199226610478</span> 
              </div>
            </div>
            <a href="https://steamcommunity.com/profiles/76561199226610478" target="_blank" rel="noopener noreferrer" className="steam-link-btn">View Profile</a>
          </div>
        </div>

        <div className="section">
          <h2>Game Tier List</h2>
          <div className="tier-list-container">
            {tiers.map(t => renderTierRow(t, games))}
          </div>
        </div>

        <div className="section">
          <h2>Watchlist Tier List</h2>
          <div className="tier-list-container">
            {tiers.map(t => renderTierRow(t, movies))}
          </div>
        </div>

        <div className="section">
          <h2>The Backlog</h2>
          <p style={{ color: "var(--subtle-text-color)", marginBottom: "1.5rem" }}>The never-ending list of "I'll get to it eventually."</p>
          
          <div className="backlog-wrapper">
            <div className="backlog-column">
              <div className="backlog-header">
                <span className="backlog-icon">🎮</span> Games
              </div>
              <div className="backlog-list">
                {backlogGames.map((text, i) => renderBacklogItem(text, i))}
              </div>
            </div>

            <div className="backlog-column">
              <div className="backlog-header">
                <span className="backlog-icon">🍿</span> Movies
              </div>
              <div className="backlog-list">
                {backlogMovies.map((text, i) => renderBacklogItem(text, i))}
              </div>
            </div>

            <div className="backlog-column">
              <div className="backlog-header">
                <span className="backlog-icon">📺</span> Series
              </div>
              <div className="backlog-list">
                {backlogSeries.map((text, i) => renderBacklogItem(text, i))}
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Other Explorations</h2>
          <div className="explorations-grid">
            {explorations.map((item, idx) => (
              <div key={idx} className="explore-card">
                <div className="explore-header">
                  <div className="explore-icon-box">{item.icon}</div>
                  <h3 className="explore-title">{item.title}</h3>
                </div>
                <p className="explore-desc">{item.desc}</p>
                <div className="explore-link">
                  <span dangerouslySetInnerHTML={{ __html: item.link }} /> <span>&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button id="theme-toggle" className="theme-toggle-button" onClick={handleFakeThemeToggle} title="Toggle Theme">
        <svg className="sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        <svg className="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      </button>

      <div id="toast" className={`toast-notification ${toastVisible ? "show" : ""}`}>
        I prefer dark mode here...
      </div>
    </>
  );
}
