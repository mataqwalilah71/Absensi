// ======================================
// AUTH.JS
// Login Online MA TAQWAL ILAH
// ======================================

// URL Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbwlZkBdmrhfAMzc1G34GtUupp6FzqJGieMqriJGTyxrZvfmVrzOOHl4HCyXXJfv4LhF/exec";

// =========================
// LOGIN
// =========================

async function login(){

    const username=document.getElementById("username").value.trim();

    const password=document.getElementById("password").value.trim();

    if(username=="" || password==""){

        alert("Username dan Password wajib diisi");

        return;

    }

    try{

        const response=await fetch(

            API_URL+
            "?action=login"+
            "&username="+encodeURIComponent(username)+
            "&password="+encodeURIComponent(password)

        );

        const hasil=await response.json();

        if(hasil.status=="success"){

            localStorage.setItem("nama",hasil.nama);

            localStorage.setItem("username",username);

            localStorage.setItem("jabatan",hasil.jabatan);

            window.location.href="dashboard.html";

        }else{

            alert("Username atau Password salah");

        }

    }catch(err){

        console.log(err);

        alert("Server tidak dapat dihubungi");

    }

}