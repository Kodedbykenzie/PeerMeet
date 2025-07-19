import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  avatar?: string;
}
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'student' | 'mentor') => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // Mock user for demonstration
  const mockUser: User = {
    id: '1',
    name: 'Demo User',
    email: 'demo@peermeet.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };
  useEffect(() => {
    // In a real app, this would check Firebase Auth state
    const checkAuth = async () => {
      try {
        // Mock authentication check
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        } else {
          // For demo purposes, auto-login with mock user
          setCurrentUser(mockUser);
          localStorage.setItem('currentUser', JSON.stringify(mockUser));
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  const login = async (email: string, password: string) => {
    // This would use Firebase Auth in a real app
    setLoading(true);
    try {
      // Mock successful login
      setCurrentUser(mockUser);
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const register = async (email: string, password: string, name: string, role: 'student' | 'mentor') => {
    // This would use Firebase Auth in a real app
    setLoading(true);
    try {
      // Mock successful registration
      const newUser: User = {
        ...mockUser,
        name,
        email,
        role
      };
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    // This would use Firebase Auth in a real app
    setLoading(true);
    try {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return <AuthContext.Provider value={{
    currentUser,
    loading,
    login,
    register,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};