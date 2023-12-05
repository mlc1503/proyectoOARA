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
        $sqlFotos = "SELECT i.file, ob.nombreObservacion, i.captured_at, ob.integration_totalTime, ob.filters FROM `imagenes` i left join `observaciones` ob on i.project_id = ob.observacion_id";
            $resFotos = mysqli_query($conDB, $sqlFotos);

            // metemos los resultados de la consulta a bd en un array de objetos Producto
            $arrFotos = array();
            while ($row = $resFotos->fetch_assoc()) {
                $arrFotos[] = $row;
            }
            
            //exportamos array a JSON
            echo json_encode($arrFotos);
    }
?>