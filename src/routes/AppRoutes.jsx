import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import ChatHome from '../pages/ChatHome';
import AboutUs from '../pages/AboutUs';
import Services from '../pages/Services';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />

      {/* Rutas protegidas */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <ChatHome />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/chat/:chatId?" 
        element={
          <ProtectedRoute>
            <ChatHome />
          </ProtectedRoute>
        } 
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;