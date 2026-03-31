export function initFieldDetailMap() {

    const mapEl = document.getElementById("field-map");
    if (!mapEl) return;

    const lat = -34.6037;
    const lng = -58.3816;

    const map = L.map("field-map").setView([lat, lng], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup("Predio La Bombonera")
        .openPopup();
}