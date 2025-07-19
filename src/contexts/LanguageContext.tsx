import React, { useEffect, useState, createContext, useContext } from 'react';
// Define available languages
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh';
// Translations for each language
const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    messages: 'Messages',
    mentors: 'Mentors',
    studyGroups: 'Study Groups',
    settings: 'Settings',
    darkMode: 'Dark Mode',
    language: 'Language',
    profile: 'Profile',
    logout: 'Logout'
    // Add more translations as needed
  },
  es: {
    dashboard: 'Panel',
    messages: 'Mensajes',
    mentors: 'Mentores',
    studyGroups: 'Grupos de Estudio',
    settings: 'Configuración',
    darkMode: 'Modo Oscuro',
    language: 'Idioma',
    profile: 'Perfil',
    logout: 'Cerrar Sesión'
  },
  fr: {
    dashboard: 'Tableau de Bord',
    messages: 'Messages',
    mentors: 'Mentors',
    studyGroups: "Groupes d'Étude",
    settings: 'Paramètres',
    darkMode: 'Mode Sombre',
    language: 'Langue',
    profile: 'Profil',
    logout: 'Déconnexion'
  },
  de: {
    dashboard: 'Dashboard',
    messages: 'Nachrichten',
    mentors: 'Mentoren',
    studyGroups: 'Lerngruppen',
    settings: 'Einstellungen',
    darkMode: 'Dunkelmodus',
    language: 'Sprache',
    profile: 'Profil',
    logout: 'Abmelden'
  },
  zh: {
    dashboard: '仪表板',
    messages: '消息',
    mentors: '导师',
    studyGroups: '学习小组',
    settings: '设置',
    darkMode: '深色模式',
    language: '语言',
    profile: '个人资料',
    logout: '登出'
  }
};
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || 'en';
  });
  const availableLanguages: Language[] = ['en', 'es', 'fr', 'de', 'zh'];
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);
  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  return <LanguageContext.Provider value={{
    language,
    setLanguage,
    t,
    availableLanguages
  }}>
      {children}
    </LanguageContext.Provider>;
};
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};