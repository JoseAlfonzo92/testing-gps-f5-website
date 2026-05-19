import { fields } from "../data/fields.js";

export function initFieldPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const field = fields.find(f => f.id === id);
    
    if (!field) {
        console.error("Field not found:", id);
        return;
    }

    document.title = `${field.name} | Fulbo 5`;

    // BASIC INFO
    document.getElementById("field-name").innerHTML = 
        `${field.name} ${field.type === "techada" ? '<span class="tag">Techada</span>' : ""}`;
    
    const fieldImage = document.getElementById("field-image");
    if (fieldImage) {
        fieldImage.loading = "lazy";
        fieldImage.alt = `${field.name} - ${field.location}`;
        fieldImage.src = field.image;
    }

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

    // FEATURES, BUFFET, EXTRA INFO
    document.getElementById("features-container").innerHTML = 
        field.features.map(f => `<span>${f}</span>`).join("");

    document.getElementById("buffet-container").innerHTML = 
        field.buffet.map(item => `<span>${item}</span>`).join("");

    document.getElementById("extra-info-container").innerHTML = 
        field.extraInfo.map(info => `<p>${info}</p>`).join("");

    // NEW: MULTIPLE FIELD SIZES 
    renderFieldSizes(field);

    // BOOKING
    document.getElementById("booking-players").innerHTML =
        `<i class="fas fa-users"></i> ${field.booking.players}`;

    document.getElementById("booking-surface").innerHTML =
        `<i class="fas fa-layer-group"></i> ${field.booking.surface}`;

    // Phone & WhatsApp
    const cleanPhone = field.booking.phone.replace(/\D/g, "");

    const phoneLink = document.getElementById("booking-phone");
    phoneLink.href = `tel:+${cleanPhone}`;
    phoneLink.innerHTML = `<i class="fas fa-phone"></i> Llamar`;

    const whatsappBtn = document.getElementById("booking-whatsapp");
    const message = `Hola! Quiero consultar disponibilidad para ${field.name} (${field.location})`;
    whatsappBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    // MAP DATA
    const map = document.getElementById("field-map");
    map.dataset.lat = field.lat;
    map.dataset.lng = field.lng;
    map.dataset.name = field.name;
    document.getElementById("map-address").textContent = field.address;

    //  WEATHER 
    loadWeather(field);

    //  SHARE FUNCTIONALITY 
function initShareButtons(field) {
    const currentUrl = window.location.href;
    const shareText = `${field.name} - ${field.location}\nDesde $${field.priceFrom} - $${field.priceTo}/h\n`;

    // WhatsApp
    document.getElementById("share-whatsapp").href = 
        `https://wa.me/?text=${encodeURIComponent(shareText + currentUrl)}`;

    // Facebook
    document.getElementById("share-facebook").href = 
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

    // Twitter / X
    document.getElementById("share-twitter").href = 
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;

    // Messenger
    document.getElementById("share-messenger").href = 
        `https://www.facebook.com/dialog/send?link=${encodeURIComponent(currentUrl)}&redirect_uri=${encodeURIComponent(currentUrl)}`;

    // Instagram 
     document.getElementById("share-instagram").href =
            `https://www.instagram.com/post/send?link=${encodeURIComponent(currentUrl)}&redirect_uri=${encodeURIComponent(currentUrl)}`;


    // Copy Link Button
    const copyBtn = document.getElementById("copy-link-btn");
    if (copyBtn) {
        copyBtn.addEventListener("click", (e) => {
            copyToClipboard(currentUrl, "Enlace copiado correctamente!", e.currentTarget);
        });
    }
}

// Helper function
function copyToClipboard(text, successMessage, target) {
    navigator.clipboard.writeText(text).then(() => {
        if (target) {
            target.style.color = "var(--color-text-buttons)";
            if (target.tagName === "BUTTON") {
                const span = target.querySelector("span");
                if (span) {
                    span.textContent = successMessage;
                } else {
                    target.textContent = successMessage;
                }
            }
        }
    }).catch(() => {
        alert("Error al copiar el enlace");
    });
}

    // Initialize Share Buttons
    initShareButtons(field);
}

