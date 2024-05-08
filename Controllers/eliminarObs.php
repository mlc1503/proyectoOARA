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
        if (isset($_POST['idObs'])) {
            $data = $_POST['idObs'];

            $deleteSQL = "DELETE FROM `observaciones` WHERE `observacion_id` = ". $data. ";";
            // $resDeleteObs = mysqli_query($conDB, $deleteSQL);
            // echo var_dump($resDeleteObs);
            echo $deleteSQL;
        }
    }
?>