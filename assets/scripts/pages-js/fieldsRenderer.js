import { fields } from "../data/fields.js";

export function renderFields() {

    const container = document.getElementById("fields-container");

    if (!container) return;

    container.innerHTML = fields.map(field => `

        <a 
            href="../pages/field.html?id=${field.id}" 
            class="fields-page-card"
            data-id="${field.id}"
        >

            <div class="field-image">

                <img
                    src="${field.image}"
                    alt="${field.name}"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="250"
                >

            </div>

            <div class="field-content">

                <div class="field-top">

                    <h4>

                        ${field.name}

                        ${
                            field.type === "techada"
                                ? `
                                <span class="tag">
                                    Techada
                                </span>
                                `
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