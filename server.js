const express = require('express');
const path = require('path');
const { pool, testConnection } = require('./database');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

// Page routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'events.html'));
});

app.get('/event-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'event-details.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// API: Get all events
app.get('/api/events', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        event_id,
        event_title,
        event_date,
        event_time,
        event_location,
        event_details
      FROM Events
      ORDER BY event_date, event_time
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error loading events:', error.message);
    res.status(500).json({ message: 'Unable to load events.' });
  }
});

// API: Get one event by id
app.get('/api/events/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        event_id,
        event_title,
        event_date,
        event_time,
        event_location,
        event_details
       FROM Events
       WHERE event_id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error loading event details:', error.message);
    res.status(500).json({ message: 'Unable to load event details.' });
  }
});

// API: Save registration
async function saveRegistration(req, res) {
  const { eventId, firstName, lastName } = req.body;

  if (!eventId || !firstName || !lastName) {
    return res.status(400).json({
      message: 'Event, first name, and last name are required.'
    });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [eventRows] = await connection.query(
      'SELECT event_id FROM Events WHERE event_id = ?',
      [eventId]
    );

    if (eventRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Selected event was not found.' });
    }

    const [registrantResult] = await connection.query(
      'INSERT INTO Registrants (first_name, last_name) VALUES (?, ?)',
      [firstName.trim(), lastName.trim()]
    );

    await connection.query(
      'INSERT INTO Registrations (event_id, registrant_id) VALUES (?, ?)',
      [eventId, registrantResult.insertId]
    );

    await connection.commit();

    res.status(201).json({
      message: 'Registration saved successfully.',
      registrantId: registrantResult.insertId,
      eventId: Number(eventId)
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving registration:', error.message);
    res.status(500).json({ message: 'Unable to save registration.' });
  } finally {
    connection.release();
  }
}

app.post('/api/register', saveRegistration);
app.put('/api/register', saveRegistration);

async function startServer() {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Could not connect to MySQL. Check database.js settings and make sure MySQL is running.');
    console.error(error.message);
  }
}

startServer();
