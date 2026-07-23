// =========================================
// GPS v2.0 - MA TAQWAL ILAH
// =========================================

// Koordinat Sekolah
const SCHOOL = {
    lat: -7.055557178066593,
    lng: 110.4712842905309,
    radius: 100 // meter
};

// =========================================
// Menghitung jarak menggunakan Rumus Haversine
// =========================================
function getDistance(lat1, lon1, lat2, lon2) {

    const R = 6371000;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

// =========================================
// Cek Lokasi
// =========================================
function cekLokasi() {

    if (!navigator.geolocation) {

        alert("Browser tidak mendukung GPS.");
        return;

    }

    document.getElementById("statusLokasi").innerHTML =
        "⏳ Sedang mengambil lokasi...";

    navigator.geolocation.getCurrentPosition(

        successLocation,
        errorLocation,

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }

    );

}

// =========================================
// Berhasil mendapatkan lokasi
// =========================================
function successLocation(position) {

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const accuracy = position.coords.accuracy;

    console.log(position.coords);

    const distance = getDistance(
        lat,
        lng,
        SCHOOL.lat,
        SCHOOL.lng
    );

    let status = "";
    let warna = "";

    if (distance <= SCHOOL.radius) {

        status = "✅ Anda berada di AREA SEKOLAH";
        warna = "green";

    } else {

        status = "❌ Anda berada di LUAR AREA SEKOLAH";
        warna = "red";

    }

    document.getElementById("statusLokasi").innerHTML = status;
    document.getElementById("statusLokasi").style.color = warna;

    document.getElementById("hasilLokasi").innerHTML = `

        <table class="table table-bordered">

            <tr>

                <th width="180">Latitude</th>

                <td>${lat}</td>

            </tr>

            <tr>

                <th>Longitude</th>

                <td>${lng}</td>

            </tr>

            <tr>

                <th>Akurasi GPS</th>

                <td>${accuracy.toFixed(2)} meter</td>

            </tr>

            <tr>

                <th>Jarak dari Sekolah</th>

                <td>${distance.toFixed(2)} meter</td>

            </tr>

        </table>

        <a
        target="_blank"
        class="btn btn-success"

        href="https://www.google.com/maps?q=${lat},${lng}">

        📍 Lihat Lokasi Saya

        </a>

    `;

}

// =========================================
// Jika gagal
// =========================================
function errorLocation(error) {

    console.log(error);

    let pesan = "";

    switch (error.code) {

        case error.PERMISSION_DENIED:

            pesan = "Izin lokasi ditolak.";

            break;

        case error.POSITION_UNAVAILABLE:

            pesan = "Lokasi tidak tersedia.";

            break;

        case error.TIMEOUT:

            pesan = "GPS timeout.";

            break;

        default:

            pesan = "Terjadi kesalahan GPS.";

    }

    document.getElementById("statusLokasi").innerHTML =

        "❌ " + pesan;

}