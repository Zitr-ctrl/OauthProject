import { useAuth } from '../context/AuthContext';

function UserProfile() {
  const { user } = useAuth();  // Usamos el contexto para acceder al usuario

  if (!user) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Aquí puedes agregar más detalles del usuario si lo deseas */}
    </div>
  );
}

export default UserProfile;
