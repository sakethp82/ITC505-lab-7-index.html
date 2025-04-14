const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express(); // ✅ Define the server first

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Route: Random number generator
server.get('/do_a_random', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.send(`
    <html>
      <head>
        <title>Random Number</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            text-align: center;
            padding-top: 100px;
          }
          h1 {
            color: #333;
            font-size: 36px;
          }
        </style>
      </head>
      <body>
        <h1>Your random number is: ${randomNumber}</h1>
      </body>
    </html>
  `);
});

// Serve static files from /public folder
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Port configuration
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}

server.listen(port, () => {
  console.log(`Ready on localhost:${port}`);
});
