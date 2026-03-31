export function initHeader() {
    initMobileMenu();
    initMobileSearch();
}

//menu
function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("mobile-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        toggle.classList.toggle("active");
    });
}

//search
function initMobileSearch() {
    const btn = document.getElementById("search-toggle");
    const search = document.getElementById("mobile-search");

    if (!btn || !search) return;

    btn.addEventListener("click", () => {
        search.classList.toggle("active");
    });
}