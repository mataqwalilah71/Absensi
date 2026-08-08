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


// ===============================
// ABSEN SEKARANG
// ===============================
async function absenSekarang() {

    if (!gpsValid) {

        alert("📍 Silakan cek lokasi terlebih dahulu.");
        return;

    }

    if (!selfieValid) {

        alert("📷 Silakan ambil foto selfie terlebih dahulu.");
        return;

    }

    const sekarang = new Date();

    const data = {

        nama: localStorage.getItem("nama") || "",

        username: localStorage.getItem("username") || "",

        tanggal: sekarang.toLocaleDateString("id-ID"),

        hari: sekarang.toLocaleDateString("id-ID", {
            weekday: "long"
        }),

        jamMasuk: sekarang.toLocaleTimeString("id-ID"),

        jamPulang: "",

        status: "HADIR",

        latitude: latitude,

        longitude: longitude,

        jarak: jarak,

        selfie: selfieBase64,

        device: navigator.userAgent,

        browser: navigator.userAgent

    };

    console.log("DATA YANG DIKIRIM:", data);

    try {

        const response = await fetch(WEB_APP_URL, {

            method: "POST",

            body: JSON.stringify(data)

        });

        const text = await response.text();

        console.log("RESPON GOOGLE APPS SCRIPT:", text);

        if (text.includes('"status":"success"')) {

            alert("✅ ABSENSI BERHASIL DISIMPAN!");

            const tombol = document.getElementById("btnAbsen");

            if (tombol) {
                tombol.disabled = true;
            }

        } else {

            alert("❌ Data gagal disimpan.\n\nRespon server:\n" + text);

        }

    } catch (err) {

        console.error("ERROR ABSENSI:", err);

        alert(
            "❌ Gagal mengirim absensi.\n\n" +
            "Kemungkinan koneksi ke Google Apps Script bermasalah."
        );

    }

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

    const jamMasuk =
        sekarang.toLocaleTimeString("id-ID");

    const hari =
        sekarang.toLocaleDateString("id-ID", {
            weekday: "long"
        });


    // ===============================
    // DEVICE
    // ===============================
    const device =
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
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
    // TAMPILKAN DATA DI CONSOLE
    // ===============================
    console.log("DATA YANG AKAN DIKIRIM:");
    console.log(data);


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

        const response = await fetch(
            WEB_APP_URL,
            {

                method: "POST",

                // PENTING:
                // JANGAN menggunakan
                // Content-Type application/json
                // agar tidak memicu preflight CORS

                body: JSON.stringify(data)

            }
        );


        // ===============================
        // BACA RESPONSE SERVER
        // ===============================
        const text =
            await response.text();


        console.log(
            "RESPON GOOGLE APPS SCRIPT:"
        );

        console.log(text);


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
                "❌ Server memberikan response yang tidak dikenali:\n\n" +
                text
            );

            return;

        }


        // ===============================
        // HASIL
        // ===============================
        if (hasil.status === "success") {

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

        } else {

            alert(
                "❌ GAGAL MENYIMPAN ABSENSI\n\n" +
                (hasil.pesan || "Kesalahan tidak diketahui")
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
            "Periksa koneksi internet dan Web App Google Apps Script."
        );


        if (tombol) {

            tombol.disabled = false;

            tombol.innerHTML =
                "✅ ABSEN SEKARANG";

        }

    }

}