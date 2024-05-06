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
        $sqlFechasBloqueadas = "SELECT `dateReservation` as 'date', `tipoReserva` FROM `reservas`;";
            
        
        $resultadoFechasBloqueadas = mysqli_query($conDB, $sqlFechasBloqueadas);

            $arrayFechasBloqueadas = array();
            while ($row = $resultadoFechasBloqueadas->fetch_assoc()) {
                $arrayFechasBloqueadas[] = $row;
            }
            
            //exportamos array a JSON
            echo json_encode($arrayFechasBloqueadas);
    }
?>