import { fields } from "../data/fields.js";

function formatPrice(price) {
    return `$${price.toLocaleString()}`;
}

function getFeatures(field, limit = 3) {
    const combined = [...field.features, ...field.extraInfo];
    return [...new Set(combined)].slice(0, limit);
}

// FEATURED CARD
function createFeaturedCard(field) {
    return `
        <a href="pages/field.html?id=${field.id}" class="card">
            <div class="card-image">
                <img src="${field.image}" alt="${field.name}" loading="lazy" decoding="async" width="400" height="250">
                ${field.type === "techada" ? `<span class="tag-main-cards">Techada</span>` : ""}
            </div>
            <div class="card-body">
                <h4><i class="fa-regular fa-futbol"></i> ${field.name}</h4>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${field.location}</p>
                <p class="schedule"><i class="fa-regular fa-clock"></i> ${field.schedule.week}</p>
                <div class="features">
                    <i class="fas fa-star"></i>
                    ${getFeatures(field).map(feature => `<span>${feature}</span>`).join("")}
                </div>
                <div class="card-footer">
                    <span class="price"><i class="fa-solid fa-dollar-sign"></i> ${formatPrice(field.priceFrom)} - ${formatPrice(field.priceTo)}</span>
                    <span class="rating">★ ${field.rating}</span>
                </div>
            </div>
        </a>
    `;
}

// SMALL CARD
function createFieldCard(field) {
    return `
        <a href="pages/field.html?id=${field.id}" class="field-card">
            <div class="field-image">
                <img src="${field.image}" alt="${field.name}" loading="lazy" decoding="async" width="300" height="200">
            </div>
            <div class="field-content">
                <div class="field-top">
                    <h4><i class="fa-regular fa-futbol"></i> ${field.name}${field.type === "techada" ? `<span class="tag">Techada</span>` : ""}</h4>
                    <span class="rating">★ ${field.rating}</span>
                </div>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${field.location}</p>
                <p class="price"><i class="fa-solid fa-dollar-sign"></i> ${formatPrice(field.priceFrom)} - ${formatPrice(field.priceTo)}</p>
                <p class="schedule"><i class="fa-regular fa-clock"></i> ${field.schedule.week}</p>
                <div class="features">
                    <i class="fas fa-star"></i>
                    ${getFeatures(field).map(f => `<span>${f}</span>`).join("")}
                </div>
            </div>
        </a>
    `;
}

// RENDERERS
export function renderFeaturedFields(limit = 3) {
    const container = document.getElementById("featured-fields-container");
    if (!container) return;
    container.innerHTML = fields.slice(0, limit).map(createFeaturedCard).join("");
}

export function renderHomeFields(limit = 6) {
    const container = document.getElementById("home-fields-container");
    if (!container) return;
    container.innerHTML = fields.slice(0, limit).map(createFieldCard).join("");
}