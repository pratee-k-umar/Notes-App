import { useContext, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../context/AuthContext";
import PropTypes from 'prop-types';
import Alert from "@mui/material/Alert";

const Login = ({ loginModal, signUpModal }) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError(null);
    try {
      await login(loginFormData);
      loginModal(); // Close the modal on success
    } catch (error) {
      setError(error.message);
    } finally {
      setLoginLoading(false);
    }
  };
  const loginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome back</h2>
          <p>Please enter your details to sign in</p>
        </div>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
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
          <div className="login-actions">
            <button
              type="button"
              className="cancel"
              onClick={loginModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`login-button ${loginLoading ? "loading" : ""}`}
              disabled={loginLoading}
            >
              {loginLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <p className="signup-prompt">
          Don't have an account? <a href="#" onClick={signUpModal}>Sign up</a>
        </p>
      </div>
    </div>
  );
};
Login.propTypes = {
  loginModal: PropTypes.func.isRequired,
  signUpModal: PropTypes.func.isRequired,
};

export default Login;
