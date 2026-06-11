const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'events.html'));
});

app.get('/event-details', (req, res) => {
  const eventId = req.query.event;
  console.log("User clicked event:", eventId);

  res.sendFile(path.join(__dirname, 'views', 'event-details.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// DB stubs
function getAllEvents() { console.log("getAllEvents() called"); }
function getEventById(id) { console.log("getEventById called:", id); }
function saveRegistration(data) { console.log("saveRegistration called:", data); }
function getComments(eventId) { console.log("getComments called:", eventId); }
function addComment(eventId, comment) { console.log("addComment called:", eventId, comment); }

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
