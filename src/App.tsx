import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import LandingPage from './pages/LandingPage';
import MentorsPage from './pages/MentorsPage';
import MessagesPage from './pages/MessagesPage';
import StudyGroupsPage from './pages/StudyGroupsPage';
import ResourcesPage from './pages/ResourcesPage';
import SettingsPage from './pages/SettingsPage';
import PeerTutorsPage from './pages/PeerTutorsPage';
import BecomeTutorPage from './pages/BecomeTutorPage';
import { useAuth } from './contexts/AuthContext';
// Protected route component
const ProtectedRoute = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const {
    currentUser,
    loading
  } = useAuth();
  if (loading) {
    return <div className="flex w-full min-h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
// App wrapper for auth context
const AppContent = () => {
  const {
    currentUser,
    loading
  } = useAuth();
  if (loading) {
    return <div className="flex w-full min-h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
  return <Router>
      <Routes>
        <Route path="/" element={!currentUser ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/dashboard" />} />
        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute>
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto p-4">
                    <Dashboard />
                  </main>
                </div>
              </div>
            </ProtectedRoute>} />
        {/* New Peer Tutors Route */}
        <Route path="/peer-tutors" element={<ProtectedRoute>
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto p-4">
                    <PeerTutorsPage />
                  </main>
                </div>
              </div>
            </ProtectedRoute>} />
        {/* New Become Tutor Route */}
        <Route path="/become-tutor" element={<ProtectedRoute>
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto p-4">
                    <BecomeTutorPage />
                  </main>
                </div>
              </div>
            </ProtectedRoute>} />
        <Route path="/mentors" element={<ProtectedRoute>
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto p-4">
                    <MentorsPage />
                  </main>
                </div>
              </div>
            </ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute>
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto p-4">
                    <MessagesPage />
                  </main>
                </div>
              </div>
            </ProtectedRoute>} />
        <Route path="/study-groups" element={<ProtectedRoute>
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto p-4">
                    <StudyGroupsPage />
                  </main>
                </div>
              </div>
            </ProtectedRoute>} />
        <Route path="/resources/library" element={<ProtectedRoute>
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto p-4">
                    <ResourcesPage />
                  </main>
                </div>
              </div>
            </ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute>
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto p-4">
                    <SettingsPage />
                  </main>
                </div>
              </div>
            </ProtectedRoute>} />
      </Routes>
    </Router>;
};
export function App() {
  return <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ChatProvider>
            <AppContent />
          </ChatProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>;
}