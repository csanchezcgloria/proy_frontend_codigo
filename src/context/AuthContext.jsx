import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = (email, password) => {
    // Simulamos verificación con localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (user) {
      const userInfo = { ...user, password: undefined }; // No almacenar la contraseña
      setCurrentUser(userInfo);
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      return true;
    }
    return false;
  };

  // Función para registrar un nuevo usuario
  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar si el usuario ya existe
    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      return false;
    }
    
    // Crear nuevo usuario
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Iniciar sesión automáticamente
    const userInfo = { ...newUser, password: undefined };
    setCurrentUser(userInfo);
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    
    return true;
  };

  // Función para cerrar sesión
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};