<?php
include '../conexion.php';

$id = $_GET['id'];
$sql = "SELECT id, nombre, email, rol FROM usuarios WHERE id = $id";

$resultado = $conn->query($sql);

if ($resultado->num_rows == 1) {
    echo json_encode($resultado->fetch_assoc());
} else {
    echo json_encode(["estado" => "error", "mensaje" => "Usuario no encontrado"]);
}
?>
