import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (userData: Omit<User, 'id' | 'createdAt' | 'favorites' | 'verified'>) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  toggleFavorite: (animalId: string) => void;
  isFavorite: (animalId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuario demo por defecto
const DEMO_USER: User = {
  id: 'demo-1',
  email: 'admin@sanantoniodebenageber.es',
  password: '1234',
  name: 'Administrador SAB',
  dni: '12345678A',
  phone: '+34 666 777 888',
  photo: 'https://ui-avatars.com/api/?name=Admin+SAB&background=1976d2&color=fff',
  address: 'Calle Mayor, 1',
  city: 'San Antonio de Benagéber',
  province: 'Valencia',
  bio: 'Administrador de la aplicación SAB Adopta',
  verified: true,
  createdAt: new Date().toISOString(),
  favorites: []
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([DEMO_USER]);

  useEffect(() => {
    // Cargar usuario autenticado
    const savedUser = localStorage.getItem('sab_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Cargar todos los usuarios registrados
    const savedUsers = localStorage.getItem('sab_all_users');
    if (savedUsers) {
      setAllUsers(JSON.parse(savedUsers));
    } else {
      localStorage.setItem('sab_all_users', JSON.stringify([DEMO_USER]));
    }
  }, []);

  useEffect(() => {
    // Guardar usuarios cuando cambian
    if (allUsers.length > 0) {
      localStorage.setItem('sab_all_users', JSON.stringify(allUsers));
    }
  }, [allUsers]);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const foundUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser) {
      return { success: false, error: 'No existe una cuenta con este email' };
    }

    if (foundUser.password !== password) {
      return { success: false, error: 'Contraseña incorrecta' };
    }

    setUser(foundUser);
    localStorage.setItem('sab_user', JSON.stringify(foundUser));
    return { success: true };
  };

  const register = (userData: Omit<User, 'id' | 'createdAt' | 'favorites' | 'verified'>): { success: boolean; error?: string } => {
    // Validar que el email no exista
    const existingUser = allUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) {
      return { success: false, error: 'Ya existe una cuenta con este email' };
    }

    // Validar DNI único
    const existingDNI = allUsers.find(u => u.dni === userData.dni);
    if (existingDNI) {
      return { success: false, error: 'Ya existe una cuenta con este DNI' };
    }

    // Crear nuevo usuario
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      favorites: [],
      verified: false,
      photo: userData.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=1976d2&color=fff`
    };

    setAllUsers(prev => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem('sab_user', JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sab_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('sab_user', JSON.stringify(updatedUser));

    // Actualizar en la lista de todos los usuarios
    setAllUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
  };

  const toggleFavorite = (animalId: string) => {
    if (!user) return;

    const isFav = user.favorites.includes(animalId);
    const newFavorites = isFav
      ? user.favorites.filter(id => id !== animalId)
      : [...user.favorites, animalId];

    updateProfile({ favorites: newFavorites });
  };

  const isFavorite = (animalId: string): boolean => {
    return user?.favorites.includes(animalId) || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated: !!user,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
