<?php
include '../conexion.php'; // Incluye la conexión a la base de datos

// Obtiene los datos enviados por POST desde el formulario
$email = $_POST['email'];
$contraseña = $_POST['contraseña'];

// Consulta para buscar un usuario con el email enviado
$sql = "SELECT * FROM usuarios WHERE email = '$email'";
$resultado = $conn->query($sql);

if ($resultado->num_rows == 1) {
    // Si encontró exactamente un usuario, lo guarda en un array asociativo
    $usuario = $resultado->fetch_assoc();

    // Verifica que la contraseña enviada coincida con la almacenada (hash)
    if (password_verify($contraseña, $usuario['contraseña'])) {
        // Contraseña correcta: devuelve estado OK y datos del usuario en JSON
        echo json_encode(["estado" => "ok", "usuario" => $usuario]);
    } else {
        // Contraseña incorrecta: devuelve error con mensaje
        echo json_encode(["estado" => "error", "mensaje" => "Contraseña incorrecta"]);
    }
} else {
    // No encontró usuario con ese email: devuelve error con mensaje
    echo json_encode(["estado" => "error", "mensaje" => "Correo no registrado"]);
}
?>
