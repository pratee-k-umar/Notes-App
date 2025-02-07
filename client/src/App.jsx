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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";

const App = () => {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const loginSubmit = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
    }, 1500);
  };
  const loginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#4a90e2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4a90e2",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#4a90e2",
    },
  };
  const signUpSubmit = (e) => {
    e.preventDefault();
    setSignUpLoading(true);
    setTimeout(() => {
      setSignUpLoading(false);
    }, 1500);
  };
  const signUpChange = (e) => {
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div>
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
      </div>
      {login && (
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h2>Welcome back</h2>
              <p>Please enter your details to sign in</p>
            </div>
            <form onSubmit={loginSubmit} className="login-form">
              <TextField
                label="Email address"
                variant="outlined"
                type="email"
                name="email"
                fullWidth
                required
                value={loginFormData.email}
                onChange={loginChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#4a90e2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4a90e2",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#4a90e2",
                  },
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                fullWidth
                required
                value={loginFormData.password}
                onChange={loginChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#4a90e2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4a90e2",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#4a90e2",
                  },
                }}
              />
              <div className="form-options">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#4a90e2",
                        "&.Mui-checked": {
                          color: "#4a90e2",
                        },
                      }}
                    />
                  }
                  label="Remember me"
                />
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className={`submit-button ${loginLoading ? "loading" : ""}`}
                disabled={loginLoading}
              >
                {loginLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            <p className="signup-prompt">
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </div>
        </div>
      )}
      {signup && (
        <div className="signup-container">
          <div className="signup-card">
            <div className="signup-header">
              <h2>Create an account</h2>
              <p>Sign up to get started</p>
            </div>
            <form onSubmit={signUpSubmit} className="signup-form">
              <TextField
                label="Full Name"
                variant="outlined"
                type="text"
                name="name"
                fullWidth
                required
                value={signUpFormData.name}
                onChange={signUpChange}
                sx={textFieldStyles}
              />
              <TextField
                label="Email address"
                variant="outlined"
                type="email"
                name="email"
                fullWidth
                required
                value={signUpFormData.email}
                onChange={signUpChange}
                sx={textFieldStyles}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                fullWidth
                required
                value={signUpFormData.password}
                onChange={signUpChange}
                sx={textFieldStyles}
              />
              <button
                type="submit"
                className={`submit-button ${signUpLoading ? "loading" : ""}`}
                disabled={signUpLoading}
              >
                {signUpLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
            <p className="login-prompt">
              Already have an account? <a href="#">Sign in</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
