function login(){

    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;

    const user=users.find(u=>u.username===username && u.password===password);

    if(user){

        localStorage.setItem("nama",user.nama);
        localStorage.setItem("level",user.level);

        window.location="dashboard.html";

    }else{

        alert("Username atau Password salah");

    }

}