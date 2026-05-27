import { fields } from "../data/fields.js";

export function initFieldsMap() {
    const mapContainer = document.getElementById("map-container");
    if (!mapContainer) return;

    const cards = Array.from(document.querySelectorAll(".fields-page-card"));
    const locationToggle = document.getElementById("use-location-toggle");

    const fieldMap = new Map(fields.map(field => [field.id, field]));

    // Default view centered on Argentina
    const map = L.map("map-container").setView([-34.6037, -58.3816], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    let markers = [];
    let userMarker = null;
    let userLocation = null;
    let routingControl = null;

    function clearMarkers() {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
    }

    function clearRoute() {
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }
    }

    // USER LOCATION ICON
    function enableUserLocation() {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                userLocation = [latitude, longitude];

                if (userMarker) map.removeLayer(userMarker);

                userMarker = L.marker(userLocation, {
                    icon: L.divIcon({
                        className: 'user-location-icon',
                        html: `
                            <div style="
                                background: #1e88e5; 
                                color: white; 
                                border: 3px solid white; 
                                border-radius: 50%; 
                                width: 42px; 
                                height: 42px; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center; 
                                font-size: 21px; 
                                box-shadow: 0 0 0 4px rgba(30, 136, 229, 0.4);
                            ">
                                <i class="fas fa-person-walking"></i>
                            </div>`,
                        iconSize: [42, 42],
                        iconAnchor: [21, 42],     
                        popupAnchor: [0, -45]     
                    })
                })
                .addTo(map)
                .bindPopup("Tu ubicación actual", {
                    offset: [0, -10],        
                    closeButton: false,
                    className: 'user-popup'
                })
                .openPopup();   

                map.setView(userLocation, 14);
            },
            err => {
                console.warn("Location error:", err);
                alert("No se pudo obtener tu ubicación");
            }
        );
    }

    function disableUserLocation() {
        userLocation = null;
        if (userMarker) {
            map.removeLayer(userMarker);
            userMarker = null;
        }
        clearRoute();
    }

    // ROUTE
    function createRoute(lat, lng) {
        if (!userLocation) return;

        clearRoute();

        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(userLocation[0], userLocation[1]),
                L.latLng(lat, lng)
            ],
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            createMarker: () => null,
            lineOptions: {
                styles: [{ color: '#1e88e5', weight: 6, opacity: 0.8 }]
            }
        }).addTo(map);

        setTimeout(() => {
            document.querySelectorAll('.leaflet-routing-container').forEach(el => {
                el.style.display = 'none';
            });
        }, 500);
    }

    // MARKERS 
    function renderMarkers() {
        clearMarkers();
        const bounds = [];

        cards.forEach(card => {
            if (card.classList.contains("hidden")) return;

            const field = fieldMap.get(card.dataset.id);
            if (!field?.lat || !field?.lng) return;

            const marker = L.marker([field.lat, field.lng])
                .addTo(map)
                .bindPopup(`<strong>${field.name}</strong><br>${card.querySelector(".price")?.innerText || ""}`);

            marker.on("click", () => {
                card.scrollIntoView({ behavior: "smooth", block: "center" });
                card.style.boxShadow = "0 0 0 3px var(--color-primary)";
                setTimeout(() => card.style.boxShadow = "", 1800);

                if (userLocation) createRoute(field.lat, field.lng);
            });

            markers.push(marker);
            bounds.push([field.lat, field.lng]);
        });

        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [60, 60] });
        }
    }

    // Observers and Event Listeners
    const observer = new MutationObserver(() => renderMarkers());
    cards.forEach(card => observer.observe(card, { attributes: true, attributeFilter: ["class"] }));

    locationToggle?.addEventListener("change", e => {
        if (e.target.checked) enableUserLocation();
        else disableUserLocation();
    });

    const mapBtn = document.getElementById("map-view-btn");
    mapBtn?.addEventListener("click", () => setTimeout(() => map.invalidateSize(), 300));

    // Initialize
    renderMarkers();
    if (locationToggle?.checked) enableUserLocation();
}