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
}

//  WEATHER FUNCTIONS

async function loadWeather(field) {
    const container = document.getElementById("weather-container");
    if (!container || !field?.lat || !field?.lng) {
        if (container) container.innerHTML = `<p class="error-text">Ubicación no disponible</p>`;
        return;
    }

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${field.lat}&longitude=${field.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=America/Argentina/Buenos_Aires`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather API error");

        const data = await response.json();
        const current = data.current;

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

    } catch (error) {
        console.warn("Weather error:", error);
        container.innerHTML = `<p class="error-text">No se pudo cargar el clima en este momento</p>`;
    }
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