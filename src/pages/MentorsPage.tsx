import React, { useState } from 'react';
import { SearchIcon, FilterIcon, StarIcon, BookOpenIcon, ClockIcon, MapPinIcon } from 'lucide-react';
const MentorsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [availability, setAvailability] = useState<string[]>([]);
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature', 'History', 'Economics'];
  const availabilityOptions = ['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'];
  const mentors = [{
    id: 1,
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Mathematics', 'Physics'],
    rating: 4.9,
    hourlyRate: 35,
    availability: ['Weekdays', 'Evenings'],
    location: 'New York, NY',
    description: 'PhD in Mathematics with 7 years of teaching experience. Specializing in calculus and linear algebra.',
    totalSessions: 124
  }, {
    id: 2,
    name: 'Maria Garcia',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Physics', 'Chemistry'],
    rating: 4.8,
    hourlyRate: 40,
    availability: ['Weekdays', 'Weekends', 'Mornings'],
    location: 'Boston, MA',
    description: "Master's in Physics with expertise in quantum mechanics and thermodynamics. Patient and thorough teaching style.",
    totalSessions: 87
  }, {
    id: 3,
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Computer Science', 'Mathematics'],
    rating: 4.7,
    hourlyRate: 45,
    availability: ['Weekends', 'Afternoons'],
    location: 'San Francisco, CA',
    description: 'Software engineer with 10+ years of experience. Teaches programming, algorithms, and data structures.',
    totalSessions: 156
  }, {
    id: 4,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Literature', 'History'],
    rating: 4.9,
    hourlyRate: 30,
    availability: ['Weekdays', 'Afternoons', 'Evenings'],
    location: 'Chicago, IL',
    description: 'PhD in English Literature. Passionate about helping students improve their writing and critical analysis skills.',
    totalSessions: 92
  }, {
    id: 5,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Biology', 'Chemistry'],
    rating: 4.6,
    hourlyRate: 38,
    availability: ['Weekdays', 'Mornings'],
    location: 'Seattle, WA',
    description: 'Medical student with a strong background in biology and biochemistry. Makes complex concepts easy to understand.',
    totalSessions: 63
  }, {
    id: 6,
    name: 'Emily Wilson',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Economics', 'Mathematics'],
    rating: 4.8,
    hourlyRate: 42,
    availability: ['Weekends', 'Evenings'],
    location: 'Austin, TX',
    description: 'Economics professor with expertise in microeconomics and econometrics. Helps students prepare for exams and research projects.',
    totalSessions: 108
  }];
  // Filter mentors based on search and filters
  const filteredMentors = mentors.filter(mentor => {
    // Search query filter
    const matchesSearch = searchQuery === '' || mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || mentor.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    // Subject filter
    const matchesSubject = selectedSubject === null || mentor.subjects.includes(selectedSubject);
    // Price range filter
    const matchesPrice = mentor.hourlyRate >= priceRange[0] && mentor.hourlyRate <= priceRange[1];
    // Availability filter
    const matchesAvailability = availability.length === 0 || availability.some(a => mentor.availability.includes(a));
    return matchesSearch && matchesSubject && matchesPrice && matchesAvailability;
  });
  return <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Find a Mentor
      </h1>
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search by name or subject" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
          </div>
          <div className="flex items-center space-x-2">
            <FilterIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
              Filters
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <select value={selectedSubject || ''} onChange={e => setSelectedSubject(e.target.value || null)} className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white">
              <option value="">All Subjects</option>
              {subjects.map(subject => <option key={subject} value={subject}>
                  {subject}
                </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price Range
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 dark:text-gray-400">
                ${priceRange[0]}
              </span>
              <input type="range" min="0" max="100" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" />
              <span className="text-gray-600 dark:text-gray-400">
                ${priceRange[1]}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Availability
            </label>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map(option => <button key={option} onClick={() => {
              if (availability.includes(option)) {
                setAvailability(availability.filter(a => a !== option));
              } else {
                setAvailability([...availability, option]);
              }
            }} className={`text-xs px-3 py-1 rounded-full ${availability.includes(option) ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                  {option}
                </button>)}
            </div>
          </div>
        </div>
      </div>
      {/* Mentors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map(mentor => <div key={mentor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img src={mentor.avatar} alt={mentor.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {mentor.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center text-yellow-500">
                      <StarIcon className="h-4 w-4" />
                      <span className="ml-1 text-sm font-medium">
                        {mentor.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-500 dark:text-gray-400">
                      •
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {mentor.totalSessions} sessions
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  {mentor.subjects.join(', ')}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  {mentor.availability.join(', ')}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {mentor.location}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {mentor.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${mentor.hourlyRate}/hr
                </span>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
                  Book Session
                </button>
              </div>
            </div>
          </div>)}
      </div>
      {filteredMentors.length === 0 && <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No mentors found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search query
          </p>
        </div>}
    </div>;
};
export default MentorsPage;