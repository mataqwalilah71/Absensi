// ======================================
// LOGIN MA TAQWAL ILAH
// Menggunakan Google Spreadsheet
// ======================================

// URL Web App Apps Script
const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbwlZkBdmrhfAMzc1G34GtUupp6FzqJGieMqriJGTyxrZvfmVrzOOHl4HCyXXJfv4LhF/exec";

// ======================================
// LOGIN
// ======================================
async function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {

        alert("Username dan Password harus diisi.");
        return;

    }

    try {

        const response = await fetch(

            WEB_APP_URL +
            "?action=login" +
            "&username=" + encodeURIComponent(username) +
            "&password=" + encodeURIComponent(password)

        );

        const data = await response.json();

        if (data.status === "success") {

            // Simpan ke Local Storage
            localStorage.setItem("username", username);
            localStorage.setItem("nama", data.nama);
            localStorage.setItem("jabatan", data.jabatan);

            alert("Login berhasil.");

            window.location = "dashboard.html";

        } else {

            alert("Username atau Password salah.");

        }

    } catch (err) {

        console.log(err);

        alert("Tidak dapat terhubung ke server.");

    }

}