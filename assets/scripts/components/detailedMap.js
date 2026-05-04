export function initFieldDetailMap() {

    const mapEl = document.getElementById("field-map");
    if (!mapEl) return;

    const lat = parseFloat(mapEl.dataset.lat);
    const lng = parseFloat(mapEl.dataset.lng);
    const name = mapEl.dataset.name || "Cancha";

    if (!lat || !lng) {
        console.error("Missing map coordinates");
        return;
    }

    // multiple init (if page reloads dynamically)
    if (mapEl._leaflet_id) return;

    const map = L.map(mapEl).setView([lat, lng], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(name)
        .openPopup();
}