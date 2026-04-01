export function initFieldsMap() {

    const mapContainer = document.getElementById("map-container");
    if (!mapContainer) return;

    const cards = Array.from(document.querySelectorAll(".fields-page-card"));
    const locationToggle = document.getElementById("use-location-toggle");

    
    // INIT MAP
    
    const map = L.map("map-container").setView([-34.6037, -58.3816], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    let markers = [];
    let userMarker = null;
    let userLocation = null;
    let routingControl = null; 

    
    // CLEAR HELPERS
    
    function clearMarkers() {
        markers.forEach(m => map.removeLayer(m));
        markers = [];
    }

    function clearRoute() {
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }
    }

    
    // USER LOCATION
    
    function enableUserLocation() {

        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(position => {

            const { latitude, longitude } = position.coords;
            userLocation = [latitude, longitude];

            if (userMarker) map.removeLayer(userMarker);

            userMarker = L.marker(userLocation)
                .addTo(map)
                .bindPopup("Tu ubicación")
                .openPopup();

            map.setView(userLocation, 14);

        }, err => {
            console.warn("Location error:", err);
        });
    }

    function disableUserLocation() {
        userLocation = null;

        if (userMarker) {
            map.removeLayer(userMarker);
            userMarker = null;
        }

        clearRoute();
    }

    
    // ROUTE (REAL ROUTING)
    
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
            createMarker: () => null 
        }).addTo(map);
    }

    
    // MARKERS
    
    function renderMarkers() {

        clearMarkers();

        const bounds = [];

        cards.forEach(card => {

            if (card.classList.contains("hidden")) return;

            const lat = parseFloat(card.dataset.lat);
            const lng = parseFloat(card.dataset.lng);

            if (!lat || !lng) return;

            const name = card.dataset.name;
            const price = card.querySelector(".price")?.innerText || "";

            const marker = L.marker([lat, lng])
                .addTo(map)
                .bindPopup(`<strong>${name}</strong><br>${price}`);

            // CLICK MARKER
            marker.on("click", () => {

                // Scroll to card
                card.scrollIntoView({ behavior: "smooth", block: "center" });

                // Highlight
                card.style.boxShadow = "0 0 0 2px var(--color-primary)";
                setTimeout(() => card.style.boxShadow = "", 1500);

                // CREATE REAL ROUTE
                if (userLocation) {
                    createRoute(lat, lng);
                } else {
                    alert("Activá tu ubicación para ver la ruta");
                }
            });

            markers.push(marker);
            bounds.push([lat, lng]);
        });

        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }

    
    // FILTER SYNC
    
    const observer = new MutationObserver(() => {
        renderMarkers();
    });

    cards.forEach(card => {
        observer.observe(card, { attributes: true, attributeFilter: ["class"] });
    });

    
    // LOCATION TOGGLE
    
    locationToggle?.addEventListener("change", (e) => {
        if (e.target.checked) {
            enableUserLocation();
        } else {
            disableUserLocation();
        }
    });

    
    // MAP RESIZE FIX
    
    const mapBtn = document.getElementById("map-view-btn");

    mapBtn?.addEventListener("click", () => {
        setTimeout(() => map.invalidateSize(), 200);
    });

    
    // INIT
    
    renderMarkers();
}