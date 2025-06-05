// src/pages/GoogleSuccess.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token); // o sessionStorage
      navigate('/protected'); // Redirige a página protegida
    } else {
      navigate('/login'); // Si no hay token, vuelve al login
    }
  }, []);

  return <p>Redirigiendo...</p>;
};

export default GoogleSuccess;
