const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require('./db');

// Configure CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to set CORS headers manually
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Initialize MongoDB connection
mongoDB();

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Parse incoming JSON requests
app.use(express.json());

// Define your routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
