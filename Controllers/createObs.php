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
        $nombreObservacion = $_POST["nombreObservacion"];
        $created_by = $_POST["created_by"];
        $created_at = date("Y-m-d");
        $observe_startdate = $_POST["observe_startdate"];
        $integrationTime = $_POST["integration_totalTime"];
        $observed_object = $_POST["observed_object"];
        $telescopeUsed = $_POST["telescopeUsed"];
        $filters = $_POST["filters"];
        $progress = rand(1,100); //asignamos un valor aleatorio al progreso por el detalle de tener un porcentaje, no por otra cosa
        
        //consulta
        $insertObsSQL = "INSERT INTO `observaciones`(`nombreObservacion`, `created_by`, `created_at`, `observe_startdate`, `integration_totalTime`, `observed_object`, `telescopeUsed`, `filters`, `progress`) VALUES ('$nombreObservacion','$created_by','$created_at','$observe_startdate','$integrationTime','$observed_object','$telescopeUsed','$filters','$progress')";

        
        echo mysqli_query($conDB, $insertObsSQL);
    }
?>