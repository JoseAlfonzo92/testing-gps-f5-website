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

    if (mapEl._leaflet_id) return;

    const map = L.map(mapEl, {
        zoomControl: true,
        attributionControl: true
    }).setView([lat, lng], 20);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    // Field marker
    const fieldMarker = L.marker([lat, lng])
        .addTo(map)
        .bindTooltip(name, { direction: 'top', offset: [0, -10] });

    let routingControl = null;
    let userMarker = null;

    fieldMarker.on('click', getDirections);

    async function getDirections() {
        if (!navigator.geolocation) {
            alert("Geolocalización no soportada");
            return;
        }

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 12000,
                    maximumAge: 60000
                });
            });

            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Clear previous
            if (routingControl) map.removeControl(routingControl);
            if (userMarker) map.removeLayer(userMarker);

            // USER LOCATION ICON
            userMarker = L.marker([userLat, userLng], {
                icon: L.divIcon({
                    className: 'user-location-icon',
                    html: `
                        <div style="
                            background: #3388ff; 
                            color: white; 
                            border: 3px solid white; 
                            border-radius: 50%; 
                            width: 40px; 
                            height: 40px; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            font-size: 20px; 
                            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
                        ">
                            <i class="fas fa-person-walking"></i>
                        </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40]
                })
            }).addTo(map)
              .bindPopup("Tu ubicación actual");

            // Route
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(userLat, userLng),
                    L.latLng(lat, lng)
                ],
                routeWhileDragging: false,
                showAlternatives: false,
                addWaypoints: false,
                createMarker: () => null,
                lineOptions: {
                    styles: [{ color: '#3388ff', weight: 6, opacity: 0.85 }]
                },
                show: false,
                collapse: true
            }).addTo(map);

            // Hide directions panel
            setTimeout(() => {
                document.querySelectorAll('.leaflet-routing-container, .leaflet-routing-collapsible').forEach(el => {
                    el.style.display = 'none';
                });
            }, 400);

            // Fit map
            map.fitBounds([
                [userLat, userLng],
                [lat, lng]
            ], { padding: [80, 80] });

        } catch (error) {
            console.error(error);
            if (error.code === 1) alert("Acceso a ubicación denegado");
            else alert("No se pudo obtener tu ubicación");
        }
    }
}