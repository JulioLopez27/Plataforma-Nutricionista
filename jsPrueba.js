function login(event){
//Aca habrai que hacer dos cosas
//1) Manejar sesiones
//2) Via ajax o algo sacar data de la BD para comparar y permitir el login.
event.preventDefault();
if(document.getElementById("login-us").value==""){
    alert("Debe introducir el nombre de usuario")
}else if(document.getElementById("login-pw").value==""){
    alert("Debe introducir una password")
}else if(document.getElementById("login-us").value!="admin"){
    alert("No existe ese usuario")
}else if(document.getElementById("login-us").value=="admin" && document.getElementById("login-pw").value!="123"){
    alert("El password no es correcto")
}else{
    window.location.replace("./Menu.html");
}




}