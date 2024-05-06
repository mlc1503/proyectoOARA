<?php
    session_start();

    //conexion con DB
    $servername = "localhost";
    $usernameDB = "root";
    $passDB = "";
    $nombreDB = "tfg_manel";

    $conDB = mysqli_connect($servername, $usernameDB, $passDB, $nombreDB);

    if ($conDB->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else{

        if (isset($_POST['data'])) {
            //recogemos el JSON del post
            $data = json_decode($_POST['data']);

            //consulta para saber el id del usuario que esta insertando la observacion
            $created_by = mysqli_fetch_assoc( mysqli_query($conDB, "SELECT `user_id` FROM `usuarios` WHERE `username` LIKE '" . $_SESSION["id"] . "';"));
            $created_by = $created_by["user_id"];
            
            $created_at = date("Y-m-d");
            $dateReservation = $data->dateReservation;
            $fullName = $data->nombreCompleto;
            $tipoReserva = $data->tipoReserva;
            $entReducida = $data->entReducida;
            $nAsistentes = $data->nAsistentes;
            $p_total = $data->p_total;
            
            //consulta
            $insertResSQL = "INSERT INTO `reservas`(`user_id`, `dateReservation`, `fullName`, `tipoReserva`, `entReducida`, `nAsistentes`, `p_total`, `created_at`) VALUES ('$created_by','$dateReservation','$fullName','$tipoReserva','$entReducida','$nAsistentes','$p_total', '$created_at')";
            
            $resInsert = mysqli_query($conDB, $insertResSQL);

            echo $resInsert;
        }
    }
?>