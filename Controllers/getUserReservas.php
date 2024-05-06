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

        if(isset($_SESSION['id'])){
            $userID = $_SESSION['id'];
            $sqlReservasUsuario = "SELECT r.* FROM reservas r where r.user_id = (SELECT user_id from usuarios where username = '$userID');";
                $resultReservasUsuario = mysqli_query($conDB, $sqlReservasUsuario);
    
                // echo $sqlReservasUsuario;
                $arrayReservas = array();
                while ($row = $resultReservasUsuario->fetch_assoc()) {
                    $arrayReservas[] = $row;
                }
                // exportamos array a JSON
                echo json_encode($arrayReservas);
        }
    }
?>