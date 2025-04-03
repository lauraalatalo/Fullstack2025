// Exercise 1: Setup EJS with Express
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Exercise 2–5: Route with passed data
app.get('/', (req, res) => {

  // Exercise 2: Basic message + list
  // Exercise 5: List of user objects
  // Exercise 4: Boolean value
  const data = {
    message: 'Tervetuloa EJS-harjoituksiin!',
    users: [
      { name: 'Laura', email: 'laura@example.com' },
      { name: 'Mikko', email: 'mikko@example.com' },
      { name: 'Aino', email: 'aino@example.com' }
    ],
    isLoggedIn: true
  };

  res.render('index', data);
});

app.listen(port, () => {
  console.log(`Serveri käynnissä: http://localhost:${port}`);
});
