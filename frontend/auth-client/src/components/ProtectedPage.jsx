import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils';

export default function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      alert('Debes iniciar sesión');
      navigate('/');
    }
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-6 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-green-600">✅ Bienvenido a la página protegida</h2>
    </div>
  );
}