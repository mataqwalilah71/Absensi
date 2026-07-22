function login(){

    let user =
        document.getElementById("username").value;

    let pass =
        document.getElementById("password").value;

    if(user=="admin" && pass=="12345"){
        window.location.href="dashboard.html";
    }else{
        alert("Username atau Password Salah!");
    }

}
