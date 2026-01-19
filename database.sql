-- Create Database (if not exists)
CREATE DATABASE IF NOT EXISTS project_pioneer_db;
USE project_pioneer_db;

-- Create Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    service_needed VARCHAR(50),
    city VARCHAR(50),
    project_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
