import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Llamar a logout para limpiar el contexto y el localStorage
    window.location.href = '/'; // Redirigir a la página de inicio
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
          <Link className="hover:underline" to="/profile">Perfil</Link>
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        </>
      )}
    </nav>
  );
}
