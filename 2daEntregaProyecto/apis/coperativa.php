<?php
header("Content-Type: application/json");
include "conexion.php";

$method = $_SERVER["REQUEST_METHOD"];
$action = $_GET["action"] ?? "";

// Registrar horas de trabajo
if ($method === "POST" && $action === "registrar_horas") {
    $data = json_decode(file_get_contents("php://input"), true);
    $ci = $data["ci"];
    $semana = $data["semana"];
    $tipo = $data["tipo_registro"];
    $cumplidas = $data["horas_cumplidas"];
    $faltantes = $data["horas_faltantes"];
    $motivo = $data["motivo_falta"];

    $sql = "INSERT INTO Hrs_Trabajo (ci, semana, tipo_registro, horas_cumplidas, horas_faltantes, motivo_falta)
            VALUES ('$ci', '$semana', '$tipo', '$cumplidas', '$faltantes', '$motivo')";

    if ($conn->query($sql)) {
        echo json_encode(["status" => "ok", "message" => "Horas registradas"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}

// Subir comprobante de pago
if ($method === "POST" && $action === "subir_comprobante") {
    $ci = $_POST["ci"];
    $mes = $_POST["mes"];
    $monto = $_POST["monto"];

    if (!empty($_FILES["archivo"]["name"])) {
        $nombreArchivo = time() . "_" . basename($_FILES["archivo"]["name"]);
        $ruta = "uploads/" . $nombreArchivo;

        if (move_uploaded_file($_FILES["archivo"]["tmp_name"], $ruta)) {
            $sql = "INSERT INTO Pago_Mensual (ci, mes, monto, comprobante, estado_pago)
                    VALUES ('$ci', '$mes', '$monto', '$nombreArchivo', 'pendiente')";
            if ($conn->query($sql)) {
                echo json_encode(["status" => "ok", "message" => "Comprobante subido"]);
            } else {
                echo json_encode(["status" => "error", "message" => $conn->error]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Error al subir archivo"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No se envió archivo"]);
    }
}
?>
