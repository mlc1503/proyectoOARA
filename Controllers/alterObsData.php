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
        $observacion_id = $_POST["observacion_id"];
        $created_by = $_POST["created_by"];
        $observe_startdate = $_POST["observe_startdate"];
        $integration = $_POST["integration"];
        $observed_object = $_POST["observed_object"];
        
        $updateObs = "UPDATE `observaciones` SET `created_by`= '$created_by',`observe_startdate`= '$observe_startdate',`integration_totalTime`='$integration',`observed_object`='$observed_object' WHERE `observacion_id`='$observacion_id';";
        
        if (mysqli_query($conDB, $updateObs)){
            echo 1;
        }
        else{
            echo 0;
        }
    }

?>