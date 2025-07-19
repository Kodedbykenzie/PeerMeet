import React, { useState } from 'react';
import { BellIcon, MessageSquareIcon, MoonIcon, SunIcon, GlobeIcon, UserIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const {
    language,
    setLanguage,
    t,
    availableLanguages
  } = useLanguage();
  const {
    currentUser,
    logout
  } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [notifications] = useState([{
    id: 1,
    message: 'New message from Jane Doe',
    time: '5m ago'
  }, {
    id: 2,
    message: 'Your next tutoring session starts in 30 minutes',
    time: '25m ago'
  }, {
    id: 3,
    message: 'New study group invitation',
    time: '1h ago'
  }]);
  const [showNotifications, setShowNotifications] = useState(false);
  return <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              PeerMeet
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
              setShowLanguageMenu(false);
            }} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              {showNotifications && <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700">
                  <div className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">
                    Notifications
                  </div>
                  {notifications.map(notification => <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>)}
                  <div className="px-4 py-2 text-center">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>}
            </div>
            {/* Messages */}
            <button className="p-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none">
              <MessageSquareIcon className="h-6 w-6" />
            </button>
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none">
              {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => {
              setShowLanguageMenu(!showLanguageMenu);
              setShowProfileMenu(false);
              setShowNotifications(false);
            }} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none">
                <GlobeIcon className="h-6 w-6" />
              </button>
              {showLanguageMenu && <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700">
                  {availableLanguages.map(lang => <button key={lang} onClick={() => {
                setLanguage(lang);
                setShowLanguageMenu(false);
              }} className={`block w-full text-left px-4 py-2 text-sm ${language === lang ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                      {lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'fr' ? 'Français' : lang === 'de' ? 'Deutsch' : '中文'}
                    </button>)}
                </div>}
            </div>
            {/* Profile Menu */}
            <div className="relative">
              <button onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowLanguageMenu(false);
              setShowNotifications(false);
            }} className="flex items-center space-x-2 focus:outline-none">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                  {currentUser?.avatar ? <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" /> : <UserIcon className="h-6 w-6 m-1 text-gray-600 dark:text-gray-400" />}
                </div>
              </button>
              {showProfileMenu && <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentUser?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {currentUser?.email}
                    </p>
                  </div>
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    {t('profile')}
                  </a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    {t('settings')}
                  </a>
                  <button onClick={() => logout()} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    {t('logout')}
                  </button>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;