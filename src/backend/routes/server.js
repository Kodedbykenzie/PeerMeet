const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());

// Import your routes (make sure the files exist)
const usersRouter = require('./routes/users');  // <-- this path must exist
app.use('/users', usersRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
