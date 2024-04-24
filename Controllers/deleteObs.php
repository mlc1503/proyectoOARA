<?php
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
        $obsID = $_POST["obs_id"];

        $deleteObs = "DELETE FROM `observaciones` WHERE `observacion_id` = $obsID";
        $res1 = mysqli_query($conDB, $deleteObs);

    }
?>