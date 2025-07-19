const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const tutorRoutes = require('./routes/tutors');
const sessionRoutes = require('./routes/sessions');
const messageRoutes = require('./routes/messages');
// Load environment variables
dotenv.config();
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/messages', messageRoutes);
// Root route
app.get('/', (req, res) => {
  res.send('PeerMeet API is running');
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});