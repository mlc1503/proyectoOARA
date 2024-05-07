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
        $sqlDetallesUsuario = "SELECT `r`.`reserva_id`, `u`.`username`, `r`.`dateReservation`, `r`.`fullName`, `r`.`tipoReserva` FROM `reservas` `r`, `usuarios` `u` WHERE `u`.`user_id` = `r`.`user_id`;";
            $resultadoDetallesUsuario = mysqli_query($conDB, $sqlDetallesUsuario);

            $arrayUsuario = array();
            while ($row = $resultadoDetallesUsuario->fetch_assoc()) {
                $arrayUsuario[] = $row;
            }
            
            //exportamos array a JSON
            echo json_encode($arrayUsuario);
    }
?>