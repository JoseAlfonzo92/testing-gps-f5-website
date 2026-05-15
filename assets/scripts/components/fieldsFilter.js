import { fields } from "../data/fields.js";

export function initFieldsFilter() {
    const container = document.getElementById("fields-container");
    if (!container) return;

    const cards = Array.from(document.querySelectorAll(".fields-page-card"));
    const searchInputs = Array.from(document.querySelectorAll(".global-search"));

    const fieldMap = new Map(fields.map(field => [field.id, field]));

    // HELPERS
    function normalizeText(text = "") {
        return text
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[.,]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function createSearchableText(field) {
        const text = [
            field.name, field.location, field.province, field.city, field.zone,
            field.type, field.description, field.address,
            field.schedule?.week, field.schedule?.weekend,
            ...(field.features || []),
            ...(field.buffet || []),
            ...(field.extraInfo || []),
            field.booking?.players, field.booking?.surface,
            field.rating?.toString(),
            field.priceFrom?.toString(),
            field.priceTo?.toString()
        ].filter(Boolean).join(" ");

        return normalizeText(text);
    }

    function getDistanceKm(lat1, lng1, lat2, lng2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    //  DOM ELEMENTS 
    const searchInput = document.getElementById("search-input");
    const filterProvince = document.getElementById("filter-province");
    const filterCity = document.getElementById("filter-city");
    const filterZone = document.getElementById("filter-zone");
    const filterType = document.getElementById("filter-type");
    const sortBy = document.getElementById("sort-by");
    const clearBtn = document.getElementById("clear-filters");
    const noResults = document.getElementById("no-results");
    const useLocationToggle = document.getElementById("use-location-toggle");

    // View toggles
    const gridBtn = document.getElementById("grid-view-btn");
    const mapBtn = document.getElementById("map-view-btn");
    const grid = document.querySelector(".fields-page-list");
    const map = document.getElementById("map-container");

    //  LOCATION 
    let userPosition = null;

    function requestLocation() {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            pos => {
                userPosition = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                };
                updateFields();
            },
            err => console.warn(err),
            { enableHighAccuracy: true }
        );
    }

    //  MAIN UPDATE FUNCTION 
    function updateFields() {
        const search = normalizeText(searchInput?.value || "");
        const province = filterProvince?.value || "";
        const city = filterCity?.value || "";
        const zone = filterZone?.value || "";
        const type = filterType?.value || "";
        const sort = sortBy?.value || "";

        const firstPositions = new Map();
        cards.forEach(card => firstPositions.set(card, card.getBoundingClientRect()));

        let visibleCards = [];

        // FILTER
        cards.forEach(card => {
            const field = fieldMap.get(card.dataset.id);
            if (!field) return;

            const match =
                createSearchableText(field).includes(search) &&
                (!province || field.province === province) &&
                (!city || field.city === city) &&
                (!zone || field.zone === zone) &&
                (!type || field.type === type);

            if (match) {
                card.classList.remove("hidden");

                if (userPosition && field.lat && field.lng) {
                    const dist = getDistanceKm(userPosition.lat, userPosition.lng, field.lat, field.lng);
                    card.dataset.distance = dist;
                } else {
                    card.dataset.distance = "";
                }

                visibleCards.push(card);
            } else {
                card.classList.add("hidden");
            }
        });

        // SORT
        if (sort || (useLocationToggle?.checked && userPosition)) {
            visibleCards.sort((a, b) => {
                const fieldA = fieldMap.get(a.dataset.id);
                const fieldB = fieldMap.get(b.dataset.id);

                // Location sort only when no manual sort is selected
                if (useLocationToggle?.checked && userPosition && !sort) {
                    const distA = parseFloat(a.dataset.distance) || Infinity;
                    const distB = parseFloat(b.dataset.distance) || Infinity;
                    if (distA !== distB) return distA - distB;
                }

                // Manual sorts (Price / Rating)
                switch (sort) {
                    case "price-low":
                        return (fieldA.priceFrom || 0) - (fieldB.priceFrom || 0);
                    case "price-high":
                        return (fieldB.priceFrom || 0) - (fieldA.priceFrom || 0);
                    case "rating":
                        return (fieldB.rating || 0) - (fieldA.rating || 0);
                    default:
                        return 0;
                }
            });
        }

        // Reorder DOM
        visibleCards.forEach(card => container.appendChild(card));

        // FLIP Animation
        cards.forEach(card => {
            const first = firstPositions.get(card);
            const last = card.getBoundingClientRect();
            const dx = first.left - last.left;
            const dy = first.top - last.top;

            if (dx || dy) {
                card.style.transition = "none";
                card.style.transform = `translate(${dx}px, ${dy}px)`;

                requestAnimationFrame(() => {
                    card.style.transition = "transform 0.4s ease";
                    card.style.transform = "";
                });
            }
        });

        visibleCards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.03}s`;
        });

        noResults?.classList.toggle("active", visibleCards.length === 0);
    }

    window.updateFields = updateFields;

    //  CLEAR FILTERS 
    clearBtn?.addEventListener("click", () => {
        // Clear search
        searchInputs.forEach(input => input.value = "");

        // Clear dropdowns and sort
        if (filterProvince) filterProvince.value = "";
        if (filterCity) filterCity.value = "";
        if (filterZone) filterZone.value = "";
        if (filterType) filterType.value = "";
        if (sortBy) sortBy.value = "";



        updateFields();
    });

    // RESET ALL (Clears everything including location)
const resetAllBtn = document.getElementById("reset-all");

resetAllBtn?.addEventListener("click", () => {
    // Clear search
    searchInputs.forEach(input => input.value = "");

    // Clear all filters and sort
    if (filterProvince) filterProvince.value = "";
    if (filterCity) filterCity.value = "";
    if (filterZone) filterZone.value = "";
    if (filterType) filterType.value = "";
    if (sortBy) sortBy.value = "";

    // Reset location toggle
    if (useLocationToggle) {
        useLocationToggle.checked = false;
        localStorage.setItem("useLocationToggle", "false");
    }

    userPosition = null;

    updateFields();
});

    //  EVENT LISTENERS 
    [searchInput, filterProvince, filterCity, filterZone, filterType, sortBy]
        .forEach(el => {
            if (el) {
                el.addEventListener("input", updateFields);
                el.addEventListener("change", updateFields);
            }
        });

    // Location toggle
    if (useLocationToggle) {
        const saved = localStorage.getItem("useLocationToggle") === "true";
        useLocationToggle.checked = saved;

        useLocationToggle.addEventListener("change", () => {
            localStorage.setItem("useLocationToggle", useLocationToggle.checked);
            if (useLocationToggle.checked && !userPosition) {
                requestLocation();
            } else {
                updateFields();
            }
        });
    }

    // View toggle
    gridBtn?.addEventListener("click", () => {
        grid?.classList.remove("hide");
        map?.classList.remove("active");
        gridBtn.classList.add("active");
        mapBtn?.classList.remove("active");
    });

    mapBtn?.addEventListener("click", () => {
        grid?.classList.add("hide");
        map?.classList.add("active");
        mapBtn.classList.add("active");
        gridBtn?.classList.remove("active");
    });

    // URL search param
    const params = new URLSearchParams(window.location.search);
    const searchFromURL = params.get("search");
    if (searchFromURL && searchInput) {
        searchInput.value = searchFromURL;
        searchInputs.forEach(input => input.value = searchFromURL);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Init
    if (useLocationToggle?.checked) requestLocation();
    updateFields();
}