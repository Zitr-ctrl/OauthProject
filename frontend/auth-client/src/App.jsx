import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedPage from './components/ProtectedPage';
import GoogleSuccess from './pages/GoogleSuccess';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isLoggedIn } = useAuth(); // Obtiene el estado de login

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/protected" element={isLoggedIn ? <ProtectedPage /> : <LoginForm />} />
          <Route path="/google-success" element={<GoogleSuccess />} />
          <Route path="/profile" element={isLoggedIn ? <UserProfile /> : <LoginForm />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
