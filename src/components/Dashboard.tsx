import React from 'react';
import { CalendarIcon, UsersIcon, MessageSquareIcon, BookOpenIcon, TrendingUpIcon, ClockIcon, BookIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import ChatWidget from './chat/ChatWidget';
const Dashboard: React.FC = () => {
  const {
    currentUser
  } = useAuth();
  const {
    t
  } = useLanguage();
  const upcomingSessions = [{
    id: 1,
    title: 'Advanced Calculus',
    with: 'Jane Doe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: 'Today',
    time: '4:00 PM',
    duration: '60 min'
  }, {
    id: 2,
    title: 'Data Structures Study Group',
    with: 'Study Group',
    avatar: '',
    date: 'Tomorrow',
    time: '2:30 PM',
    duration: '90 min'
  }];
  const recommendedMentors = [{
    id: 1,
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    expertise: 'Computer Science',
    rating: 4.9
  }, {
    id: 2,
    name: 'Maria Garcia',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    expertise: 'Physics',
    rating: 4.8
  }, {
    id: 3,
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    expertise: 'Mathematics',
    rating: 4.7
  }];
  const recentResources = [{
    id: 1,
    title: 'Calculus Cheat Sheet',
    type: 'PDF',
    author: 'Jane Doe',
    date: '2 days ago'
  }, {
    id: 2,
    title: 'Data Structures Notes',
    type: 'Document',
    author: 'Alex Johnson',
    date: '1 week ago'
  }];
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {currentUser?.name}!
        </p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
            <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Upcoming Sessions
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              2
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
            <UsersIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Active Mentors
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              15
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
            <MessageSquareIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Unread Messages
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              3
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 mr-4">
            <BookOpenIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Study Groups
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              4
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow col-span-1 lg:col-span-2">
          <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upcoming Sessions
            </h2>
            <a href="#calendar" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View Calendar
            </a>
          </div>
          <div className="p-6">
            {upcomingSessions.length === 0 ? <p className="text-gray-600 dark:text-gray-400">
                No upcoming sessions scheduled.
              </p> : <div className="space-y-4">
                {upcomingSessions.map(session => <div key={session.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="mr-4">
                      <div className="bg-white dark:bg-gray-800 rounded-full h-12 w-12 flex items-center justify-center">
                        <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {session.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <UsersIcon className="h-4 w-4 mr-1" />
                          {session.with}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {session.time} ({session.duration})
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {session.date}
                      </div>
                      <button className="mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                        Join Session
                      </button>
                    </div>
                  </div>)}
              </div>}
          </div>
        </div>
        {/* Progress & Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Progress
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Weekly Goal
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  75%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{
                width: '75%'
              }}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                3 of 4 sessions completed
              </p>
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Monthly Streak
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  12 days
                </span>
              </div>
              <div className="flex space-x-1">
                {Array.from({
                length: 7
              }).map((_, i) => <div key={i} className={`h-2 flex-1 rounded-sm ${i < 5 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>)}
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  15
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Sessions
                </div>
              </div>
              <div className="mx-6 h-12 border-l dark:border-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  4.8
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg. Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recommended Mentors */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recommended Mentors
            </h2>
            <a href="#mentors" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </a>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recommendedMentors.map(mentor => <div key={mentor.id} className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                    <img src={mentor.avatar} alt={mentor.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {mentor.expertise}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-500">
                      <span className="text-sm font-medium mr-1">
                        {mentor.rating}
                      </span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                    <button className="mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      View Profile
                    </button>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        {/* Recent Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Resources
            </h2>
            <a href="#resources" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </a>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentResources.map(resource => <div key={resource.id} className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 mr-4">
                    <BookIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {resource.type} • By {resource.author}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {resource.date}
                    </div>
                    <button className="mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      Download
                    </button>
                  </div>
                </div>)}
            </div>
            <div className="mt-6">
              <button className="w-full py-2 px-4 border border-blue-600 rounded-md text-blue-600 dark:border-blue-500 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
                Upload New Resource
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Chat Widget */}
      <ChatWidget />
    </div>;
};
export default Dashboard;