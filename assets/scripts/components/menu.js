export function initMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        toggle.classList.toggle("active");
    });
}