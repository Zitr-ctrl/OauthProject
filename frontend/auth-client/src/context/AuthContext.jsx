import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // <- OK

  const login = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("Token cargado desde localStorage:", token);

      if (!token) {
        console.warn("No token encontrado en localStorage");
        setLoading(false); // <-- IMPORTANTE
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Error al obtener usuario:", data.message);
          setUser(null);
          setIsLoggedIn(false);
        } else {
          setUser(data); // <-- Asegúrate de que tu backend retorne username y email
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Error al verificar autenticación:", err);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false); // <-- SIEMPRE poner esto
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
