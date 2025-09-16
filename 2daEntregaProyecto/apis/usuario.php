<?php
include '../conexion.php'; // Conexion a BD

$id = $_GET['id']; // Obtener id del usuario desde GET

// Consulta para obtener datos relevantes del usuario
$sql = "SELECT id, nombre, email, rol FROM usuarios WHERE id = $id";

$resultado = $conn->query($sql);

if ($resultado->num_rows == 1) {
    // Retorna datos del usuario encontrado en JSON
    echo json_encode($resultado->fetch_assoc());
} else {
    // Usuario no existe, devuelve error
    echo json_encode(["estado" => "error", "mensaje" => "Usuario no encontrado"]);
}
?>
