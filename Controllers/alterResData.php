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
        $reserva_id = $_POST["reserva_id"];
        $user_id = $_POST["user_id"];
        $dateReservation = $_POST["dateReservation"];
        $fullName = $_POST["fullName"];
        $tipoReserva = $_POST["tipoReserva"];
        
        $updateRes = "UPDATE `reservas` SET `user_id`='$user_id',`dateReservation`='$dateReservation',`fullName`='$fullName',`tipoReserva`='$tipoReserva' WHERE `reserva_id`='$reserva_id';";
        
        if (mysqli_query($conDB, $updateRes)){
            echo 1;
        }
        else{
            echo 0;
        }
            
    }

?>