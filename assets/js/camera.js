// =====================================
// CAMERA.JS
// MA TAQWAL ILAH
// =====================================

let stream = null;

// Mengaktifkan kamera
async function bukaKamera() {

    try {

        stream = await navigator.mediaDevices.getUserMedia({

            video: {
                facingMode: "user"
            },

            audio: false

        });

        document.getElementById("video").srcObject = stream;

    } catch (err) {

        alert("Kamera tidak dapat diakses.");

        console.log(err);

    }

}

// Menutup kamera
function tutupKamera() {

    if (stream != null) {

        stream.getTracks().forEach(track => track.stop());

    }

}