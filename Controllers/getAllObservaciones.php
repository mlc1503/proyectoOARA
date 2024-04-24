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
        $sqlDetallesObs = "SELECT obs.observacion_id, us.username, obs.observe_startdate, obs.integration_totalTime, obj.catalog
                                FROM observaciones obs, usuarios us, objetos obj
                                WHERE obs.created_by = us.user_id 
                                    AND obs.observed_object = obj.objeto_id ORDER BY obs.observacion_id;";
        $resultadoDetallesObs = mysqli_query($conDB, $sqlDetallesObs);

        $arrayObs = array();
        while ($row = $resultadoDetallesObs->fetch_assoc()) {
            $arrayObs[] = $row;
        }
        
        //exportamos array a JSON
        echo json_encode($arrayObs);
    }
?>