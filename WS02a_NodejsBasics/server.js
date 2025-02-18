const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/HTML; charset=utf-8");


  if (req.url === "/") {
    res.write("<h1>Hello, World!</h1>");
    res.write("<img src='https://www.w3schools.com/w3images/lights.jpg' alt='Lights' style='width:50%'>");
  } else if (req.url === "/about") {
    res.write("<h1>About Page</h1>");
    res.write("<p>This is the About page.</p>");
  } else if (req.url === "/contact") {
    res.write("<h1>Contact Page</h1>");
    res.write("<p>This is the contact page.</p>");
  } else {
    res.statusCode = 404;
    res.write("<strong>Hakemaasi sivua ei löydy! (404)</strong>");
  }
  
  res.end(); // End the response
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});