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
            
            // guardamos en variables todo y creamos las variables necesarias

            //consulta para saber el total de observaciones creadas
            $observacionID = mysqli_fetch_assoc( mysqli_query($conDB, "SELECT count(`observacion_id`) as 'nID' from `observaciones`")); 
            $observacionID = $observacionID["nID"];
            
            $nombreOBS = $data->name;
            
            //consulta para saber el id del usuario que esta insertando la observacion
            $created_by = mysqli_fetch_assoc( mysqli_query($conDB, "SELECT `user_id` FROM `usuarios` WHERE `username` LIKE '" . $_SESSION["id"] . "';"));
            $created_by = $created_by["user_id"];
            
            $created_at = date("Y-m-d");
            $observe_startdate = $data->start;
            $integrationTime = $data->integration;
            $observedObject = $data->target;
            $telescopeUsed = $data->telescopio;
            $filters = $data->filter;
            $progress = rand(1,100); //asignamos un valor aleatorio al progreso por el detalle de tener un porcentaje, no por otra cosa
            
            //consulta
            $insertObsSQL = "INSERT INTO `observaciones`(`observacion_id`, `nombreObservacion`, `created_by`, `created_at`, `observe_startdate`, `integration_totalTime`, `observed_object`, `telescopeUsed`, `filters`, `progress`) VALUES ('$observacionID','$nombreOBS','$created_by','$created_at','$observe_startdate','$integrationTime','$observedObject','$telescopeUsed','$filters','$progress')";
            
            $resInsertObs = mysqli_query($conDB, $insertObsSQL);

            echo $resInsertObs;
        }
    }
?>