import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const apiClient = axios.create({
    baseURL: "http://localhost:5000",
  });

  apiClient.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await apiClient.get("/api/user");
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post("/api/login", { email, password });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};