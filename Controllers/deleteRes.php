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
        $resID = $_POST["res_id"];

        $deleteRes = "DELETE FROM `reservas` WHERE `reserva_id` = $resID";
        $res1 = mysqli_query($conDB, $deleteRes);

        
        echo $res1;

    }
?>