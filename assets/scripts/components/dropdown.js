export function initDropdown() {
    const dropdown = document.querySelector(".dropdown");

    if (!dropdown) return;

    dropdown.addEventListener("click", (e) => {
        // prevent link navigation
        e.preventDefault();

        dropdown.classList.toggle("active");
    });
}