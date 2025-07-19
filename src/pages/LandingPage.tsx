import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, UsersIcon, CalendarIcon, MessageCircleIcon, CheckIcon, ChevronRightIcon, GraduationCapIcon, ArrowRightIcon, StarIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
const LandingPage: React.FC = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const [activeTab, setActiveTab] = useState<'students' | 'mentors'>('students');
  const features = [{
    icon: <UsersIcon className="h-6 w-6 text-blue-500" />,
    title: 'Expert Mentors',
    description: 'Connect with verified mentors specialized in your subjects'
  }, {
    icon: <CalendarIcon className="h-6 w-6 text-blue-500" />,
    title: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule, anytime anywhere'
  }, {
    icon: <MessageCircleIcon className="h-6 w-6 text-blue-500" />,
    title: 'Real-time Messaging',
    description: 'Instant communication with mentors and study groups'
  }, {
    icon: <BookOpenIcon className="h-6 w-6 text-blue-500" />,
    title: 'Resource Library',
    description: 'Access study materials, notes, and practice tests'
  }];
  const testimonials = [{
    name: 'Alex Johnson',
    role: 'Computer Science Student',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'PeerMeet transformed my learning experience. I was struggling with advanced algorithms, but after a few sessions with my mentor, I improved my grades significantly.'
  }, {
    name: 'Maria Garcia',
    role: 'Physics Mentor',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'As a mentor, PeerMeet has given me a platform to share my knowledge and help students achieve their academic goals. The scheduling system is incredibly flexible.'
  }, {
    name: 'David Kim',
    role: 'Mathematics Student',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: "The study groups feature is amazing! I've connected with peers who share my academic interests, and we've helped each other succeed in our courses."
  }];
  const pricingPlans = [{
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for occasional help',
    features: ['5 mentoring sessions/month', 'Access to study groups', 'Basic resource library', 'Community forum access'],
    cta: 'Get Started',
    popular: false
  }, {
    name: 'Premium',
    price: '$19.99/month',
    description: 'Ideal for regular students',
    features: ['Unlimited mentoring sessions', 'Priority mentor matching', 'Full resource library access', 'Advanced progress tracking', 'Group study sessions'],
    cta: 'Start Free Trial',
    popular: true
  }, {
    name: 'Mentor',
    price: '$9.99/month',
    description: 'For educators and tutors',
    features: ['Mentor profile listing', 'Scheduling tools', 'Payment processing', 'Performance analytics', 'Resource publishing'],
    cta: 'Become a Mentor',
    popular: false
  }];
  return <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header/Navigation */}
      <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                PeerMeet
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
                How It Works
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
                Testimonials
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
                Pricing
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none">
                {theme === 'dark' ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>}
              </button>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
                Log In
              </Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Unlock Your Academic Potential
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Connect with expert mentors, join study groups, and access
                resources to excel in your studies.
              </p>
              <div className="flex space-x-4">
                <Link to="/register" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium text-lg">
                  Get Started
                </Link>
                <a href="#how-it-works" className="border border-white text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-md font-medium text-lg flex items-center">
                  Learn More <ChevronRightIcon className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" alt="Students collaborating" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                10,000+
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Active Students
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                1,500+
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Expert Mentors
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                25,000+
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Sessions Completed
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                4.8/5
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Average Rating
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why Choose PeerMeet?
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform is designed to make learning collaborative,
              accessible, and effective.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              How PeerMeet Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Simple steps to start learning or mentoring
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md p-1 bg-gray-100 dark:bg-gray-800">
              <button onClick={() => setActiveTab('students')} className={`px-6 py-2 text-sm font-medium rounded-md ${activeTab === 'students' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow' : 'text-gray-700 dark:text-gray-300'}`}>
                For Students
              </button>
              <button onClick={() => setActiveTab('mentors')} className={`px-6 py-2 text-sm font-medium rounded-md ${activeTab === 'mentors' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow' : 'text-gray-700 dark:text-gray-300'}`}>
                For Mentors
              </button>
            </div>
          </div>
          {activeTab === 'students' ? <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                    1
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Create Your Profile
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign up and tell us about your academic interests and goals
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                    2
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Find Your Mentor
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Browse profiles or get matched with the perfect mentor for
                  your needs
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                    3
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Schedule & Learn
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Book sessions, access resources, and achieve your academic
                  goals
                </p>
              </div>
            </div> : <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                    1
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Apply as a Mentor
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create your profile highlighting your expertise and teaching
                  style
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                    2
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Set Your Schedule
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Define your availability and the subjects you want to teach
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                    3
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Start Mentoring
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with students, conduct sessions, and earn as you help
                  others succeed
                </p>
              </div>
            </div>}
          <div className="text-center mt-12">
            <Link to="/register" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-lg">
              Get Started Now <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What Our Users Say
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hear from students and mentors who have transformed their academic
              journey with PeerMeet.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map(star => <StarIcon key={star} className="inline-block h-5 w-5 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
              </div>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students and mentors who are already using
            PeerMeet to achieve their academic goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-md font-medium text-lg">
              Sign Up Now
            </Link>
            <Link to="/login" className="border border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-md font-medium text-lg">
              Log In
            </Link>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PeerMeet</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#press" className="text-gray-400 hover:text-white">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#help" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#tutorials" className="text-gray-400 hover:text-white">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#webinars" className="text-gray-400 hover:text-white">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-white">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#twitter" className="text-gray-400 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#facebook" className="text-gray-400 hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#instagram" className="text-gray-400 hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#linkedin" className="text-gray-400 hover:text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 PeerMeet. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#twitter" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#facebook" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#instagram" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default LandingPage;