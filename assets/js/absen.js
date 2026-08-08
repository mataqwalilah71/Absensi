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
"https://script.google.com/macros/s/AKfycbyoyG0Xy2KBdbL5EWgB_J4Idh21gRJeGl0YnFeHzF3bZtjHdJyJY0NRmI_wV7AuUvrG/exec";


// ======================================
// CEK STATUS TOMBOL ABSEN
// ======================================
function cekStatusAbsen() {

    console.log("GPS :", gpsValid);
    console.log("SELFIE :", selfieValid);

    const tombol = document.getElementById("btnAbsen");

    if (!tombol) {

        console.log("Tombol Absen tidak ditemukan");

        return;
    }

    tombol.disabled = !(gpsValid && selfieValid);

    console.log("Status tombol :", tombol.disabled);

}


// ======================================
// ABSEN SEKARANG
// ======================================
async function absenSekarang() {

    console.log("================================");
    console.log("FUNGSI ABSEN SEKARANG DIPANGGIL");
    console.log("================================");


    // ===============================
    // CEK GPS
    // ===============================
    if (!gpsValid) {

        alert("📍 Silakan cek lokasi terlebih dahulu.");

        return;
    }


    // ===============================
    // CEK SELFIE
    // ===============================
    if (!selfieValid) {

        alert("📷 Silakan ambil foto selfie terlebih dahulu.");

        return;
    }


    // ===============================
    // WAKTU
    // ===============================
    const sekarang = new Date();

    const tanggal =
        sekarang.toLocaleDateString("id-ID");

    const hari =
        sekarang.toLocaleDateString("id-ID", {
            weekday: "long"
        });

    const jamMasuk =
        sekarang.toLocaleTimeString("id-ID");


    // ===============================
    // DEVICE
    // ===============================
    const device =
        /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        )
        ? "Mobile"
        : "PC";


    // ===============================
    // BROWSER
    // ===============================
    const browser =
        navigator.userAgent;


    // ===============================
    // DATA ABSENSI
    // ===============================
    const data = {

        nama:
            localStorage.getItem("nama") || "",

        username:
            localStorage.getItem("username") || "",

        tanggal:
            tanggal,

        hari:
            hari,

        jamMasuk:
            jamMasuk,

        jamPulang:
            "",

        status:
            "HADIR",

        latitude:
            latitude,

        longitude:
            longitude,

        jarak:
            jarak,

        selfie:
            selfieBase64,

        device:
            device,

        browser:
            browser

    };


    // ===============================
    // TAMPILKAN DATA
    // ===============================
    console.log(
        "DATA YANG AKAN DIKIRIM:",
        data
    );


    // ===============================
    // TOMBOL LOADING
    // ===============================
    const tombol =
        document.getElementById("btnAbsen");


    if (tombol) {

        tombol.disabled = true;

        tombol.innerHTML =
            "⏳ MENYIMPAN ABSENSI...";

    }


    // ===============================
    // KIRIM KE GOOGLE APPS SCRIPT
    // ===============================
    try {

        console.log(
            "Mengirim data ke Google Apps Script..."
        );


        const response = await fetch(
            WEB_APP_URL,
            {

                method: "POST",

                // Jangan tambahkan
                // Content-Type application/json
                // untuk menghindari preflight CORS

                body: JSON.stringify(data)

            }
        );


        // ===============================
        // BACA RESPONSE
        // ===============================
        const text =
            await response.text();


        console.log(
            "RESPON GOOGLE APPS SCRIPT:",
            text
        );


        // ===============================
        // PARSE JSON
        // ===============================
        let hasil;


        try {

            hasil =
                JSON.parse(text);

        } catch (e) {

            console.error(
                "Response bukan JSON:",
                text
            );

            alert(
                "❌ Response server tidak dikenali.\n\n" +
                text
            );

            if (tombol) {

                tombol.disabled = false;

                tombol.innerHTML =
                    "✅ ABSEN SEKARANG";

            }

            return;
        }


        // ===============================
        // BERHASIL
        // ===============================
        if (
            hasil.status === "success"
        ) {

            alert(
                "✅ ABSENSI BERHASIL DISIMPAN!\n\n" +
                "Nama : " +
                data.nama +
                "\nTanggal : " +
                data.tanggal +
                "\nJam : " +
                data.jamMasuk
            );


            if (tombol) {

                tombol.innerHTML =
                    "✅ ABSENSI TERSIMPAN";

                tombol.disabled = true;

            }

        }


        // ===============================
        // GAGAL
        // ===============================
        else {

            alert(
                "❌ GAGAL MENYIMPAN ABSENSI\n\n" +
                (
                    hasil.pesan ||
                    "Kesalahan tidak diketahui"
                )
            );


            if (tombol) {

                tombol.disabled = false;

                tombol.innerHTML =
                    "✅ ABSEN SEKARANG";

            }

        }


    } catch (err) {

        console.error(
            "ERROR ABSENSI:",
            err
        );


        alert(
            "❌ GAGAL TERHUBUNG KE SERVER.\n\n" +
            "Periksa koneksi internet dan Google Apps Script."
        );


        if (tombol) {

            tombol.disabled = false;

            tombol.innerHTML =
                "✅ ABSEN SEKARANG";

        }

    }

}