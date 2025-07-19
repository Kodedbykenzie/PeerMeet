import React, { useState } from 'react';
import { UsersIcon, CalendarIcon, ClockIcon, PlusIcon, SearchIcon, FilterIcon, BookIcon } from 'lucide-react';
const StudyGroupsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature', 'History', 'Economics'];
  const studyGroups = [{
    id: 1,
    name: 'Calculus Study Group',
    subject: 'Mathematics',
    members: 8,
    maxMembers: 10,
    schedule: 'Tuesdays & Thursdays',
    time: '6:00 PM - 8:00 PM',
    description: 'A group for students taking Calculus I and II. We focus on problem-solving and exam preparation.',
    creator: {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }, {
    id: 2,
    name: 'Quantum Physics Discussion',
    subject: 'Physics',
    members: 5,
    maxMembers: 8,
    schedule: 'Wednesdays',
    time: '7:00 PM - 9:00 PM',
    description: 'Advanced discussion group for quantum mechanics and related topics in modern physics.',
    creator: {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }, {
    id: 3,
    name: 'Algorithm Practice',
    subject: 'Computer Science',
    members: 12,
    maxMembers: 15,
    schedule: 'Saturdays',
    time: '10:00 AM - 12:00 PM',
    description: 'Weekly coding sessions to practice algorithms and data structures. Great for interview prep!',
    creator: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }, {
    id: 4,
    name: 'Organic Chemistry Lab Prep',
    subject: 'Chemistry',
    members: 6,
    maxMembers: 10,
    schedule: 'Mondays & Fridays',
    time: '5:00 PM - 6:30 PM',
    description: 'Group for preparing for organic chemistry lab sessions and discussing experimental techniques.',
    creator: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }, {
    id: 5,
    name: 'Literature Analysis Circle',
    subject: 'Literature',
    members: 7,
    maxMembers: 12,
    schedule: 'Sundays',
    time: '3:00 PM - 5:00 PM',
    description: 'We discuss classic and contemporary literature, focusing on themes, characters, and writing techniques.',
    creator: {
      name: 'Emily Wilson',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }, {
    id: 6,
    name: 'Macroeconomics Study Group',
    subject: 'Economics',
    members: 9,
    maxMembers: 15,
    schedule: 'Thursdays',
    time: '7:30 PM - 9:00 PM',
    description: 'Group for discussing economic theories, current events, and exam preparation for macroeconomics courses.',
    creator: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }];
  // Filter study groups based on search and subject
  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = searchQuery === '' || group.name.toLowerCase().includes(searchQuery.toLowerCase()) || group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === null || group.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });
  return <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Study Groups
        </h1>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Create Group
        </button>
      </div>
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search study groups" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
          </div>
          <div className="flex items-center space-x-2">
            <FilterIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
              Filter by Subject:
            </span>
            <select value={selectedSubject || ''} onChange={e => setSelectedSubject(e.target.value || null)} className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white">
              <option value="">All Subjects</option>
              {subjects.map(subject => <option key={subject} value={subject}>
                  {subject}
                </option>)}
            </select>
          </div>
        </div>
      </div>
      {/* Study Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map(group => <div key={group.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {group.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <BookIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      {group.subject}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                  {group.members}/{group.maxMembers} members
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {group.schedule}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  {group.time}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {group.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                    <img src={group.creator.avatar} alt={group.creator.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Created by {group.creator.name}
                  </span>
                </div>
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
                  Join
                </button>
              </div>
            </div>
          </div>)}
      </div>
      {filteredGroups.length === 0 && <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <UsersIcon className="h-full w-full" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            No study groups found
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Try adjusting your filters or create a new study group
          </p>
          <div className="mt-6">
            <button onClick={() => setShowModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Create Study Group
            </button>
          </div>
        </div>}
      {/* Create Study Group Modal */}
      {showModal && <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Create Study Group
                    </h3>
                    <div className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="group-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Group Name
                        </label>
                        <input type="text" id="group-name" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Subject
                        </label>
                        <select id="subject" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white">
                          <option value="">Select a subject</option>
                          {subjects.map(subject => <option key={subject} value={subject}>
                              {subject}
                            </option>)}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Schedule
                          </label>
                          <input type="text" id="schedule" placeholder="e.g., Mondays & Wednesdays" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Time
                          </label>
                          <input type="text" id="time" placeholder="e.g., 6:00 PM - 8:00 PM" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="max-members" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Maximum Members
                        </label>
                        <input type="number" id="max-members" min="2" max="50" defaultValue="10" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Description
                        </label>
                        <textarea id="description" rows={3} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Create
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default StudyGroupsPage;