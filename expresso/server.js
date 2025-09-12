// Import express
const express = require('express');

// Initialize app
const app = express();

// Define a port
const PORT = 3000;

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello Hynox API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
