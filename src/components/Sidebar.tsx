import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, MessageSquareIcon, UsersIcon, BookOpenIcon, CalendarIcon, SettingsIcon, ChevronRightIcon, BookIcon, TrophyIcon, MessageCircleIcon, FileTextIcon, GraduationCapIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
const Sidebar: React.FC = () => {
  const {
    t
  } = useLanguage();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    resources: false,
    community: false
  });
  const toggleSubmenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  const mainMenuItems = [{
    path: '/',
    icon: <LayoutDashboardIcon size={20} />,
    label: t('dashboard')
  }, {
    path: '/peer-tutors',
    icon: <GraduationCapIcon size={20} />,
    label: 'Peer Tutors'
  }, {
    path: '/messages',
    icon: <MessageSquareIcon size={20} />,
    label: t('messages')
  }, {
    path: '/mentors',
    icon: <UsersIcon size={20} />,
    label: t('mentors')
  }, {
    path: '/study-groups',
    icon: <BookOpenIcon size={20} />,
    label: t('studyGroups')
  }, {
    path: '/calendar',
    icon: <CalendarIcon size={20} />,
    label: 'Calendar'
  }];
  const resourcesMenuItems = [{
    path: '/resources/library',
    icon: <BookIcon size={20} />,
    label: 'Library'
  }, {
    path: '/resources/notes',
    icon: <FileTextIcon size={20} />,
    label: 'Notes'
  }];
  const communityMenuItems = [{
    path: '/community/forums',
    icon: <MessageCircleIcon size={20} />,
    label: 'Forums'
  }, {
    path: '/community/achievements',
    icon: <TrophyIcon size={20} />,
    label: 'Achievements'
  }];
  return <div className={`bg-white dark:bg-gray-800 border-r dark:border-gray-700 ${expanded ? 'w-64' : 'w-20'} transition-width duration-300 flex flex-col`}>
      <div className="p-4 flex items-center justify-between">
        {expanded && <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            PeerMeet
          </span>}
        <button onClick={() => setExpanded(!expanded)} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none">
          <ChevronRightIcon className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-3 py-2">
          {mainMenuItems.map(item => <li key={item.path}>
              <Link to={item.path} className={`flex items-center space-x-3 px-3 py-2 rounded-md ${location.pathname === item.path ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
                <div>{item.icon}</div>
                {expanded && <span>{item.label}</span>}
              </Link>
            </li>)}
          <li>
            <button onClick={() => toggleSubmenu('resources')} className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700`}>
              <div className="flex items-center space-x-3">
                <BookIcon size={20} />
                {expanded && <span>Resources</span>}
              </div>
              {expanded && <ChevronRightIcon className={`h-4 w-4 transition-transform ${expandedMenus.resources ? 'rotate-90' : ''}`} />}
            </button>
            {expanded && expandedMenus.resources && <ul className="mt-1 pl-8 space-y-1">
                {resourcesMenuItems.map(item => <li key={item.path}>
                    <Link to={item.path} className={`flex items-center space-x-3 px-3 py-2 rounded-md ${location.pathname === item.path ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
                      <div>{item.icon}</div>
                      <span>{item.label}</span>
                    </Link>
                  </li>)}
              </ul>}
          </li>
          <li>
            <button onClick={() => toggleSubmenu('community')} className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700`}>
              <div className="flex items-center space-x-3">
                <UsersIcon size={20} />
                {expanded && <span>Community</span>}
              </div>
              {expanded && <ChevronRightIcon className={`h-4 w-4 transition-transform ${expandedMenus.community ? 'rotate-90' : ''}`} />}
            </button>
            {expanded && expandedMenus.community && <ul className="mt-1 pl-8 space-y-1">
                {communityMenuItems.map(item => <li key={item.path}>
                    <Link to={item.path} className={`flex items-center space-x-3 px-3 py-2 rounded-md ${location.pathname === item.path ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
                      <div>{item.icon}</div>
                      <span>{item.label}</span>
                    </Link>
                  </li>)}
              </ul>}
          </li>
        </ul>
        <div className="border-t dark:border-gray-700 mt-4 pt-4">
          <ul className="space-y-1 px-3 py-2">
            <li>
              <Link to="/settings" className={`flex items-center space-x-3 px-3 py-2 rounded-md ${location.pathname === '/settings' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
                <SettingsIcon size={20} />
                {expanded && <span>{t('settings')}</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>;
};
export default Sidebar;