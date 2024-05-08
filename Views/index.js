$(function(){ //cuando el html esté cargado:

    var sLog;

    //vemos si hay un usuario con la sesion iniciada
    $.ajax({url: '../Controllers/autoLogin.php', success: function(usuarioLog){
        sLog = usuarioLog;
        //si el usuario es anonimo entonces se queda como esta
        if(sLog != -1){
            $("#configButton>a").html(sLog);
            $("#configButton>a").attr("href" , "./tuTab.html");
            $("#sessionButton>a").removeAttr("href");
            $("#sessionButton>a").html("Log Out");

            $(".tuTab>a").attr("href" , "tuTab.html");
            
            
            $("#sessionButton").hover(function(){
                $(this).css("border", "1px solid whitesmoke");
            }, function(){
                $(this).css("border", "0px solid");
            });
            
            $('#sessionButton').click(function(){
                $.ajax({
                    //delog simple
                    url: "../Controllers/deLogin.php",
                    type: "GET",
                    success: function(){
                        $("#configButton>a").html("Sign In");
                        $("#configButton>a").attr("href" , "registerPage.html");
                        $("#sessionButton>a").html("Log In");
                        $("#sessionButton>a").attr("href" , "login.html");
                    }
                })
                location.href = 'index.html'; //cuando hacemos delog, nos envía al inicio
            })
        }
        else{
            $("#configButton>a").html("Sign In");
        }
    }})
})