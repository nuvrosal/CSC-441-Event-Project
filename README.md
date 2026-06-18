# CSC-441-Event-Project

Event Browsing & Registration Team Project

## Database Connection Added

This project now connects to a MySQL database using `mysql2`.

### 1. Install project packages

```bash
npm install
```

### 2. Create the MySQL database

Open MySQL Workbench and run this file:

```text
sql/sql.sql
```

This creates:

- `Events`
- `Registrants`
- `Registrations`

It also adds a few sample events.

### 3. Check your database login

Open `database.js` and update the password if needed:

```js
user: process.env.DB_USER || 'root',
password: process.env.DB_PASSWORD || '',
database: process.env.DB_NAME || 'EventProject'
```

If your MySQL root account has a password, place it in the password value.

Example:

```js
password: process.env.DB_PASSWORD || 'yourpassword'
```

### 4. Start the server

```bash
npm start
```

Then open:

```text
http://localhost:8080
```

## API Routes Added

- `GET /api/events` - loads all events from MySQL
- `GET /api/events/:id` - loads one event by ID
- `POST /api/register` - saves a registrant and connects that person to an event

## Page Updates

- `views/events.html` now loads events from the database.
- `views/event-details.html` now loads event details by event ID.
- `views/register.html` now loads database events into the dropdown and saves registrations.

## MongoDB Review Seed Data

This project also includes sample MongoDB reviews/comments for each event.

After MongoDB is running and your `.env` file has `MONGO_URI`, run:

```bash
npm run seed:reviews
```

This adds 5 reviews for each of the 10 sample events, for a total of 50 MongoDB review documents.

