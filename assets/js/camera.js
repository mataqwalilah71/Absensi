// =========================================
// CAMERA.JS
// =========================================

let stream = null;

let fotoBase64 = "";

// =============================
// BUKA KAMERA
// =============================

async function bukaKamera() {

    try {

        stream = await navigator.mediaDevices.getUserMedia({

            video: {

                facingMode: "user"

            },

            audio: false

        });

        document.getElementById("video").srcObject = stream;

    }

    catch (e) {

        alert("Kamera gagal dibuka");

        console.log(e);

    }

}

// =============================
// AMBIL FOTO
// =============================

function ambilFoto() {

    const video = document.getElementById("video");

    const canvas = document.getElementById("canvas");

    const preview = document.getElementById("preview");

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video,0,0);

    fotoBase64 = canvas.toDataURL("image/jpeg",0.9);

    preview.src = fotoBase64;

    preview.style.display="block";

    if(stream){

        stream.getTracks().forEach(track=>track.stop());

    }

    video.style.display="none";

    alert("✅ Selfie berhasil diambil");

}