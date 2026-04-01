export function initDropdown() {
    const dropdown = document.querySelector(".dropdown");

    if (!dropdown) return;

    dropdown.addEventListener("click", (e) => {
        // Only prevent default for the dropdown toggle, not links
        if (e.target.closest(".dropdown-toggle")) {
            e.preventDefault();
            dropdown.classList.toggle("active");
        }
    });
}