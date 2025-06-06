// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }

    logout();
    window.location.href = '/';
  };

  return (
  <nav className="bg-blue-600 text-white p-4 flex justify-center gap-4">
    {!isLoggedIn && (
      <>
        <Link className="hover:underline" to="/">Login</Link>
        <Link className="hover:underline" to="/register">Register</Link>
      </>
    )}

    {isLoggedIn && (
      <>
        <Link className="hover:underline" to="/protected">Protected</Link>
        <Link className="hover:underline" to="/profile">Perfil</Link> {/* 👈 Enlace al perfil */}
        <button
          onClick={handleLogout}
          className="hover:underline"
        >
          Logout
        </button>
      </>
    )}
  </nav>
);

}
