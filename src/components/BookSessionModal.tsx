import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, XIcon, CheckIcon } from 'lucide-react';
interface BookSessionModalProps {
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  hourlyRate: number;
  isOpen: boolean;
  onClose: () => void;
}
const BookSessionModal: React.FC<BookSessionModalProps> = ({
  tutorName,
  tutorAvatar,
  subject,
  hourlyRate,
  isOpen,
  onClose
}) => {
  const [step, setStep] = useState(1);
  const [sessionData, setSessionData] = useState({
    date: '',
    time: '',
    duration: 60,
    topic: '',
    message: '',
    paymentMethod: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setSessionData({
      ...sessionData,
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
    // In a real app, this would submit the booking to the backend
    alert("Session booked successfully! You'll receive a confirmation email shortly.");
    onClose();
  };
  // Generate available dates (next 14 days)
  const availableDates = [...Array(14)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });
  // Generate available time slots
  const availableTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button type="button" onClick={onClose} className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
              <span className="sr-only">Close</span>
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 pt-5 pb-4 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Book a Session with {tutorName}
            </h3>
            {/* Progress indicator */}
            <div className="mt-4 mb-6">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map(stepNumber => <div key={stepNumber} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                      {step > stepNumber ? <CheckIcon className="h-4 w-4" /> : stepNumber}
                    </div>
                    <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                      {stepNumber === 1 && 'Schedule'}
                      {stepNumber === 2 && 'Details'}
                      {stepNumber === 3 && 'Payment'}
                    </span>
                  </div>)}
              </div>
              <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700">
                <div className="h-full bg-blue-600" style={{
                width: `${(step - 1) * 50}%`
              }}></div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Schedule */}
              {step === 1 && <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img src={tutorAvatar} alt={tutorName} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {tutorName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {subject}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {hourlyRate === 0 ? 'Free' : `$${hourlyRate}/hr`}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <CalendarIcon className="inline-block h-4 w-4 mr-1" />{' '}
                      Select Date
                    </label>
                    <select id="date" name="date" value={sessionData.date} onChange={handleInputChange} className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" required>
                      <option value="">Select a date</option>
                      {availableDates.map(date => <option key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                        </option>)}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <ClockIcon className="inline-block h-4 w-4 mr-1" /> Select
                      Time
                    </label>
                    <select id="time" name="time" value={sessionData.time} onChange={handleInputChange} className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" required>
                      <option value="">Select a time</option>
                      {availableTimes.map(time => <option key={time} value={time}>
                          {time} {parseInt(time) < 12 ? 'AM' : 'PM'}
                        </option>)}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Session Duration
                    </label>
                    <select id="duration" name="duration" value={sessionData.duration} onChange={handleInputChange} className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button type="button" onClick={nextStep} disabled={!sessionData.date || !sessionData.time} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      Continue
                    </button>
                  </div>
                </div>}
              {/* Step 2: Details */}
              {step === 2 && <div>
                  <div className="mb-4">
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      What topic do you need help with?
                    </label>
                    <input type="text" id="topic" name="topic" value={sessionData.topic} onChange={handleInputChange} placeholder="E.g., Linear Algebra, Data Structures, Essay Writing" className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Additional information (optional)
                    </label>
                    <textarea id="message" name="message" value={sessionData.message} onChange={handleInputChange} placeholder="Share specific questions or areas you're struggling with" rows={4} className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          Session Details
                        </h3>
                        <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                          <p>
                            Date:{' '}
                            {sessionData.date && new Date(sessionData.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                          </p>
                          <p>
                            Time:{' '}
                            {sessionData.time && `${sessionData.time} ${parseInt(sessionData.time) < 12 ? 'AM' : 'PM'}`}
                          </p>
                          <p>Duration: {sessionData.duration} minutes</p>
                          <p className="mt-2 font-medium">
                            Total:{' '}
                            {hourlyRate === 0 ? 'Free' : `$${(sessionData.duration / 60 * hourlyRate).toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={prevStep} className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Back
                    </button>
                    <button type="button" onClick={nextStep} disabled={!sessionData.topic} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      Continue
                    </button>
                  </div>
                </div>}
              {/* Step 3: Payment */}
              {step === 3 && <div>
                  {hourlyRate === 0 ? <div className="bg-green-50 dark:bg-green-900 p-4 rounded-md mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                            Free Session
                          </h3>
                          <div className="mt-2 text-sm text-green-700 dark:text-green-200">
                            <p>
                              This tutor offers free sessions. No payment
                              information needed.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div> : <>
                      <div className="mb-4">
                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Payment Method
                        </label>
                        <select id="paymentMethod" name="paymentMethod" value={sessionData.paymentMethod} onChange={handleInputChange} className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" required>
                          <option value="">Select payment method</option>
                          <option value="credit-card">Credit Card</option>
                          <option value="paypal">PayPal</option>
                          <option value="apple-pay">Apple Pay</option>
                        </select>
                      </div>
                      {sessionData.paymentMethod === 'credit-card' && <div className="space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Card Number
                            </label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Expiration Date
                              </label>
                              <input type="text" id="expiration" placeholder="MM/YY" className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                            </div>
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                CVV
                              </label>
                              <input type="text" id="cvv" placeholder="123" className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
                            </div>
                          </div>
                        </div>}
                    </>}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mt-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Session Summary
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Date & Time:</span>
                        <span>
                          {sessionData.date && new Date(sessionData.date).toLocaleDateString()}{' '}
                          at {sessionData.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{sessionData.duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Topic:</span>
                        <span>{sessionData.topic}</span>
                      </div>
                      {hourlyRate > 0 && <>
                          <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600 mt-2">
                            <span>Subtotal:</span>
                            <span>
                              $
                              {(sessionData.duration / 60 * hourlyRate).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>
                              $
                              {(sessionData.duration / 60 * hourlyRate).toFixed(2)}
                            </span>
                          </div>
                        </>}
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={prevStep} className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Back
                    </button>
                    <button type="submit" disabled={hourlyRate > 0 && !sessionData.paymentMethod} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      Confirm Booking
                    </button>
                  </div>
                </div>}
            </form>
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
export default BookSessionModal;