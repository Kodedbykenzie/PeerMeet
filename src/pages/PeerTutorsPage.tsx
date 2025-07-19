import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, StarIcon, BookOpenIcon, ClockIcon, MapPinIcon, CheckCircleIcon, DollarSignIcon, TagIcon, ThumbsUpIcon } from 'lucide-react';
const PeerTutorsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature', 'History', 'Economics'];
  const availabilityOptions = ['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'];
  // Mock peer tutors data
  const peerTutors = [{
    id: 1,
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Mathematics', 'Computer Science'],
    university: 'MIT',
    year: 'Senior',
    rating: 4.9,
    hourlyRate: 15,
    verified: true,
    availability: ['Weekdays', 'Evenings'],
    description: 'Math major with experience tutoring calculus and linear algebra. I break down complex concepts into simple terms.',
    sessionCount: 48,
    endorsements: 23,
    freeIntro: true
  }, {
    id: 2,
    name: 'Maria Garcia',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Physics', 'Mathematics'],
    university: 'Stanford',
    year: 'Junior',
    rating: 4.8,
    hourlyRate: 0,
    verified: true,
    availability: ['Weekends', 'Afternoons'],
    description: 'Physics enthusiast offering free help with mechanics and electromagnetism. I love helping others understand difficult concepts.',
    sessionCount: 36,
    endorsements: 18,
    freeIntro: false
  }, {
    id: 3,
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Computer Science', 'Economics'],
    university: 'UC Berkeley',
    year: 'Graduate',
    rating: 4.7,
    hourlyRate: 20,
    verified: true,
    availability: ['Weekdays', 'Weekends', 'Evenings'],
    description: 'CS grad student specializing in algorithms and data structures. I can help with coding assignments and interview prep.',
    sessionCount: 65,
    endorsements: 31,
    freeIntro: true
  }, {
    id: 4,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Literature', 'History'],
    university: 'NYU',
    year: 'Senior',
    rating: 4.9,
    hourlyRate: 18,
    verified: false,
    availability: ['Weekdays', 'Mornings'],
    description: 'English literature major with a passion for helping others improve their writing and critical analysis skills.',
    sessionCount: 27,
    endorsements: 15,
    freeIntro: false
  }, {
    id: 5,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Biology', 'Chemistry'],
    university: 'UCLA',
    year: 'Junior',
    rating: 4.6,
    hourlyRate: 0,
    verified: false,
    availability: ['Weekends'],
    description: 'Pre-med student offering free help with biology and organic chemistry. I use visual aids and mnemonics to simplify complex topics.',
    sessionCount: 19,
    endorsements: 11,
    freeIntro: false
  }, {
    id: 6,
    name: 'Emily Wilson',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subjects: ['Economics', 'Mathematics'],
    university: 'Harvard',
    year: 'Graduate',
    rating: 4.8,
    hourlyRate: 22,
    verified: true,
    availability: ['Weekdays', 'Afternoons', 'Evenings'],
    description: 'Economics grad student with a strong background in statistics and econometrics. I help students master economic principles and data analysis.',
    sessionCount: 53,
    endorsements: 29,
    freeIntro: true
  }];
  // Filter peer tutors based on search and filters
  const filteredTutors = peerTutors.filter(tutor => {
    // Search query filter
    const matchesSearch = searchQuery === '' || tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) || tutor.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) || tutor.description.toLowerCase().includes(searchQuery.toLowerCase());
    // Subject filter
    const matchesSubject = selectedSubject === null || tutor.subjects.includes(selectedSubject);
    // Price filter
    const matchesPrice = priceFilter === 'all' || priceFilter === 'free' && tutor.hourlyRate === 0 || priceFilter === 'paid' && tutor.hourlyRate > 0;
    // Verified filter
    const matchesVerified = !verifiedOnly || tutor.verified;
    // Availability filter
    const matchesAvailability = availabilityFilter.length === 0 || availabilityFilter.some(a => tutor.availability.includes(a));
    return matchesSearch && matchesSubject && matchesPrice && matchesVerified && matchesAvailability;
  });
  return <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Find Peer Tutors
        </h1>
        <Link to="/become-tutor" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Become a Peer Tutor
        </Link>
      </div>
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search by name, subject, or keywords" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
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
              Price
            </label>
            <div className="flex space-x-2">
              <button onClick={() => setPriceFilter('all')} className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${priceFilter === 'all' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'}`}>
                All
              </button>
              <button onClick={() => setPriceFilter('free')} className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${priceFilter === 'free' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'}`}>
                Free
              </button>
              <button onClick={() => setPriceFilter('paid')} className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${priceFilter === 'paid' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'}`}>
                Paid
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Verified Only
              </label>
              <button onClick={() => setVerifiedOnly(!verifiedOnly)} className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${verifiedOnly ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <span className="sr-only">Toggle verified only</span>
                <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${verifiedOnly ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Verified tutors have been endorsed by faculty or have completed
              our certification process.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Availability
          </label>
          <div className="flex flex-wrap gap-2">
            {availabilityOptions.map(option => <button key={option} onClick={() => {
            if (availabilityFilter.includes(option)) {
              setAvailabilityFilter(availabilityFilter.filter(a => a !== option));
            } else {
              setAvailabilityFilter([...availabilityFilter, option]);
            }
          }} className={`text-xs px-3 py-1 rounded-full ${availabilityFilter.includes(option) ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                {option}
              </button>)}
          </div>
        </div>
      </div>
      {/* Tutors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.map(tutor => <div key={tutor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img src={tutor.avatar} alt={tutor.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {tutor.name}
                    </h3>
                    {tutor.verified && <CheckCircleIcon className="ml-2 h-5 w-5 text-blue-500" title="Verified Tutor" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tutor.university} • {tutor.year}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center text-yellow-500">
                      <StarIcon className="h-4 w-4" />
                      <span className="ml-1 text-sm font-medium">
                        {tutor.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-500 dark:text-gray-400">
                      •
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {tutor.sessionCount} sessions
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {tutor.subjects.map(subject => <span key={subject} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {subject}
                    </span>)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 h-10">
                  {tutor.description}
                </p>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>{tutor.availability.join(', ')}</span>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                <ThumbsUpIcon className="h-4 w-4 mr-1" />
                <span>{tutor.endorsements} endorsements</span>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSignIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="ml-1 text-lg font-bold text-gray-900 dark:text-white">
                    {tutor.hourlyRate === 0 ? 'Free' : `$${tutor.hourlyRate}/hr`}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {tutor.freeIntro && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Free intro
                    </span>}
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          </div>)}
      </div>
      {filteredTutors.length === 0 && <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No peer tutors found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search query
          </p>
        </div>}
    </div>;
};
export default PeerTutorsPage;