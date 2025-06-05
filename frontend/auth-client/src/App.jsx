import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedPage from './components/ProtectedPage';

export default function App() {
  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex justify-center gap-4">
        <Link className="hover:underline" to="/">Login</Link>
        <Link className="hover:underline" to="/register">Register</Link>
        <Link className="hover:underline" to="/protected">Protected</Link>
      </nav>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/protected" element={<ProtectedPage />} />
        </Routes>
      </div>
    </Router>
  );
}