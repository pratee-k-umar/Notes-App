import { createContext, useState, useEffect } from "react"
import axios from "axios";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(token);
    }
  }, []);
  const login = async (email, password) => {
    const { data } = await axios.post("/api/auth/logic", { email, password })
    localStorage.setItem("token", data.token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    setUser(data.token);
  }
  return <authContext.Provider value={{ user, login }}>{children}</authContext.Provider>
}

export default AuthProvider