import { useContext, useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import "../index.css";
import { AuthContext } from "../context/AuthContext";

const SignUp = ({ signUpModal, loginModal }) => {
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [error, setError] = useState(null);
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
  const { signup } = useContext(AuthContext);
  const signUpSubmit = async (e) => {
    e.preventDefault();
    setSignUpLoading(true);
    setError(null);

    try {
      await signup(signUpFormData);
      signUpModal();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    } finally {
      setSignUpLoading(false);
    }
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
          <h2 className="text-2xl text-blue-500">Create an account</h2>
          <p>Sign up to get started</p>
        </div>
        {error && (
          <Alert
            className="error-alert"
            severity="error"
          >
            {error}
          </Alert>
        )}
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
            <button type="button" className="cancel" onClick={signUpModal}>
              Cancel
            </button>
            <button
              type="submit"
              className={`signup-button ${signUpLoading ? "loading" : ""}`}
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
          Already have an account?{" "}
          <a href="#" onClick={loginModal}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  signUpModal: PropTypes.func.isRequired,
  loginModal: PropTypes.func.isRequired,
};

export default SignUp;
