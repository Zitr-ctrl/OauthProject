import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function GoogleSuccess() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      // Obtener el token desde la URL
      const token = new URLSearchParams(window.location.search).get('token');
      if (token) {
        localStorage.setItem('token', token);  // Guardamos el token en localStorage
        console.log('Token guardado en localStorage:', token); // Verifica que el token se guarda correctamente
      }

      // Verifica si el token está guardado en localStorage
      const storedToken = localStorage.getItem('token');
      console.log('Token en localStorage al hacer la solicitud:', storedToken);

      try {
        const response = await fetch('http://localhost:3000/auth/user', {
          headers: {
            Authorization: `Bearer ${storedToken}`,  // Usar el token almacenado para la solicitud
          },
        });

        const data = await response.json();
        console.log('Datos del usuario desde el backend:', data); // Verifica los datos del usuario que se obtienen del backend

        if (response.ok) {
          login(data.user, storedToken); // Guarda el usuario en el contexto
          navigate('/protected'); // Redirige a la página protegida
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
