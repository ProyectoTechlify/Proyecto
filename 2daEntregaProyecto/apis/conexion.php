<?php
$host = "localhost";     // Servidor donde está la base de datos
$user = "root";          // Usuario de MySQL (phpMyAdmin)
$pass = "1234";              // Contraseña (vacía por defecto en XAMPP)
$db   = "comunidad";     // Nombre de tu base de datos

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
