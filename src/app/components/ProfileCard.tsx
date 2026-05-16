"use client";

import { useState } from "react";

export default function ProfileCard() {
  const [toastVisible, setToastVisible] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("kaushikmak35@gmail.com").then(() => {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    });
  };

  return (
    <>
      <div className="main-content">
        <div className="flip-card" onClick={(e) => e.currentTarget.classList.toggle('is-flipped')}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src="/media/pf2.png" alt="Default cartoon avatar" />
                </div>
                <div className="flip-card-back">
                    <img src="/media/pf.jpeg" alt="Hover real photo" />
                </div>
            </div>
        </div>
        
        <div className="text-content">
            <div className="header">
                <h1>Kaushik Gupta</h1>
            </div>
            <p className="subtitle">Figuring out how to code and life</p>
            <div className="bio">
                <p className="bio-text">
                    Grown up kid trying to build an operating system, but for now, just trying to operate my own life. I love my relationship with semicolons and arduino. And ofcourse I got a growing collection of half-finished side projects in OS, databases, and more.
                </p>
                <div className="location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>Nagpur</span>
                </div>
                <div className="social-links">
                    <div className="mail-wrapper">
                        <a href="mailto:kaushikmak35@gmail.com" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                        <div className="mail-popup">
                            <span className="mail-address">kaushikmak35@gmail.com</span>
                            <button className="copy-btn" aria-label="Copy Email" onClick={copyEmail}>
                                <svg className="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                    </div>

                    <a href="https://github.com/Kaushikmak" target="_blank" rel="noopener noreferrer"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                    <a href="https://www.linkedin.com/in/kaushikgupta5/" target="_blank" rel="noopener noreferrer"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                    <a href="https://x.com/tasytaco" target="_blank" rel="noopener noreferrer"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                </div>
            </div>
        </div>
      </div>
      <div id="toast" className={`toast-notification ${toastVisible ? "show" : ""}`}>Email copied to clipboard!</div>
    </>
  );
}
