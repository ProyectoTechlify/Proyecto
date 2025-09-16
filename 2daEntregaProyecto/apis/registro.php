<?php
include '../conexion.php'; // Incluye conexión a base de datos

// Recibe datos enviados por POST
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$contraseña = $_POST['contraseña'];

// Hashea la contraseña para almacenamiento seguro
$hashed = password_hash($contraseña, PASSWORD_DEFAULT);

// Verifica si el email ya está registrado
$sql = "SELECT * FROM usuarios WHERE email = '$email'";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    // Si existe, devuelve error
    echo json_encode(["estado" => "error", "mensaje" => "El correo ya está registrado"]);
} else {
    // Inserta nuevo usuario con contraseña hasheada
    $sql = "INSERT INTO usuarios (nombre, email, contraseña) VALUES ('$nombre', '$email', '$hashed')";
    if ($conn->query($sql)) {
        echo json_encode(["estado" => "ok", "mensaje" => "Registro exitoso"]);
    } else {
        echo json_encode(["estado" => "error", "mensaje" => "Error al registrar"]);
    }
}
?>
