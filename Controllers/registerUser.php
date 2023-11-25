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
        $sqlCheckUsername = "SELECT u.username FROM `usuarios` u WHERE u.username = '$username';";
        $query = mysqli_query($connection, $sqlCheckUsername);

        
        $response = mysqli_num_rows($query);
        // return false;

        if($response){
            return true; //si existe en tabla, devolvemos true
        }
        else{
            return false;
        }
    }
    function addUser($user, $password, $email, $connection){
        $sqlAddUser = "INSERT INTO `usuarios`(`username`, `pass`, `email`) VALUES ('$user','$password','$email');";
        $query = mysqli_query($connection, $sqlAddUser);
        
        if($query){
            session_start();
            $_SESSION['id'] = $user;
        }
        else{
            print("errElse");
            return;
        }

        return $query;  
    }
?>