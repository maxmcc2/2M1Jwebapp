<?php
// Database connection parameters
$servername = "localhost"; // Change this to your database server
$username = "root"; // Change this to your database username
$password = "maxmccauley"; // Change this to your database password
$dbname = "2m1j"; // Change this to your database name



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to select username and password from the database
$sql = "SELECT username, password FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        echo "Username: " . $row["username"]. " - Password: " . $row["password"]. "<br>";
    }
} else {
    echo "0 results";
}

// Close connection
$conn->close();
?>

-->