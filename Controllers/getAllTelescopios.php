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
        $sqlObservacionDetalles = "SELECT `telescope_id`, `fl`, `apert`, `fullName` FROM `telescopios`";
            $resTelescopios = mysqli_query($conDB, $sqlObservacionDetalles);

            //metemos los resultados de la consulta a bd en un array de objetos Producto
            $arrayTelescopios = array();
            while ($row = $resTelescopios->fetch_assoc()) {
                $arrayTelescopios[] = $row;
            }
            
            //exportamos array a JSON
            echo json_encode($arrayTelescopios);
    }
?>