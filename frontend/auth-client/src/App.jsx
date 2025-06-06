// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedPage from './components/ProtectedPage';
import GoogleSuccess from './pages/GoogleSuccess';
import UserProfile from './components/UserProfile';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        {isLoggedIn && <UserProfile />}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/google-success" element={<GoogleSuccess />} />
          <Route path="/profile" element={<ProfilePage />} />
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
