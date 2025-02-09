import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Decode JWT token
  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  // Check if token is expired
  const isTokenExpired = (token) => {
    const decoded = decodeToken(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime;
  };

  // Axios instance
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Axios interceptor to add token to headers
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Add response interceptor to handle token expiration
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  // Load user on mount and token change
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem("token");
      
      if (!storedToken) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        // Check if token is expired
        if (isTokenExpired(storedToken)) {
          logout();
          return;
        }

        // Set up axios headers for the request
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        
        // Fetch user data
        const response = await apiClient.get("/api/auth/user");
        setUser(response.data);
        setIsAuthenticated(true);
        setToken(storedToken);
      } catch (error) {
        console.error("Failed to load user:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []); // Remove token dependency to prevent infinite loops

  // Update axios headers when token changes
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Modified login function
  const login = async ({ email, password }) => {
    try {
      setError(null);
      const response = await apiClient.post("/api/auth/login", {
        email,
        password,
      });
      
      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      throw new Error(message);
    }
  };

  // Modified logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    delete apiClient.defaults.headers.common['Authorization'];
  };

  // Modified signup function
  const signup = async ({ name, email, password }) => {
    try {
      setError(null);
      const response = await apiClient.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      
      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed. Please try again.";
      setError(message);
      throw new Error(message);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        signup,
        loading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
