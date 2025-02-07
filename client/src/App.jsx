import { useState } from "react";
import "./index.css";
import HomeIcon from "@mui/icons-material/Home";
import GradeIcon from "@mui/icons-material/Grade";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const App = () => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="webname">
          <p className="logo">l</p>
          <p className="name">AI Notes</p>
        </div>
        <hr />
        <nav>
          <ul>
            <li>
              <span>
                <HomeIcon />
              </span>
              Home
            </li>
            <li>
              <span>
                <GradeIcon />
              </span>
              Favourites
            </li>
          </ul>
        </nav>
        <div className="profile">
          <div className="profile-info">
            <p className="profile-logo">lg</p>
            <p className="profile-name">Profile Name</p>
          </div>
          <KeyboardArrowUpIcon />
        </div>
      </aside>
      <main className="main-content">
        <div className="top-bar">
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
          </div>
          <button className="sort-button">Sort</button>
        </div>
        <div className="notes-container">
          {/* Notes will be dynamically added here */}
        </div>
      </main>
      <div className="action-bar">
        <button className="action-btn">Add</button>
        <button className="action-btn record">Start Recording</button>
      </div>
    </div>
  );
};

export default App;
