import { fields } from "../data/fields.js";

export function initFieldPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const field = fields.find(f => f.id === id);

    if (!field) {
        console.error("Field not found:", id);
        return;
    }

    // BASIC
    document.getElementById("field-name").innerHTML =
        `${field.name} ${field.type === "techada" ? '<span class="tag">Techada</span>' : ""}`;

    document.getElementById("field-image").src = field.image;

    document.getElementById("field-rating").innerHTML =
        `<i class="fas fa-star"></i> ${field.rating}`;

    document.getElementById("field-location").innerHTML =
        `<i class="fas fa-map-marker-alt"></i> ${field.location}`;

    document.getElementById("field-address").textContent = field.address;
    document.getElementById("field-description").textContent = field.description;

    // PRICES
    document.getElementById("price-week").textContent = `$${field.priceFrom}`;
    document.getElementById("price-weekend").textContent = `$${field.priceTo}`;
    document.getElementById("price-from").textContent = `$${field.priceFrom}`;

    // SCHEDULE
document.getElementById("schedule-week").textContent = field.schedule.week;
document.getElementById("schedule-weekend").textContent = field.schedule.weekend;

// FEATURES
const featuresContainer = document.getElementById("features-container");
featuresContainer.innerHTML = field.features
  .map(f => `<span>${f}</span>`)
  .join("");

// BUFFET
const buffetContainer = document.getElementById("buffet-container");
buffetContainer.innerHTML = field.buffet
  .map(item => `<span>${item}</span>`)
  .join("");

// EXTRA INFO
const extraContainer = document.getElementById("extra-info-container");
extraContainer.innerHTML = field.extraInfo
  .map(info => `<p>${info}</p>`)
  .join("");

// BOOKING
document.getElementById("booking-players").innerHTML =
  `<i class="fas fa-users"></i> ${field.booking.players}`;

document.getElementById("booking-surface").innerHTML =
  `<i class="fas fa-layer-group"></i> ${field.booking.surface}`;

const phoneLink = document.getElementById("booking-phone");
phoneLink.href = `tel:${field.booking.phone}`;
phoneLink.innerHTML = `<i class="fas fa-phone"></i> Llamar`;

    // MAP
    const map = document.getElementById("field-map");
    map.dataset.lat = field.lat;
    map.dataset.lng = field.lng;

    document.getElementById("map-address").textContent = field.address;
}