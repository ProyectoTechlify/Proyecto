<?php
include '../conexion.php';

$email = $_POST['email'];
$contraseña = $_POST['contraseña'];

$sql = "SELECT * FROM usuarios WHERE email = '$email'";
$resultado = $conn->query($sql);

if ($resultado->num_rows == 1) {
    $usuario = $resultado->fetch_assoc();

    if (password_verify($contraseña, $usuario['contraseña'])) {
        echo json_encode(["estado" => "ok", "usuario" => $usuario]);
    } else {
        echo json_encode(["estado" => "error", "mensaje" => "Contraseña incorrecta"]);
    }
} else {
    echo json_encode(["estado" => "error", "mensaje" => "Correo no registrado"]);
}
?>
