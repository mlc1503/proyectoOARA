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
        $sqlObservacionDetalles = "SELECT `objeto_id`, `name`, `catalog` FROM `objetos`";
            $resObjetos = mysqli_query($conDB, $sqlObservacionDetalles);

            //metemos los resultados de la consulta a bd en un array de objetos Producto
            $arrayObjetos = array();
            while ($row = $resObjetos->fetch_assoc()) {
                $arrayObjetos[] = $row;
            }
            
            //exportamos array a JSON
            echo json_encode($arrayObjetos);
    }
?>