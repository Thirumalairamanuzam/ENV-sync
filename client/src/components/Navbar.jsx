import "./Navbar.css";
import { Link } from "react-router-dom";

import React from "react";

function Navbar() {
  return (
    <>
      <div className="home-header">
        <header
          data-thq="thq-navbar"
          className="navbarContainer home-navbar-interactive"
        >
          <span className="logo">ENV-SYNC</span>
          <div data-thq="thq-navbar-nav" className="home-desktop-menu">
            <nav className="home-links flex">
              <a
                href="/"
                className="home-nav12 bodySmall text-3xl md:font-bold"
              >
                Home
              </a>
              <a
                href="/air-quality"
                className="home-nav3 bodySmall text-lg md:font-bold"
              >
                Air Quality Index
              </a>
              <a
                href="/waste-management"
                className="home-nav4 bodySmall text-lg md:font-bold"
              >
                Smart Waste Management
              </a>
              <a
                href="/community-engagement"
                className="home-nav5 bodySmall text-lg md:font-bold"
              >
                Community Eengagement
              </a>
              {/* <a
                href="/blog"
                className="home-nav5 bodySmall text-lg md:font-bold"
              >
                Blog
              </a> */}
            </nav>
          </div>
          <div data-thq="thq-burger-menu" className="home-burger-menu">
            <svg viewBox="0 0 1024 1024" className="home-icon socialIcons">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
