// fieldsRenderer.js

import { fields } from "../data/fields.js";

export function renderFields() {

    const container = document.getElementById("fields-container");

    if (!container) return;

    container.innerHTML = fields.map(field => `
    
        <a 
            href="../pages/field.html?id=${field.id}" 
            class="fields-page-card"

            data-id="${field.id}"
            data-name="${field.name.toLowerCase()}"
            data-location="${field.location.toLowerCase()}"
            data-type="${field.type}"
            data-rating="${field.rating}"
            data-price-from="${field.priceFrom}"
            data-price-to="${field.priceTo}"
            data-lat="${field.lat}"
            data-lng="${field.lng}"
        >

            <div class="field-image">
                <img src="${field.image}" alt="${field.name}">
            </div>

            <div class="field-content">

                <div class="field-top">

                    <h4>
                        ${field.name}

                        ${
                            field.type === "techada"
                                ? `<span class="tag">Techada</span>`
                                : ""
                        }
                    </h4>

                    <span class="rating">
                        ★ ${field.rating}
                    </span>

                </div>

                <p class="location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${field.location}
                </p>

                <p class="price">
                    $${field.priceFrom.toLocaleString()} - 
                    $${field.priceTo.toLocaleString()}
                </p>

            </div>

        </a>

    `).join("");
}