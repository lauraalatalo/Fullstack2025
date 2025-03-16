const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request: ${req.method} ${req.url}`);
  next();
};

const checkCustomHeader = (req, res, next) => {
  if (!req.headers['x-custom-header']) {
    return res.status(400).json({ success: false, message: 'Missing X-Custom-Header' });
  }
  next();
};

app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    res.json({
        success: true,
        message: `Thanks ${name}, your message has been received!`,
        data: { name, email, message }
    });
});

app.post('/add', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading JSON file');
    }

    const users = JSON.parse(data);
    users.push({ name, email });

    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing to JSON file');
      }
      res.json({ success: true, message: 'User added successfully', data: { name, email } });
    });
  });
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/protected', checkCustomHeader, (req, res) => {
  res.json({ success: true, message: 'You have access to this route' });
});

app.get('/list', (req, res) => {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error reading data file' });
    }
    res.send(`<pre>${data}</pre>`);
  });
});  

app.get('/json', (req, res) => {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error reading JSON file' });
    }

const users = JSON.parse(data);

let table = '<table border="1"><tr><th>Name</th><th>Email</th></tr>';
    users.forEach(user => {
      table += `<tr><td>${user.name}</td><td>${user.email}</td></tr>`;
    });
    table += '</table>';

    res.send(table);
  });
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});