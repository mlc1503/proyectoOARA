<?php
    $uName = $_POST['username'];  
    $uPass = $_POST['password'];  
    $uEmail = $_POST['email'];

    //datos para conectar con DB
    $servername = "localhost";
    $usernameDB = "root";
    $passDB = "";
    $nombreDB = "tfg_manel";

    $conDB = mysqli_connect($servername, $usernameDB, $passDB, $nombreDB);
    
    // Comprobamos que la conexion esté bien:
    if(!$conDB->connect_error) {

        if(!checkEmailExists($uEmail, $conDB)){
            //si email no está presente ya:

            if(!checkUsernameExists($uName, $conDB)){
                //si usuario no está presente ya:
                    
                // $uHash = hash('sha512', $pass);
                $uHash = $uPass;
                echo addUser($uName, $uHash, $uEmail, $conDB); //añadimos usuario
            }
            else{
                echo "usernameAlreadyExists";
            }
        }
        else{
            echo "emailAlreadyExists";
        }
    }
    else{
        die("Connection failed: " . $conDB->connect_error);
    }
    
    
    function checkEmailExists($email, $connection){
        $sqlCheckEmail = "SELECT u.email FROM `usuarios` u WHERE u.email = '$email';";

        
        $query = mysqli_query($connection, $sqlCheckEmail);

        $response = mysqli_num_rows($query);

        if($response == 1){
            return 1; //si existe en tabla, devolvemos true;
        }
        else{
            return 0;
        }
    }
    function checkUsernameExists($username, $connection){
        $sqlCheckUsername = "SELECT u.username FROM `users` u WHERE u.username = '$username';";
        $query = mysqli_query($connection, $sqlCheckUsername);

        $response = mysqli_num_rows($query);

        if($response == 1){
            return true; //si existe en tabla, devolvemos true
        }
        else{
            return false;
        }
    }
    function addUser($user, $password, $email, $connection){
        $id = mysqli_query($connection, "SELECT count(*) as 'total_ID'from `usuarios`");

        $id = intval($id->fetch_array()['total_ID']);

        $sqlAddUser = "INSERT INTO `usuarios`( `id` , `username`, `pass`, `email`, `role`) VALUES ($id , '$user','$password','$email', 1);";
        $query = mysqli_query($connection, $sqlAddUser);

        if($query){
            session_start();
            $_SESSION['id'] = $user;
        }

        return $query;  
    }
?>