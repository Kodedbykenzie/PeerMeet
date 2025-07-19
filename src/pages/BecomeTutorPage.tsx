import React, { useState } from 'react';
import { CheckIcon, AlertCircleIcon, BookOpenIcon, ClockIcon, DollarSignIcon, AwardIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
const BecomeTutorPage: React.FC = () => {
  const {
    currentUser
  } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    subjects: [],
    expertise: '',
    education: '',
    experience: '',
    availability: {
      weekdays: false,
      weekends: false,
      mornings: false,
      afternoons: false,
      evenings: false
    },
    hourlyRate: 0,
    offerFreeIntro: true,
    bio: '',
    profilePicture: currentUser?.avatar || ''
  });
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature', 'History', 'Economics'];
  const handleSubjectToggle = (subject: string) => {
    if (formData.subjects.includes(subject)) {
      setFormData({
        ...formData,
        subjects: formData.subjects.filter(s => s !== subject)
      });
    } else {
      if (formData.subjects.length < 3) {
        setFormData({
          ...formData,
          subjects: [...formData.subjects, subject]
        });
      }
    }
  };
  const handleAvailabilityChange = (key: string) => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        [key]: !formData.availability[key as keyof typeof formData.availability]
      }
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    alert("Your application has been submitted! We'll review it and get back to you soon.");
    // Redirect to dashboard or another page
  };
  return <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Become a Peer Tutor
      </h1>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map(stepNumber => <div key={stepNumber} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                {step > stepNumber ? <CheckIcon className="h-5 w-5" /> : stepNumber}
              </div>
              <span className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                {stepNumber === 1 && 'Expertise'}
                {stepNumber === 2 && 'Availability'}
                {stepNumber === 3 && 'Pricing'}
                {stepNumber === 4 && 'Profile'}
              </span>
            </div>)}
        </div>
        <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700">
          <div className="h-full bg-blue-600" style={{
          width: `${(step - 1) * 33.33}%`
        }}></div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Expertise */}
          {step === 1 && <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Expertise
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select up to 3 subjects you can tutor (required)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {subjects.map(subject => <button key={subject} type="button" onClick={() => handleSubjectToggle(subject)} className={`py-2 px-3 rounded-md text-sm font-medium ${formData.subjects.includes(subject) ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-2 border-blue-500' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'}`}>
                      {subject}
                    </button>)}
                </div>
                {formData.subjects.length === 0 && <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please select at least one subject
                  </p>}
              </div>
              <div className="mb-6">
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Specific topics you're skilled in (required)
                </label>
                <input type="text" id="expertise" name="expertise" value={formData.expertise} onChange={handleInputChange} placeholder="E.g., Calculus, Data Structures, Shakespeare, etc." className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" required />
              </div>
              <div className="mb-6">
                <label htmlFor="education" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your education background (required)
                </label>
                <input type="text" id="education" name="education" value={formData.education} onChange={handleInputChange} placeholder="E.g., Computer Science major at XYZ University" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" required />
              </div>
              <div className="mb-6">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Relevant experience (optional)
                </label>
                <textarea id="experience" name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Describe any teaching or tutoring experience you have" rows={3} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={nextStep} disabled={formData.subjects.length === 0 || !formData.expertise || !formData.education} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  Continue
                </button>
              </div>
            </div>}
          {/* Step 2: Availability */}
          {step === 2 && <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Availability
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  When are you available to tutor? (select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="weekdays" checked={formData.availability.weekdays} onChange={() => handleAvailabilityChange('weekdays')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="weekdays" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Weekdays
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="weekends" checked={formData.availability.weekends} onChange={() => handleAvailabilityChange('weekends')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="weekends" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Weekends
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="mornings" checked={formData.availability.mornings} onChange={() => handleAvailabilityChange('mornings')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="mornings" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Mornings
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="afternoons" checked={formData.availability.afternoons} onChange={() => handleAvailabilityChange('afternoons')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="afternoons" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Afternoons
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="evenings" checked={formData.availability.evenings} onChange={() => handleAvailabilityChange('evenings')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="evenings" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Evenings
                    </label>
                  </div>
                </div>
                {!Object.values(formData.availability).some(Boolean) && <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please select at least one availability option
                  </p>}
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={prevStep} className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Back
                </button>
                <button type="button" onClick={nextStep} disabled={!Object.values(formData.availability).some(Boolean)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  Continue
                </button>
              </div>
            </div>}
          {/* Step 3: Pricing */}
          {step === 3 && <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Pricing
              </h2>
              <div className="mb-6">
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hourly Rate (USD)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                      $
                    </span>
                  </div>
                  <input type="number" name="hourlyRate" id="hourlyRate" value={formData.hourlyRate} onChange={e => setFormData({
                ...formData,
                hourlyRate: Number(e.target.value)
              })} min="0" max="100" className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" placeholder="0" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                      /hour
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Set to 0 if you want to offer free tutoring
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-center">
                  <input type="checkbox" id="offerFreeIntro" checked={formData.offerFreeIntro} onChange={() => setFormData({
                ...formData,
                offerFreeIntro: !formData.offerFreeIntro
              })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="offerFreeIntro" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Offer a free 15-minute introductory session
                  </label>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 pl-6">
                  This helps students get to know you before committing to a
                  full session
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Pricing Tips
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Consider your experience level when setting your rate
                        </li>
                        <li>The average rate for peer tutors is $15-25/hour</li>
                        <li>
                          You can adjust your rate anytime after being approved
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={prevStep} className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Back
                </button>
                <button type="button" onClick={nextStep} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Continue
                </button>
              </div>
            </div>}
          {/* Step 4: Profile */}
          {step === 4 && <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Complete Your Profile
              </h2>
              <div className="mb-6">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Bio (required)
                </label>
                <textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Tell students about your teaching style, why you're passionate about tutoring, and how you can help them succeed." rows={5} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" required />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Minimum 50 characters, maximum 500 characters
                </p>
                {formData.bio && formData.bio.length < 50 && <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    Bio must be at least 50 characters (currently{' '}
                    {formData.bio.length})
                  </p>}
              </div>
              <div className="mb-6">
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profile Picture URL
                </label>
                <input type="text" id="profilePicture" name="profilePicture" value={formData.profilePicture} onChange={handleInputChange} placeholder="https://example.com/your-photo.jpg" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  A clear photo helps build trust with potential students
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-md mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                      Before you submit
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                      <p>
                        Our team will review your application to ensure you meet
                        our requirements. This process typically takes 1-2
                        business days. We may request additional information or
                        verification of your academic credentials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={prevStep} className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Back
                </button>
                <button type="submit" disabled={formData.bio.length < 50} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  Submit Application
                </button>
              </div>
            </div>}
        </form>
      </div>
      {/* Benefits Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Benefits of Being a Peer Tutor
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md mr-4">
                <DollarSignIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Earn While Learning
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Set your own rates and schedule. Tutoring reinforces your own
                  knowledge while helping you earn money.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md mr-4">
                <BookOpenIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Strengthen Your Knowledge
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Teaching others is one of the most effective ways to master a
                  subject and identify gaps in your own understanding.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-start">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-md mr-4">
                <AwardIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Build Your Resume
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Gain valuable teaching experience and positive reviews that
                  enhance your professional credentials.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-start">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-md mr-4">
                <ClockIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Flexible Schedule
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Choose when and how often you want to tutor. Perfect for busy
                  students who need flexibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
// Info icon component
const InfoIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>;
export default BecomeTutorPage;