//  FIELD SIZES 
function renderFieldSizes(field) {
    const container = document.getElementById("field-sizes-container");
    if (!container || !field.sizes || !field.sizes.length) return;

    const html = field.sizes.map(size => `
        <span class="size-tag">${size}</span>
    `).join("");

    container.innerHTML = html;
}


//  WEATHER FUNCTIONS 

async function loadWeather(field) {
    const currentContainer = document.getElementById("weather-container");
    const forecastContainer = document.getElementById("weather-forecast-container");

    if (!field?.lat || !field?.lng) {
        if (currentContainer) currentContainer.innerHTML = `<p class="error-text">Ubicación no disponible</p>`;
        return;
    }

    try {
        const url = `https://api.open-meteo.com/v1/forecast?` +
                    `latitude=${field.lat}&longitude=${field.lng}` +
                    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
                    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
                    `&timezone=America/Argentina/Buenos_Aires`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather API error");

        const data = await response.json();

        renderCurrentWeather(data.current, currentContainer);
        if (forecastContainer) renderForecast(data.daily, forecastContainer);

    } catch (error) {
        console.warn("Weather error:", error);
        if (currentContainer) currentContainer.innerHTML = `<p class="error-text">No se pudo cargar el clima</p>`;
        if (forecastContainer) forecastContainer.innerHTML = `<p class="error-text">Pronóstico no disponible</p>`;
    }
}

function renderCurrentWeather(current, container) {
    if (!container) return;
    const weatherInfo = getWeatherInfo(current.weather_code);

    container.innerHTML = `
        <div class="weather-main">
            <div class="weather-icon">${weatherInfo.emoji}</div>
            <div>
                <strong class="temp">${Math.round(current.temperature_2m)}°C</strong>
                <small>Sensación: ${Math.round(current.apparent_temperature)}°C</small>
            </div>
        </div>
        <p class="weather-desc">${weatherInfo.description}</p>
        <div class="weather-extra">
            <span>💧 ${current.relative_humidity_2m}% Humedad</span>
            <span>🌬️ ${current.wind_speed_10m} km/h</span>
        </div>
    `;
}

// 7-Day Forecast
function renderForecast(daily, container) {
    if (!container || !daily?.time?.length) return;

    let html = `<div class="forecast-grid">`;

    const today = new Date();

    // normalize current day at midnight
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7 && i < daily.time.length; i++) {

        // Build date from API safely (avoid UTC shifts)
        const [year, month, day] = daily.time[i]
            .split("-")
            .map(Number);

        const forecastDate = new Date(year, month - 1, day);

        forecastDate.setHours(0, 0, 0, 0);

        const isToday =
            forecastDate.getTime() === today.getTime();

        // Use system locale calendar names
        const dayName = forecastDate.toLocaleDateString(
            "es-AR",
            {
                weekday: "short"
            }
        );

        const dayNumber = forecastDate.getDate();

        const weatherInfo = getWeatherInfo(
            daily.weather_code[i]
        );

        html += `
            <div class="forecast-day ${isToday ? "today" : ""}">
                
                <div class="forecast-date">
                    ${isToday ? "Hoy" : dayName}
                </div>

                <small class="forecast-day-number">
                    ${dayNumber}
                </small>

                <div class="forecast-icon">
                    ${weatherInfo.emoji}
                </div>

                <div class="forecast-temp">
                    <span class="max">
                        MAX <strong>${Math.round(daily.temperature_2m_max[i])}°</strong>
                    </span>

                    <span class="min">
                        MIN <strong>${Math.round(daily.temperature_2m_min[i])}°</strong>
                    </span>
                </div>

            </div>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;
}

function getWeatherInfo(code) {
    const map = {
        0:  { emoji: "☀️", description: "Cielo despejado" },
        1:  { emoji: "🌤️", description: "Mayormente despejado" },
        2:  { emoji: "⛅", description: "Parcialmente nublado" },
        3:  { emoji: "☁️", description: "Nublado" },
        45: { emoji: "🌫️", description: "Niebla" },
        51: { emoji: "🌦️", description: "Lluvia ligera" },
        61: { emoji: "🌧️", description: "Lluvia" },
        71: { emoji: "❄️", description: "Nieve" },
        80: { emoji: "🌦️", description: "Chubascos" },
    };
    return map[code] || { emoji: "🌥️", description: "Clima variable" };
}