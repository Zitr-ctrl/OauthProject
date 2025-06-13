import { useState } from 'react';
import { register } from '../api';

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (form.password !== form.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    try {
      const res = await register(form);
      alert('Registrado con éxito');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Registro</h2>
      <input
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Nombre"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
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
      <input
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Repetir Contraseña"
        type="password"
        onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Registrar
      </button>
    </form>
  );
}
