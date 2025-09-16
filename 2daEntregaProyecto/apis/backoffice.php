<?php
header("Content-Type: application/json");
include "conexion.php";

$method = $_SERVER["REQUEST_METHOD"];
$action = $_GET["action"] ?? "";

// Listar pagos pendientes
if ($method === "GET" && $action === "listar_pagos") {
    $sql = "SELECT * FROM Pago_Mensual WHERE estado_pago = 'pendiente'";
    $res = $conn->query($sql);

    $pagos = [];
    while ($row = $res->fetch_assoc()) {
        $pagos[] = $row;
    }
    echo json_encode($pagos);
}

// Aprobar pago
if ($method === "POST" && $action === "aprobar_pago") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id_pago = $data["id_pago"];

    $sql = "UPDATE Pago_Mensual SET estado_pago='aprobado' WHERE id_pago='$id_pago'";
    if ($conn->query($sql)) {
        echo json_encode(["status" => "ok", "message" => "Pago aprobado"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}
?>
