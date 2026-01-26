<?php
// Database configuration
$servername = "localhost";
$username = "u132284133_ppuser";      // Default XAMPP username
$password = "Projectpioneer@2026";          // Default XAMPP password (usually empty)
$dbname = "u132284133_ppdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
