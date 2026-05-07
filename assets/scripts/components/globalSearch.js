export function initGlobalSearch() {

    const searchInputs =
        Array.from(document.querySelectorAll(".global-search"));

    if (searchInputs.length === 0) return;

    let isSyncing = false;

    // Detect environment
    const isGithubPages =
        window.location.hostname.includes("github.io");

    // Base path
    const basePath = isGithubPages
        ? "/F5-Futbol-5"
        : "/F5%20Futbol%205";

    // SYNC ALL INPUTS
    searchInputs.forEach(input => {

        input.addEventListener("input", (e) => {

            if (isSyncing) return;

            const value = e.target.value;

            isSyncing = true;

            // Sync every search input
            searchInputs.forEach(i => {

                if (i !== e.target) {
                    i.value = value;
                }
            });

            isSyncing = false;

            // Trigger filtering ONLY if available
            if (typeof window.updateFields === "function") {
                window.updateFields();
            }
        });
    });

    // ENTER REDIRECT
    searchInputs.forEach(input => {

        input.addEventListener("keydown", (e) => {

            if (e.key !== "Enter") return;

            const value = input.value.trim();

            if (!value) return;

            // Only redirect if NOT already on fields page
            if (!document.querySelector("#fields-container")) {

                window.location.href =
                    `${basePath}/pages/all-fields-page.html?search=${encodeURIComponent(value)}`;
            }
        });
    });
}