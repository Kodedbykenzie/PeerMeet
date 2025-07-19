import React, { useState } from 'react';
import { SearchIcon, FilterIcon, PlusIcon, BookIcon, FileTextIcon, FileIcon, VideoIcon, DownloadIcon, StarIcon, EyeIcon, UploadIcon } from 'lucide-react';
const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature', 'History', 'Economics'];
  const resourceTypes = ['Document', 'PDF', 'Video', 'Image', 'Audio'];
  const resources = [{
    id: 1,
    title: 'Calculus Fundamentals',
    type: 'PDF',
    subject: 'Mathematics',
    description: 'Comprehensive guide covering limits, derivatives, and integrals with practice problems.',
    uploadedBy: 'Alex Johnson',
    uploadDate: '2023-05-15',
    downloads: 358,
    rating: 4.8,
    views: 1245,
    fileSize: '2.4 MB',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  }, {
    id: 2,
    title: 'Introduction to Quantum Mechanics',
    type: 'Video',
    subject: 'Physics',
    description: 'Video lecture series explaining the basics of quantum mechanics and wave functions.',
    uploadedBy: 'Maria Garcia',
    uploadDate: '2023-06-02',
    downloads: 127,
    rating: 4.9,
    views: 892,
    fileSize: '450 MB',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  }, {
    id: 3,
    title: 'Data Structures and Algorithms',
    type: 'Document',
    subject: 'Computer Science',
    description: 'Comprehensive notes on common data structures and algorithms with implementation examples.',
    uploadedBy: 'David Kim',
    uploadDate: '2023-05-28',
    downloads: 412,
    rating: 4.7,
    views: 1567,
    fileSize: '3.2 MB',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  }, {
    id: 4,
    title: 'Organic Chemistry Reaction Mechanisms',
    type: 'PDF',
    subject: 'Chemistry',
    description: 'Detailed guide to organic chemistry reaction mechanisms with illustrations and examples.',
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2023-06-10',
    downloads: 203,
    rating: 4.6,
    views: 879,
    fileSize: '4.1 MB',
    thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  }, {
    id: 5,
    title: 'Literary Analysis Techniques',
    type: 'Document',
    subject: 'Literature',
    description: 'Guide to analyzing literature including character, theme, and narrative analysis methods.',
    uploadedBy: 'Emily Wilson',
    uploadDate: '2023-05-20',
    downloads: 156,
    rating: 4.5,
    views: 723,
    fileSize: '1.8 MB',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  }, {
    id: 6,
    title: 'Macroeconomics Study Guide',
    type: 'PDF',
    subject: 'Economics',
    description: 'Comprehensive study guide covering key macroeconomic concepts and models.',
    uploadedBy: 'Michael Chen',
    uploadDate: '2023-06-05',
    downloads: 289,
    rating: 4.7,
    views: 1034,
    fileSize: '2.9 MB',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  }, {
    id: 7,
    title: 'Cell Biology Animations',
    type: 'Video',
    subject: 'Biology',
    description: 'Animated videos explaining cellular processes and functions with narration.',
    uploadedBy: 'Jessica Taylor',
    uploadDate: '2023-06-12',
    downloads: 178,
    rating: 4.9,
    views: 823,
    fileSize: '350 MB',
    thumbnail: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  }, {
    id: 8,
    title: 'World History Timeline',
    type: 'Image',
    subject: 'History',
    description: 'Detailed timeline of major world events from ancient civilizations to modern times.',
    uploadedBy: 'Robert Adams',
    uploadDate: '2023-05-25',
    downloads: 321,
    rating: 4.6,
    views: 1189,
    fileSize: '5.7 MB',
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  }];
  // Filter resources based on search and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery === '' || resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === null || resource.type === selectedType;
    const matchesSubject = selectedSubject === null || resource.subject === selectedSubject;
    return matchesSearch && matchesType && matchesSubject;
  });
  // Get resource icon based on type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileTextIcon className="h-6 w-6 text-red-500" />;
      case 'Document':
        return <FileIcon className="h-6 w-6 text-blue-500" />;
      case 'Video':
        return <VideoIcon className="h-6 w-6 text-purple-500" />;
      case 'Image':
        return <FileIcon className="h-6 w-6 text-green-500" />;
      case 'Audio':
        return <FileIcon className="h-6 w-6 text-yellow-500" />;
      default:
        return <BookIcon className="h-6 w-6 text-gray-500" />;
    }
  };
  return <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Resource Library
        </h1>
        <button onClick={() => setShowUploadModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <UploadIcon className="-ml-1 mr-2 h-5 w-5" />
          Upload Resource
        </button>
      </div>
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search resources" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
          </div>
          <div className="flex items-center space-x-2">
            <FilterIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
              Filters
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Resource Type
            </label>
            <select value={selectedType || ''} onChange={e => setSelectedType(e.target.value || null)} className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white">
              <option value="">All Types</option>
              {resourceTypes.map(type => <option key={type} value={type}>
                  {type}
                </option>)}
            </select>
          </div>
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
        </div>
      </div>
      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredResources.map(resource => <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {resource.title}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {resource.subject}
                    </span>
                    <span className="mx-2 text-gray-500 dark:text-gray-400">
                      •
                    </span>
                    <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                      {resource.type}
                    </span>
                  </div>
                </div>
                <div className="ml-4">{getResourceIcon(resource.type)}</div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {resource.description}
              </p>
              <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span>By {resource.uploadedBy}</span>
                <span className="mx-2">•</span>
                <span>
                  {new Date(resource.uploadDate).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-500" />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                      {resource.rating}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                      {resource.views}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {resource.fileSize}
                </span>
              </div>
              <div className="mt-4">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>)}
      </div>
      {filteredResources.length === 0 && <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <BookIcon className="h-full w-full" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            No resources found
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Try adjusting your filters or upload a new resource
          </p>
          <div className="mt-6">
            <button onClick={() => setShowUploadModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <UploadIcon className="-ml-1 mr-2 h-5 w-5" />
              Upload Resource
            </button>
          </div>
        </div>}
      {/* Upload Modal */}
      {showUploadModal && <div className="fixed z-10 inset-0 overflow-y-auto">
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
                      Upload Resource
                    </h3>
                    <div className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Title
                        </label>
                        <input type="text" id="title" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
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
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Resource Type
                        </label>
                        <select id="type" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white">
                          <option value="">Select resource type</option>
                          {resourceTypes.map(type => <option key={type} value={type}>
                              {type}
                            </option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Description
                        </label>
                        <textarea id="description" rows={3} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Upload File
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PDF, DOC, PPT, MP4, JPG up to 100MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Upload
                </button>
                <button type="button" onClick={() => setShowUploadModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default ResourcesPage;