// ======================================
// ABSEN.JS
// MA TAQWAL ILAH
// ======================================

// ===============================
// STATUS
// ===============================
let gpsValid = false;
let selfieValid = false;

// ===============================
// DATA GPS
// ===============================
let latitude = "";
let longitude = "";
let jarak = 0;

// ===============================
// FOTO SELFIE
// ===============================
let selfieBase64 = "";

// ===============================
// URL GOOGLE APPS SCRIPT
// ===============================
const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbwlZkBdmrhfAMzc1G34GtUupp6FzqJGieMqriJGTyxrZvfmVrzOOHl4HCyXXJfv4LhF/exec";

// ===============================
// CEK STATUS TOMBOL ABSEN
// ===============================
function cekStatusAbsen() {

    console.log("GPS :", gpsValid);
    console.log("SELFIE :", selfieValid);

    const tombol = document.getElementById("btnAbsen");

    if (!tombol) {
        console.log("Tombol tidak ditemukan");
        return;
    }

    tombol.disabled = !(gpsValid && selfieValid);

    console.log("Status tombol :", tombol.disabled);

}

// ===============================
// ABSEN SEKARANG
// ===============================
async function absenSekarang() {

    // Pastikan GPS sudah valid
    if (!gpsValid) {

        alert("📍 Silakan cek lokasi terlebih dahulu.");

        return;

    }

    // Pastikan selfie sudah ada
    if (!selfieValid) {

        alert("📷 Silakan ambil foto selfie terlebih dahulu.");

        return;

    }

    // Susun data yang akan dikirim
    const data = {

    nama: localStorage.getItem("nama"),

    username: localStorage.getItem("username"),

    jabatan: localStorage.getItem("jabatan"),

    tanggal: new Date().toLocaleDateString("id-ID"),

    jam: new Date().toLocaleTimeString("id-ID"),

    latitude: latitude,

    longitude: longitude,

    jarak: jarak,

    status: "HADIR",

    selfie: ""

};

    console.log("Data yang dikirim : ", data);

    try {

        const response = await fetch(WEB_APP_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        const hasil = await response.json();

        console.log("Respon Server :", hasil);

        if (hasil.status === "success") {

            alert("✅ Absensi berhasil disimpan.");

            // Nonaktifkan tombol agar tidak double klik
            document.getElementById("btnAbsen").disabled = true;

        } else {

            alert("❌ Gagal menyimpan data.");

        }

    } catch (err) {

        console.error(err);

        alert("❌ Server tidak dapat dihubungi.");

    }

}