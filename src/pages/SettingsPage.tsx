import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { BellIcon, LockIcon, UserIcon, GlobeIcon, MoonIcon, BellOffIcon } from 'lucide-react';
const SettingsPage: React.FC = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const {
    language,
    setLanguage,
    availableLanguages
  } = useLanguage();
  const {
    currentUser
  } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'appearance'>('profile');
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    bio: 'I am a student passionate about learning and sharing knowledge.',
    location: 'New York, NY',
    education: 'Computer Science, NYU',
    interests: 'Programming, Mathematics, Physics'
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailMessages: true,
    emailSessions: true,
    emailMarketing: false,
    pushMessages: true,
    pushSessions: true,
    pushReminders: true
  });
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };
  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    alert('Profile updated successfully!');
  };
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the password
    alert('Password updated successfully!');
  };
  return <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Settings
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="sm:flex">
          {/* Sidebar */}
          <div className="sm:w-64 bg-gray-50 dark:bg-gray-700 p-4 sm:p-6">
            <nav className="space-y-1">
              <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'profile' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'}`}>
                <UserIcon className="mr-3 h-5 w-5" />
                <span>Profile</span>
              </button>
              <button onClick={() => setActiveTab('account')} className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'account' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'}`}>
                <LockIcon className="mr-3 h-5 w-5" />
                <span>Account & Security</span>
              </button>
              <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'notifications' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'}`}>
                <BellIcon className="mr-3 h-5 w-5" />
                <span>Notifications</span>
              </button>
              <button onClick={() => setActiveTab('appearance')} className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'appearance' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'}`}>
                <MoonIcon className="mr-3 h-5 w-5" />
                <span>Appearance</span>
              </button>
            </nav>
          </div>
          {/* Content */}
          <div className="flex-1 p-4 sm:p-6">
            {activeTab === 'profile' && <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Profile Information
                </h2>
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input type="text" name="name" id="name" value={profileForm.name} onChange={handleProfileChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <input type="email" name="email" id="email" value={profileForm.email} onChange={handleProfileChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bio
                      </label>
                      <textarea name="bio" id="bio" rows={3} value={profileForm.bio} onChange={handleProfileChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </p>
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location
                      </label>
                      <input type="text" name="location" id="location" value={profileForm.location} onChange={handleProfileChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                      <label htmlFor="education" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Education
                      </label>
                      <input type="text" name="education" id="education" value={profileForm.education} onChange={handleProfileChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Interests
                      </label>
                      <input type="text" name="interests" id="interests" value={profileForm.interests} onChange={handleProfileChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Separate with commas.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>}
            {activeTab === 'account' && <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Account & Security
                </h2>
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Change Password
                  </h3>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Current Password
                        </label>
                        <input type="password" name="current-password" id="current-password" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          New Password
                        </label>
                        <input type="password" name="new-password" id="new-password" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Confirm New Password
                        </label>
                        <input type="password" name="confirm-password" id="confirm-password" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                      </div>
                      <div>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="border-t dark:border-gray-700 pt-6">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete Account
                  </button>
                </div>
              </div>}
            {activeTab === 'notifications' && <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Notification Settings
                </h2>
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="email-messages" name="email-messages" type="checkbox" checked={notificationSettings.emailMessages} onChange={() => handleNotificationChange('emailMessages')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email-messages" className="font-medium text-gray-700 dark:text-gray-300">
                          Messages
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Get notified when someone sends you a message
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="email-sessions" name="email-sessions" type="checkbox" checked={notificationSettings.emailSessions} onChange={() => handleNotificationChange('emailSessions')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email-sessions" className="font-medium text-gray-700 dark:text-gray-300">
                          Session Reminders
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Get notified about upcoming tutoring sessions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="email-marketing" name="email-marketing" type="checkbox" checked={notificationSettings.emailMarketing} onChange={() => handleNotificationChange('emailMarketing')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email-marketing" className="font-medium text-gray-700 dark:text-gray-300">
                          Marketing
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Receive updates about new features and promotions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t dark:border-gray-700 pt-6">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    These are delivered via browser or mobile app when
                    available.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="push-messages" name="push-messages" type="checkbox" checked={notificationSettings.pushMessages} onChange={() => handleNotificationChange('pushMessages')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="push-messages" className="font-medium text-gray-700 dark:text-gray-300">
                          Messages
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Get notified when someone sends you a message
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="push-sessions" name="push-sessions" type="checkbox" checked={notificationSettings.pushSessions} onChange={() => handleNotificationChange('pushSessions')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="push-sessions" className="font-medium text-gray-700 dark:text-gray-300">
                          Session Alerts
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Get notified when a session is about to start
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="push-reminders" name="push-reminders" type="checkbox" checked={notificationSettings.pushReminders} onChange={() => handleNotificationChange('pushReminders')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="push-reminders" className="font-medium text-gray-700 dark:text-gray-300">
                          Reminders
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Get reminders about upcoming deadlines and tasks
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Save Notification Settings
                  </button>
                </div>
              </div>}
            {activeTab === 'appearance' && <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Appearance Settings
                </h2>
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Theme
                  </h3>
                  <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                      <span className="sr-only">Toggle dark mode</span>
                      <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                </div>
                <div className="border-t dark:border-gray-700 pt-6">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Language
                  </h3>
                  <div className="max-w-xs">
                    <select value={language} onChange={e => setLanguage(e.target.value as any)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white">
                      {availableLanguages.map(lang => <option key={lang} value={lang}>
                          {lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'fr' ? 'Français' : lang === 'de' ? 'Deutsch' : '中文'}
                        </option>)}
                    </select>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default SettingsPage;