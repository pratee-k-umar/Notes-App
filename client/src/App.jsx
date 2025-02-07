import { useState } from "react";
import "./index.css";
import HomeIcon from "@mui/icons-material/Home";
import GradeIcon from "@mui/icons-material/Grade";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TextField from "@mui/material/TextField";
import ImageIcon from "@mui/icons-material/Image";
import CreateIcon from "@mui/icons-material/Create";
import MicIcon from "@mui/icons-material/Mic";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const App = () => {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const token = localStorage.getItem("token");
  const signUpModal = () => {
    setSignup(!signup);
    if (login) setLogin(false);
  };
  const loginModal = () => {
    setLogin(!login);
    if (signup) setSignup(false);
  };
  return (
    <div>
      {(signup || login) && <div className="background"></div>}
      <div className="app-container">
        <div className={signup && "background"}></div>
        <aside className="sidebar">
          <div className="webname">
            <p className="logo">l</p>
            <p className="name">AI Notes</p>
          </div>
          <hr />
          {token && (
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
          )}
          <div className="profile">
            {token ? (
              <div>
                <div className="profile-info">
                  <p className="profile-logo">lg</p>
                  <p className="profile-name">Profile Name</p>
                </div>
                <KeyboardArrowUpIcon />
              </div>
            ) : (
              <div className="signUp">
                <button onClick={signUpModal} className="signUp-btn">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </aside>
        {token ? (
          <main className="main-content">
            <div className="top-bar">
              <TextField
                className="search-bar"
                label="Search"
                color="secondary"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />
              <button className="sort-button">
                <span>
                  <FilterAltIcon />
                </span>
                Sort
              </button>
            </div>
            <div className="notes-container">
              {/* Notes will be dynamically added here */}
            </div>
            <div className="action-bar">
              <div className="action-buttons">
                <ImageIcon />
                <CreateIcon />
              </div>
              <button className="record-button">
                <span>
                  <MicIcon />
                </span>
                start recording
              </button>
            </div>
          </main>
        ) : (
          <div className="login-action">
            <button onClick={loginModal} className="login-btn">
              Login
            </button>
          </div>
        )}
      </div>
      {login && (
        <div className="modal-container">
          <Login loginModal={loginModal} signUpModal={signUpModal} />
        </div>
      )}
      {signup && (
        <div className="modal-container">
          <SignUp signUpModal={signUpModal} loginModal={loginModal} />
        </div>
      )}
    </div>
  );
};

export default App;
