<?php
include '../conexion.php';

$nombre = $_POST['nombre'];
$email = $_POST['email'];
$contraseña = $_POST['contraseña'];

$hashed = password_hash($contraseña, PASSWORD_DEFAULT);

// Verificar si el email ya existe
$sql = "SELECT * FROM usuarios WHERE email = '$email'";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    echo json_encode(["estado" => "error", "mensaje" => "El correo ya está registrado"]);
} else {
    $sql = "INSERT INTO usuarios (nombre, email, contraseña) VALUES ('$nombre', '$email', '$hashed')";
    if ($conn->query($sql)) {
        echo json_encode(["estado" => "ok", "mensaje" => "Registro exitoso"]);
    } else {
        echo json_encode(["estado" => "error", "mensaje" => "Error al registrar"]);
    }
}
?>
