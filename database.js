const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Load database settings from the .env file without needing another package.
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const equalsIndex = trimmedLine.indexOf('=');

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, equalsIndex).trim();
    const value = trimmedLine.slice(equalsIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const databaseName = process.env.DB_NAME || 'EventProject';

// MySQL connection pool. Settings come from .env.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: databaseName,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
    console.log(`Connected to MySQL database: ${databaseName}`);
  } finally {
    connection.release();
  }
}

module.exports = {
  pool,
  testConnection
};
