import { useEffect, useState } from "react";
import { AuthContext } from "./useAuth";
import api from "../services/api";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("token")));

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    try {
      const res = await api.get("/auth/me");
      return res.data.user;
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return;

    let isCurrent = true;
    checkAuth().then((checkedUser) => {
      if (isCurrent) {
        setUser(checkedUser);
        setLoading(false);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

const login = async (data) => {
  const res = await api.post("/auth/login", data);

  localStorage.setItem("token", res.data.token);
  setUser(res.data.user);

  return res.data;
};

const guestLogin = async () => {
  const res = await api.post("/auth/guest");

  localStorage.setItem("token", res.data.token);
  setUser(res.data.user);

  return res.data;
};

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore logout errors
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const refreshAuth = async () => {
    const checkedUser = await checkAuth();
    setUser(checkedUser);
    setLoading(false);
    return checkedUser;
  };

  return (
    <AuthContext.Provider
    value={{
  user,
  setUser,
  loading,
  login,
  guestLogin,
  register,
  logout,
  checkAuth: refreshAuth,
}}
    >
      {children}
    </AuthContext.Provider>
  );
}
