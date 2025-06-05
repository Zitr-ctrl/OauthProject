import { useState } from 'react';
import { login } from '../api';
import { saveToken } from '../utils';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      saveToken(res.data.token);
      alert('Login exitoso');
      navigate('/protected');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Email"
        type="email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Contraseña"
        type="password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Iniciar sesión
      </button>
      <button
        type="button"
        className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
        onClick={handleGoogleLogin}
      >
        Login con Google
      </button>
    </form>
  );
}