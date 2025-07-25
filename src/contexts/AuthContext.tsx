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

// Mock user for demonstration (you can keep or remove this)
const mockUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@peermeet.com',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        } else {
          // No auto-login here; start with no user logged in
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Auth error:', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock successful login — you can replace with real API call
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

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
