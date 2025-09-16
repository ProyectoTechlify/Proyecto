<?php
header("Content-Type: application/json");
include "conexion.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    $action = $_GET["action"] ?? "";

    // Registro de persona
    if ($action === "register") {
        $data = json_decode(file_get_contents("php://input"), true);
        $ci = $data["ci"];
        $nombre = $data["nombre"];
        $apellido = $data["apellido"];
        $email = $data["email"];
        $telefono = $data["telefono"];
        $fecha = date("Y-m-d");
        $estado = "activo";

        $sql = "INSERT INTO Persona (ci, nombre, apellido, email, telefono, fecha_registro, estado)
                VALUES ('$ci', '$nombre', '$apellido', '$email', '$telefono', '$fecha', '$estado')";

        if ($conn->query($sql)) {
            echo json_encode(["status" => "ok", "message" => "Usuario registrado"]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }
    }

    // Login (admin o persona)
    if ($action === "login") {
        $data = json_decode(file_get_contents("php://input"), true);
        $usuario = $data["usuario"];
        $pass = $data["contrasena"];

        // Primero buscar en administradores
        $sqlAdmin = "SELECT * FROM Administrador WHERE usuario_ad='$usuario' AND contrasena='$pass'";
        $resAdmin = $conn->query($sqlAdmin);

        if ($resAdmin->num_rows > 0) {
            echo json_encode(["status" => "ok", "tipo" => "admin"]);
            exit;
        }

        // Si no es admin, buscar en personas por CI (usando CI como usuario)
        $sqlPersona = "SELECT * FROM Persona WHERE ci='$usuario'";
        $resPersona = $conn->query($sqlPersona);

        if ($resPersona->num_rows > 0) {
            echo json_encode(["status" => "ok", "tipo" => "persona"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Credenciales inválidas"]);
        }
    }
}
?>
