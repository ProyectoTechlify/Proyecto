<?php
include '../conexion.php'; // Incluye la conexión a la base de datos

header("Content-Type: application/json"); // Define que la respuesta será JSON

$metodo = $_SERVER['REQUEST_METHOD']; // Detecta el método HTTP usado (GET, POST, PUT, DELETE)

switch ($metodo) {
    case 'GET':
        // Obtiene las operaciones asociadas a un usuario dado por ID
        $usuario_id = $_GET['usuario_id'] ?? 0;
        $sql = "SELECT * FROM operaciones WHERE usuario_id = $usuario_id";
        $resultado = $conn->query($sql);
        $datos = [];

        // Extrae todas las filas resultado en un array
        while ($fila = $resultado->fetch_assoc()) {
            $datos[] = $fila;
        }

        echo json_encode($datos); // Devuelve todas las operaciones en JSON
        break;

    case 'POST':
        // Crea una nueva operación con los datos enviados por POST
        $usuario_id = $_POST['usuario_id'];
        $tipo = $_POST['tipo'];
        $monto = $_POST['monto'];
        $fecha = $_POST['fecha'];

        $sql = "INSERT INTO operaciones (usuario_id, tipo, monto, fecha)
                VALUES ($usuario_id, '$tipo', $monto, '$fecha')";

        if ($conn->query($sql)) {
            echo json_encode(["estado" => "ok", "mensaje" => "Operación creada"]);
        } else {
            echo json_encode(["estado" => "error", "mensaje" => "Error al crear operación"]);
        }
        break;

    case 'PUT':
        // Para PUT, los datos vienen en el cuerpo y se parsean aquí
        parse_str(file_get_contents("php://input"), $_PUT);
        $id = $_PUT['id'];
        $tipo = $_PUT['tipo'];
        $monto = $_PUT['monto'];
        $fecha = $_PUT['fecha'];

        $sql = "UPDATE operaciones SET tipo='$tipo', monto=$monto, fecha='$fecha' WHERE id=$id";

        if ($conn->query($sql)) {
            echo json_encode(["estado" => "ok", "mensaje" => "Operación actualizada"]);
        } else {
            echo json_encode(["estado" => "error", "mensaje" => "Error al actualizar"]);
        }
        break;

    case 'DELETE':
        // Similar a PUT, parsea los datos para DELETE y elimina la operación indicada
        parse_str(file_get_contents("php://input"), $_DELETE);
        $id = $_DELETE['id'];

        $sql = "DELETE FROM operaciones WHERE id = $id";

        if ($conn->query($sql)) {
            echo json_encode(["estado" => "ok", "mensaje" => "Operación eliminada"]);
        } else {
            echo json_encode(["estado" => "error", "mensaje" => "Error al eliminar"]);
        }
        break;

    default:
        // Si se usa otro método HTTP, devuelve error
        echo json_encode(["estado" => "error", "mensaje" => "Método no soportado"]);
}
?>
