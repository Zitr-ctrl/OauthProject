import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils';

export default function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Error:", err);
      setUser(null);
    } finally {
      setLoading(false); // <- esto evita quedarse pegado en “Cargando sesión…”
    }
  };

  fetchData();
}, []);

  return (
    <div className="bg-white shadow-md rounded p-6 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-green-600">✅ Bienvenido a la página protegida</h2>
    </div>
  );
}