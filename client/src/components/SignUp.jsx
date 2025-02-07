import { useState } from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import "../index.css";

const SignUp = ({ signUpModal, loginModal }) => {
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpLoading, setSignUpLoading] = useState(false);
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
      [e.target.name]: e.target.value,
    });
  };
  return (
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
          <div className="signup-actions">
            <button
              type="button"
              className="cancel"
              onClick={signUpModal}
            >
              Cancel
            </button>
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
          </div>
        </form>
        <p className="login-prompt">
          Already have an account? <a href="#" onClick={loginModal}>Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
