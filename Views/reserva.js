function selectReserva() {
    //si hay un usuario iniciado sesión, le llevamos al perfil
    if(sLog != -1){
        location.href = 'tuTab.html';
    }
    //si no, al login
    else
        location.href = 'login.html';
}