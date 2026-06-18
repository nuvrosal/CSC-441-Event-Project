CREATE DATABASE IF NOT EXISTS EventProject;

USE EventProject;

CREATE TABLE IF NOT EXISTS Events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_title VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME,
    event_location VARCHAR(150) NOT NULL,
    event_details TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Registrants (
    registrant_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Registrations (
    registration_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    registrant_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES Events(event_id),
    FOREIGN KEY (registrant_id) REFERENCES Registrants(registrant_id)
);

INSERT INTO Events (event_title, event_date, event_time, event_location, event_details)
SELECT 'Community Tech Workshop', '2026-07-15', '10:00:00', 'Detroit Community Center', 'Participants will learn basic web development, including HTML, CSS, and JavaScript.'
WHERE NOT EXISTS (SELECT 1 FROM Events WHERE event_title = 'Community Tech Workshop');

INSERT INTO Events (event_title, event_date, event_time, event_location, event_details)
SELECT 'Health and Wellness Expo', '2026-07-20', '09:00:00', 'New York, NY', 'A community event focused on health resources, wellness activities, and local services.'
WHERE NOT EXISTS (SELECT 1 FROM Events WHERE event_title = 'Health and Wellness Expo');

INSERT INTO Events (event_title, event_date, event_time, event_location, event_details)
SELECT 'Art and Culture Festival', '2026-08-10', '12:00:00', 'Chicago, IL', 'A local festival featuring art, music, food, and cultural activities.'
WHERE NOT EXISTS (SELECT 1 FROM Events WHERE event_title = 'Art and Culture Festival');
