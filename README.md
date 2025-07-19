# PeerMeet - Peer-to-Peer Learning Platform
PeerMeet is a comprehensive peer-to-peer learning platform that connects students with knowledgeable peers and mentors. It facilitates knowledge sharing, collaboration, and skill development through personalized tutoring sessions, study groups, and resource sharing.
![PeerMeet Dashboard](https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)
## Features
### Core Features
- **Peer Tutoring Marketplace**: Connect with peers who have expertise in specific subjects
- **Session Booking**: Schedule and manage tutoring sessions with flexible timing
- **Real-time Messaging**: Communicate directly with tutors and peers
- **Study Groups**: Create and join collaborative study groups
- **Resource Library**: Access and share educational materials
- **User Profiles**: Showcase expertise and experience as a tutor or student
### Tutor Features
- **Tutor Onboarding**: Simple process to become a peer tutor
- **Pricing Control**: Set your own rates or offer free tutoring
- **Availability Management**: Define when you're available to teach
- **Endorsements**: Receive recognition for your teaching skills
- **Session Management**: Track scheduled and completed sessions
### Student Features
- **Tutor Discovery**: Find peers with expertise in specific subjects
- **Advanced Filtering**: Filter tutors by subject, price, availability, and more
- **Session Booking**: Book sessions with preferred tutors
- **Reviews & Ratings**: Leave feedback after sessions
- **Progress Tracking**: Monitor your learning journey
## Tech Stack
### Frontend
- **React**: UI library for building the user interface
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing
- **Lucide React**: Icon library
### Backend
- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication using JSON Web Tokens
- **bcrypt**: Password hashing
## Getting Started
### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
### Installation
#### Frontend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/peermeet.git
   cd peermeet
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm start
   ```
4. The application will be available at `http://localhost:3000`
#### Backend Setup
1. Navigate to the backend directory
   ```bash
   cd backend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your configuration
   ```bash
   cp .env.example .env
   ```
4. Start the server
   ```bash
   npm run dev
   ```
5. The API will be available at `http://localhost:5000`
## API Documentation
### Authentication Endpoints
#### Register a new user