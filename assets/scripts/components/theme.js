export function initTheme() {
    const toggles = document.querySelectorAll(".theme-toggle");
    const root = document.documentElement;

    if (!toggles.length) return;

    // Theme already set in <head>
    let currentTheme =
        root.getAttribute("data-theme") || "light";

    updateButtons(currentTheme);

    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {

            currentTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "theme",
                currentTheme
            );

            applyTheme(currentTheme);
        });
    });

    // react only if user has no manual preference
    window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", e => {

            if (!localStorage.getItem("theme")) {
                applyTheme(
                    e.matches
                        ? "dark"
                        : "light"
                );
            }
        });

    function applyTheme(theme) {
        root.setAttribute(
            "data-theme",
            theme
        );

        updateButtons(theme);
    }

    function updateButtons(theme) {
        toggles.forEach(btn => {
            btn.innerHTML =
                theme === "dark"
                    ? '<i class="fa-regular fa-sun"></i>'
                    : '<i class="fas fa-moon"></i>';
        });
    }
}