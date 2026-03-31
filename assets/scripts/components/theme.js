export function initTheme() {
    const toggles = document.querySelectorAll(".theme-toggle");
    const root = document.documentElement;

    if (!toggles.length) return;

    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let currentTheme = savedTheme || (systemDark ? "dark" : "light");

    applyTheme(currentTheme);

    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            currentTheme = currentTheme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", currentTheme);
            applyTheme(currentTheme);
        });
    });

    window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", e => {
            if (!localStorage.getItem("theme")) {
                applyTheme(e.matches ? "dark" : "light");
            }
        });

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);

        toggles.forEach(btn => {
            btn.innerHTML = theme === "dark"
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        });
    }
}