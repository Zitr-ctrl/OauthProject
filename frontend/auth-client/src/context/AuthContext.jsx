import { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = (userData, token) => {
    setUser(userData);  // Guarda el usuario en el contexto
    setIsLoggedIn(true);
    if (token) {
      localStorage.setItem("token", token);  // Guarda el token en localStorage
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");  // Remueve el token de localStorage
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
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
          setUser(null);
          setIsLoggedIn(false);
        } else {
          setUser(data.user);  // Actualiza el usuario en el contexto
          setIsLoggedIn(true);
        }
      } catch (err) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
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

// Exportamos el hook useAuth para acceder al contexto
export function useAuth() {
  return useContext(AuthContext);  // Esto permite usar el contexto en otros componentes
}
