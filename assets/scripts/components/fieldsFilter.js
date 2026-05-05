export function initFieldsFilter() {

    const container = document.getElementById("fields-container");
    const cards = Array.from(document.querySelectorAll(".fields-page-card"));

    const searchInput = document.getElementById("search-input");
    const filterLocation = document.getElementById("filter-location");
    const filterType = document.getElementById("filter-type");
    const sortBy = document.getElementById("sort-by");
    const clearBtn = document.getElementById("clear-filters");
    const noResults = document.getElementById("no-results");
    const useLocationToggle = document.getElementById("use-location-toggle");

    //  view toggle
    const gridBtn = document.getElementById("grid-view-btn");
    const mapBtn = document.getElementById("map-view-btn");
    const grid = document.querySelector(".fields-page-list");
    const map = document.getElementById("map-container");

    // FILTER + SORT + ANIMATE
    
    function updateFields() {

        const search = searchInput?.value.toLowerCase() || "";
        const location = filterLocation?.value || "";
        const type = filterType?.value || "";
        const sort = sortBy?.value || "";

        // Save FIRST positions (FLIP)
        const firstPositions = new Map();
        cards.forEach(card => {
            firstPositions.set(card, card.getBoundingClientRect());
        });

        let visibleCards = [];

        //  FILTER
        cards.forEach(card => {

            const name = card.dataset.name || "";
            const cardLocation = card.dataset.location || "";
            const cardType = card.dataset.type || "";

            const match =
                name.includes(search) &&
                (location === "" || cardLocation === location) &&
                (type === "" || cardType === type);

            if (match) {
                card.classList.remove("hidden");
                visibleCards.push(card);
            } else {
                card.classList.add("hidden");
            }
        });

        //  SORT 
        if (sort) {
            visibleCards.sort((a, b) => {

                const priceA = extractPrice(a);
                const priceB = extractPrice(b);

                const ratingA = extractRating(a);
                const ratingB = extractRating(b);

                if (sort === "price-low") return priceA - priceB;
                if (sort === "price-high") return priceB - priceA;
                if (sort === "rating") return ratingB - ratingA;

                return 0;
            });
        }

        //  REORDER DOM 
        visibleCards.forEach(card => container.appendChild(card));

        //  FLIP ANIMATION 
        cards.forEach(card => {

            const first = firstPositions.get(card);
            const last = card.getBoundingClientRect();

            const dx = first.left - last.left;
            const dy = first.top - last.top;

            if (dx || dy) {
                card.style.transform = `translate(${dx}px, ${dy}px)`;
                card.style.transition = "none";

                requestAnimationFrame(() => {
                    card.style.transform = "";
                    card.style.transition = "transform 0.4s ease";
                });
            }
        });

        //  STAGGER 
        visibleCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.03}s`;
        });

        //  EMPTY STATE 
        if (visibleCards.length === 0) {
            noResults?.classList.add("active");
        } else {
            noResults?.classList.remove("active");
        }

        // Force reflow fix (prevents visual glitches)
        container.offsetHeight;
    }

    // HELPERS
    
    function extractPrice(card) {
        const el = card.querySelector(".price");
        if (!el) return 0;

        const text = el.innerText;
        return parseInt(text.replace(/[^0-9]/g, "")) || 0;
    }

    function extractRating(card) {
        const el = card.querySelector(".rating");
        if (!el) return 0;

        const text = el.innerText;
        return parseFloat(text.replace("★", "")) || 0;
    }

    // CLEAR FILTERS
    
    clearBtn?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (filterLocation) filterLocation.value = "";
    if (filterType) filterType.value = "";
    if (sortBy) sortBy.value = "";
    if (useLocationToggle) {
        useLocationToggle.checked = false;
    }

    updateFields();
});

    // EVENTS
    
    searchInput?.addEventListener("input", updateFields);
    filterLocation?.addEventListener("change", updateFields);
    filterType?.addEventListener("change", updateFields);
    sortBy?.addEventListener("change", updateFields);

    // VIEW TOGGLE 
    
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

    // INIT
    updateFields();
}