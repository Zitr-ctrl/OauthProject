// src/pages/GoogleSuccess.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function GoogleSuccess() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const token = new URLSearchParams(window.location.search).get('token');
      if (token) {
        localStorage.setItem('token', token);
      }

      try {
        const response = await fetch('http://localhost:3000/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          login(data); // data es el usuario
          navigate('/protected');
        } else {
          console.error('Error al obtener usuario:', data.message);
        }
      } catch (error) {
        console.error('Error en GoogleSuccess:', error);
      }
    }

    fetchUser();
  }, [login, navigate]);

  return <div>Cargando sesión...</div>;
}

export default GoogleSuccess;
