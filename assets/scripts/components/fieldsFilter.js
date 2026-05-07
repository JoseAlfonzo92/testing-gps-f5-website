export function initFieldsFilter() {

    const container =
        document.getElementById("fields-container");

    const cards = Array.from(
        document.querySelectorAll(".fields-page-card")
    );

    const searchInputs = Array.from(
        document.querySelectorAll(".global-search")
    );

    // Main search input used for filtering
    const searchInput =
        document.getElementById("search-input");

    const filterLocation =
        document.getElementById("filter-location");

    const filterType =
        document.getElementById("filter-type");

    const sortBy =
        document.getElementById("sort-by");

    const clearBtn =
        document.getElementById("clear-filters");

    const noResults =
        document.getElementById("no-results");

    const useLocationToggle =
        document.getElementById("use-location-toggle");

    // VIEW TOGGLE
    const gridBtn =
        document.getElementById("grid-view-btn");

    const mapBtn =
        document.getElementById("map-view-btn");

    const grid =
        document.querySelector(".fields-page-list");

    const map =
        document.getElementById("map-container");

    // APPLY SEARCH FROM URL ONLY ONCE
    const params = new URLSearchParams(
        window.location.search
    );

    const searchFromURL =
        params.get("search");

    if (searchFromURL && searchInput) {

        searchInput.value = searchFromURL;

        // Sync all visible search inputs
        searchInputs.forEach(input => {
            input.value = searchFromURL;
        });

        // Clean URL after applying
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );
    }

    // RESTORE LOCATION TOGGLE STATE
    if (useLocationToggle) {

        const savedLocationState =
            localStorage.getItem(
                "useLocationToggle"
            );

        useLocationToggle.checked =
            savedLocationState === "true";

        // SAVE STATE ON CHANGE
        useLocationToggle.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "useLocationToggle",
                    useLocationToggle.checked
                );

                updateFields();
            }
        );
    }

    // GEOLOCATION


    let userPosition = null;

    function requestLocation() {

        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            position => {

                userPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                updateFields();
            },

            error => {
                console.warn(error);
            },

            {
                enableHighAccuracy: true
            }
        );
    }

    function getDistanceKm(
        lat1,
        lng1,
        lat2,
        lng2
    ) {

        const R = 6371;

        const dLat =
            (lat2 - lat1) * Math.PI / 180;

        const dLng =
            (lng2 - lng1) * Math.PI / 180;

        const a =
            Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +

            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *

            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

        const c =
            2 * Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            );

        return R * c;
    }


    // FILTER + SORT + ANIMATE


    function updateFields() {

        const search =
            searchInput?.value
                .toLowerCase()
                .trim() || "";

        const location =
            filterLocation?.value || "";

        const type =
            filterType?.value || "";

        const sort =
            sortBy?.value || "";

        // Save FIRST positions (FLIP)
        const firstPositions = new Map();

        cards.forEach(card => {

            firstPositions.set(
                card,
                card.getBoundingClientRect()
            );
        });

        let visibleCards = [];

        // FILTER


        cards.forEach(card => {

            const searchableText = `
                ${card.dataset.name || ""}
                ${card.dataset.location || ""}
                ${card.dataset.type || ""}
                ${card.dataset.description || ""}
                ${card.dataset.features || ""}
                ${card.dataset.buffet || ""}
                ${card.dataset.address || ""}
            `
                .toLowerCase()
                .trim();

            const cardLocation =
                card.dataset.location || "";

            const cardType =
                card.dataset.type || "";

            const match =
                searchableText.includes(search) &&

                (
                    location === "" ||
                    cardLocation === location
                ) &&

                (
                    type === "" ||
                    cardType === type
                );

            if (match) {

                card.classList.remove("hidden");

                // Save live distance
                if (
                    userPosition &&
                    card.dataset.lat &&
                    card.dataset.lng
                ) {

                    const distance =
                        getDistanceKm(
                            userPosition.lat,
                            userPosition.lng,
                            parseFloat(card.dataset.lat),
                            parseFloat(card.dataset.lng)
                        );

                    card.dataset.distance = distance;

                } else {

                    card.dataset.distance = "";
                }

                visibleCards.push(card);

            } else {

                card.classList.add("hidden");
            }
        });


        // SORT


        if (
            sort ||
            (
                useLocationToggle?.checked &&
                userPosition
            )
        ) {

            visibleCards.sort((a, b) => {

                // LOCATION PRIORITY
                if (
                    useLocationToggle?.checked &&
                    userPosition
                ) {

                    const distanceA =
                        parseFloat(
                            a.dataset.distance
                        ) || Infinity;

                    const distanceB =
                        parseFloat(
                            b.dataset.distance
                        ) || Infinity;

                    if (distanceA !== distanceB) {

                        return (
                            distanceA - distanceB
                        );
                    }
                }

                const priceA =
                    parseFloat(
                        a.dataset.pricefrom
                    ) || 0;

                const priceB =
                    parseFloat(
                        b.dataset.pricefrom
                    ) || 0;

                const ratingA =
                    parseFloat(
                        a.dataset.rating
                    ) || 0;

                const ratingB =
                    parseFloat(
                        b.dataset.rating
                    ) || 0;

                if (sort === "price-low") {
                    return priceA - priceB;
                }

                if (sort === "price-high") {
                    return priceB - priceA;
                }

                if (sort === "rating") {
                    return ratingB - ratingA;
                }

                return 0;
            });
        }


        // REORDER DOM


        visibleCards.forEach(card => {
            container.appendChild(card);
        });


        // FLIP ANIMATION


        cards.forEach(card => {

            const first =
                firstPositions.get(card);

            const last =
                card.getBoundingClientRect();

            const dx =
                first.left - last.left;

            const dy =
                first.top - last.top;

            if (dx || dy) {

                card.style.transform =
                    `translate(${dx}px, ${dy}px)`;

                card.style.transition =
                    "none";

                requestAnimationFrame(() => {

                    card.style.transform = "";

                    card.style.transition =
                        "transform 0.4s ease";
                });
            }
        });


        // STAGGER


        visibleCards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 0.03}s`;
            }
        );


        // EMPTY STATE


        if (visibleCards.length === 0) {

            noResults?.classList.add("active");

        } else {

            noResults?.classList.remove("active");
        }

        // Force reflow
        container.offsetHeight;
    }

    // EXPOSE GLOBALLY
    window.updateFields = updateFields;


    // CLEAR FILTERS


    clearBtn?.addEventListener(
        "click",
        () => {

            // Clear ALL search inputs
            searchInputs.forEach(input => {
                input.value = "";
            });

            if (filterLocation) {
                filterLocation.value = "";
            }

            if (filterType) {
                filterType.value = "";
            }

            if (sortBy) {
                sortBy.value = "";
            }

            // Disable + save location toggle
            if (useLocationToggle) {

                useLocationToggle.checked = false;

                localStorage.setItem(
                    "useLocationToggle",
                    "false"
                );
            }

            updateFields();
        }
    );


    // EVENTS


    searchInput?.addEventListener(
        "input",
        updateFields
    );

    filterLocation?.addEventListener(
        "change",
        updateFields
    );

    filterType?.addEventListener(
        "change",
        updateFields
    );

    sortBy?.addEventListener(
        "change",
        updateFields
    );


    // VIEW TOGGLE


    gridBtn?.addEventListener(
        "click",
        () => {

            grid?.classList.remove("hide");

            map?.classList.remove("active");

            gridBtn.classList.add("active");

            mapBtn?.classList.remove("active");
        }
    );

    mapBtn?.addEventListener(
        "click",
        () => {

            grid?.classList.add("hide");

            map?.classList.add("active");

            mapBtn.classList.add("active");

            gridBtn?.classList.remove("active");
        }
    );


    // INIT


    if (useLocationToggle?.checked) {
        requestLocation();
    }

    updateFields();
}