import { fields } from "../data/fields.js";

export function initFieldsFilter() {

    const container =
        document.getElementById(
            "fields-container"
        );

    const cards = Array.from(
        document.querySelectorAll(
            ".fields-page-card"
        )
    );

    const searchInputs = Array.from(
        document.querySelectorAll(
            ".global-search"
        )
    );

    // FIELD MAP
    const fieldMap = new Map(
        fields.map(field => [
            field.id,
            field
        ])
    );

    // NORMALIZE TEXT
    function normalizeText(
        text = ""
    ) {

        return text

            .toString()

            .toLowerCase()

            // Remove accents
            .normalize("NFD")

            .replace(
                /[\u0300-\u036f]/g,
                ""
            )

            // Remove commas + dots
            .replace(
                /[.,]/g,
                ""
            )

            // Collapse spaces
            .replace(
                /\s+/g,
                " "
            )

            .trim();
    }

    // SEARCHABLE TEXT
    function createSearchableText(
        field
    ) {

        const text = [

            // BASIC
            field.name,
            field.location,
            field.province,
            field.city,
            field.zone,
            field.type,
            field.description,
            field.address,

            // SCHEDULE
            field.schedule?.week,
            field.schedule?.weekend,

            // FEATURES
            ...(field.features || []),

            // BUFFET
            ...(field.buffet || []),

            // EXTRA INFO
            ...(field.extraInfo || []),

            // BOOKING
            field.booking?.players,
            field.booking?.surface,

            // NUMBERS
            field.rating?.toString(),
            field.priceFrom?.toString(),
            field.priceTo?.toString()

        ]

        .filter(Boolean)

        .join(" ");

        return normalizeText(
            text
        );
    }

    // Main search input used for filtering
    const searchInput =
        document.getElementById(
            "search-input"
        );

    const filterProvince =
        document.getElementById(
            "filter-province"
        );

    const filterCity =
        document.getElementById(
            "filter-city"
        );

    const filterZone =
        document.getElementById(
            "filter-zone"
        );

    const filterType =
        document.getElementById(
            "filter-type"
        );

    const sortBy =
        document.getElementById(
            "sort-by"
        );

    const clearBtn =
        document.getElementById(
            "clear-filters"
        );

    const noResults =
        document.getElementById(
            "no-results"
        );

    const useLocationToggle =
        document.getElementById(
            "use-location-toggle"
        );

    // VIEW TOGGLE
    const gridBtn =
        document.getElementById(
            "grid-view-btn"
        );

    const mapBtn =
        document.getElementById(
            "map-view-btn"
        );

    const grid =
        document.querySelector(
            ".fields-page-list"
        );

    const map =
        document.getElementById(
            "map-container"
        );

    // APPLY SEARCH FROM URL ONLY ONCE
    const params =
        new URLSearchParams(
            window.location.search
        );

    const searchFromURL =
        params.get("search");

    if (
        searchFromURL &&
        searchInput
    ) {

        searchInput.value =
            searchFromURL;

        // Sync all visible search inputs
        searchInputs.forEach(input => {

            input.value =
                searchFromURL;
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
            savedLocationState ===
            "true";

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

        if (
            !navigator.geolocation
        ) return;

        navigator.geolocation.getCurrentPosition(

            position => {

                userPosition = {
                    lat:
                        position.coords.latitude,

                    lng:
                        position.coords.longitude
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
            (lat2 - lat1) *
            Math.PI / 180;

        const dLng =
            (lng2 - lng1) *
            Math.PI / 180;

        const a =
            Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +

            Math.cos(
                lat1 * Math.PI / 180
            ) *

            Math.cos(
                lat2 * Math.PI / 180
            ) *

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
            normalizeText(
                searchInput?.value || ""
            );

        const province =
            filterProvince?.value || "";

        const city =
            filterCity?.value || "";

        const zone =
            filterZone?.value || "";

        const type =
            filterType?.value || "";

        const sort =
            sortBy?.value || "";

        // Save FIRST positions (FLIP)
        const firstPositions =
            new Map();

        cards.forEach(card => {

            firstPositions.set(
                card,
                card.getBoundingClientRect()
            );
        });

        let visibleCards = [];

        // FILTER
        cards.forEach(card => {

            const field =
                fieldMap.get(
                    card.dataset.id
                );

            if (!field) return;

            const searchableText =
                createSearchableText(
                    field
                );

            const match =

                searchableText.includes(
                    search
                ) &&

                (
                    province === "" ||

                    field.province ===
                    province
                ) &&

                (
                    city === "" ||

                    field.city === city
                ) &&

                (
                    zone === "" ||

                    field.zone === zone
                ) &&

                (
                    type === "" ||

                    field.type === type
                );

            if (match) {

                card.classList.remove(
                    "hidden"
                );

                // Save live distance
                if (
                    userPosition &&
                    field.lat &&
                    field.lng
                ) {

                    const distance =
                        getDistanceKm(
                            userPosition.lat,
                            userPosition.lng,
                            field.lat,
                            field.lng
                        );

                    card.dataset.distance =
                        distance;

                } else {

                    card.dataset.distance =
                        "";
                }

                visibleCards.push(card);

            } else {

                card.classList.add(
                    "hidden"
                );
            }
        });

        // SORT
        if (
            sort ||

            (
                useLocationToggle
                    ?.checked &&

                userPosition
            )
        ) {

            visibleCards.sort(
                (a, b) => {

                    const fieldA =
                        fieldMap.get(
                            a.dataset.id
                        );

                    const fieldB =
                        fieldMap.get(
                            b.dataset.id
                        );

                    // LOCATION PRIORITY
                    if (
                        useLocationToggle
                            ?.checked &&

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

                        if (
                            distanceA !==
                            distanceB
                        ) {

                            return (
                                distanceA -
                                distanceB
                            );
                        }
                    }

                    if (
                        sort ===
                        "price-low"
                    ) {

                        return (
                            fieldA.priceFrom -
                            fieldB.priceFrom
                        );
                    }

                    if (
                        sort ===
                        "price-high"
                    ) {

                        return (
                            fieldB.priceFrom -
                            fieldA.priceFrom
                        );
                    }

                    if (
                        sort ===
                        "rating"
                    ) {

                        return (
                            fieldB.rating -
                            fieldA.rating
                        );
                    }

                    return 0;
                }
            );
        }

        // REORDER DOM
        visibleCards.forEach(card => {

            container.appendChild(
                card
            );
        });

        // FLIP ANIMATION
        cards.forEach(card => {

            const first =
                firstPositions.get(
                    card
                );

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

                requestAnimationFrame(
                    () => {

                        card.style.transform =
                            "";

                        card.style.transition =
                            "transform 0.4s ease";
                    }
                );
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
        if (
            visibleCards.length === 0
        ) {

            noResults?.classList.add(
                "active"
            );

        } else {

            noResults?.classList.remove(
                "active"
            );
        }

        // Force reflow
        container.offsetHeight;
    }

    // EXPOSE GLOBALLY
    window.updateFields =
        updateFields;

    // CLEAR FILTERS
    clearBtn?.addEventListener(
        "click",
        () => {

            // Clear ALL search inputs
            searchInputs.forEach(
                input => {

                    input.value = "";
                }
            );

            if (filterProvince) {
                filterProvince.value =
                    "";
            }

            if (filterCity) {
                filterCity.value = "";
            }

            if (filterZone) {
                filterZone.value = "";
            }

            if (filterType) {
                filterType.value = "";
            }

            if (sortBy) {
                sortBy.value = "";
            }

            // Disable + save location toggle
            if (
                useLocationToggle
            ) {

                useLocationToggle.checked =
                    false;

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

    filterProvince?.addEventListener(
        "change",
        updateFields
    );

    filterCity?.addEventListener(
        "change",
        updateFields
    );

    filterZone?.addEventListener(
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

            grid?.classList.remove(
                "hide"
            );

            map?.classList.remove(
                "active"
            );

            gridBtn.classList.add(
                "active"
            );

            mapBtn?.classList.remove(
                "active"
            );
        }
    );

    mapBtn?.addEventListener(
        "click",
        () => {

            grid?.classList.add(
                "hide"
            );

            map?.classList.add(
                "active"
            );

            mapBtn.classList.add(
                "active"
            );

            gridBtn?.classList.remove(
                "active"
            );
        }
    );

    // INIT
    if (
        useLocationToggle?.checked
    ) {

        requestLocation();
    }

    updateFields();
}