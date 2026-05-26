import { fields } from "../data/fields.js";

//  HELPER FUNCTIONS

function renderFieldSizes(field) {
    const container = document.getElementById("field-sizes-container");
    if (!container || !field.sizes?.length) return;

    container.innerHTML = field.sizes.map(size => 
        `<span class="size-tag">${size}</span>`
    ).join("");
}

function renderAllowedBoots(field) {
    const container = document.getElementById("allowed-boots-container");
    if (!container) return;

    if (!field.allowedBoots?.length) {
        container.innerHTML = `<p class="text-muted">Información no disponible</p>`;
        return;
    }

    const bootInfo = {
        "FG": { label: "FG - Terreno Firme", desc: "Canchas de pasto natural", icon: "fas fa-leaf" },
        "TF": { label: "TF - Pasto Artificial", desc: "Fibras cortas (Artificial)", icon: "fas fa-chess-board" },
        "IN": { label: "IN - Indoor", desc: "Canchas cubiertas / lisas", icon: "fas fa-home" }
    };

    let html = `<div class="boots-grid">`;

    field.allowedBoots.forEach(code => {
        const info = bootInfo[code] || { label: code, desc: "", icon: "fas fa-shoe-prints" };
        html += `
            <div class="boot-card">
                <div class="boot-icon"><i class="${info.icon}"></i></div>
                <div class="boot-content">
                    <strong>${info.label}</strong>
                    <small>${info.desc}</small>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

function renderAvailableJerseys(field) {
    const container = document.getElementById("available-jerseys-container");
    if (!container) return;

    if (!field.availableJerseys?.length) {
        container.innerHTML =
        `<p class="text-muted">No hay información de camisetas</p>`;
        return;
    }

    let html = `
        <div class="jerseys-carousel-wrapper">

            <button class="jersey-arrow jersey-left">
                <i class="fas fa-chevron-left"></i>
            </button>

            <div class="jerseys-carousel">
    `;

    field.availableJerseys.forEach(jersey => {

        const imageUrl =
            jersey.image ||
            `https://res.cloudinary.com/dolmulmgp/image/upload/v1/jerseys/${jersey.code}.png`;

        html += `
            <div class="jersey-item" title="${jersey.name}">
                <img
                    src="${imageUrl}"
                    alt="${jersey.name}"
                    class="jersey-image"
                    onerror="
                    this.onerror=null;
                    this.src='https://via.placeholder.com/90x90?text=Jersey'
                    "
                >
            </div>
        `;
    });

    html += `
            </div>

            <button class="jersey-arrow jersey-right">
                <i class="fas fa-chevron-right"></i>
            </button>

        </div>
    `;

    container.innerHTML = html;

    // arrows
    const carousel = container.querySelector(".jerseys-carousel");

    container.querySelector(".jersey-left")
        .addEventListener("click", () => {
            carousel.scrollBy({
                left: -250,
                behavior: "smooth"
            });
        });

    container.querySelector(".jersey-right")
        .addEventListener("click", () => {
            carousel.scrollBy({
                left: 250,
                behavior: "smooth"
            });
        });
}

function initShareButtons(field) {
    const currentUrl = window.location.href;
    const shareText = `${field.name} - ${field.location}\nDesde $${field.priceFrom} - $${field.priceTo}/h\n`;

    document.getElementById("share-whatsapp").href = 
        `https://wa.me/?text=${encodeURIComponent(shareText + currentUrl)}`;

    document.getElementById("share-facebook").href = 
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

    document.getElementById("share-twitter").href = 
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;

    document.getElementById("share-messenger").href = 
        `https://www.facebook.com/dialog/send?link=${encodeURIComponent(currentUrl)}&redirect_uri=${encodeURIComponent(currentUrl)}`;

    document.getElementById("share-instagram").href = 
        `https://www.instagram.com/post/send?link=${encodeURIComponent(currentUrl)}&redirect_uri=${encodeURIComponent(currentUrl)}`;

    const copyBtn = document.getElementById("copy-link-btn");
    if (copyBtn) {
        copyBtn.addEventListener("click", (e) => {
            copyToClipboard(currentUrl, "Enlace copiado correctamente!", e.currentTarget);
        });
    }
}

function copyToClipboard(text, successMessage, target) {
    navigator.clipboard.writeText(text).then(() => {
        if (target) {
            target.style.color = "var(--color-text-buttons)";
            const span = target.querySelector("span");
            if (span) span.textContent = successMessage;
            else target.textContent = successMessage;
        }
    }).catch(() => alert("Error al copiar el enlace"));
}

function renderSimilarFields(currentField) {
    const container = document.getElementById("similar-fields-carousel");
    if (!container) return;

    const similar = fields
        .filter(f => f.id !== currentField.id)
        .filter(f => f.province === currentField.province || f.city === currentField.city)
        .sort((a, b) => {
            const scoreA = (a.province === currentField.province ? 2 : 0) + (a.city === currentField.city ? 3 : 0);
            const scoreB = (b.province === currentField.province ? 2 : 0) + (b.city === currentField.city ? 3 : 0);
            return scoreB - scoreA;
        })
        .slice(0, 12);

    if (similar.length === 0) {
        container.innerHTML = `<p class="text-muted">No hay canchas similares en esta zona.</p>`;
        return;
    }

    container.innerHTML = similar.map(f => `
        <a href="field.html?id=${f.id}" class="similar-field-card">
            <div class="similar-field-image">
                <img src="${f.image}" alt="${f.name}" loading="lazy">
                ${f.type === "techada" ? `<span class="tag">Techada</span>` : ""}
            </div>
            <div class="similar-field-info">
                <h4>${f.name}</h4>
                <p class="similar-location"><i class="fas fa-map-marker-alt"></i> ${f.location}</p>
                <p class="similar-price">$${f.priceFrom} - $${f.priceTo}</p>
            </div>
        </a>
    `).join("");

    // Arrow Controls
    const btnLeft = document.getElementById("similar-arrow-left");
    const btnRight = document.getElementById("similar-arrow-right");

    if (btnLeft && btnRight) {
        const scrollAmount = 640;
        btnLeft.addEventListener("click", () => container.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
        btnRight.addEventListener("click", () => container.scrollBy({ left: scrollAmount, behavior: "smooth" }));

        const updateArrows = () => updateArrowVisibility(container, btnLeft, btnRight);
        setTimeout(updateArrows, 300);
        container.addEventListener("scroll", updateArrows);
    }
}

function updateArrowVisibility(container, btnLeft, btnRight) {
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    btnLeft.style.opacity = scrollLeft <= 30 ? "0.35" : "1";
    btnRight.style.opacity = scrollLeft >= maxScroll - 30 ? "0.35" : "1";
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
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${field.lat}&longitude=${field.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America/Argentina/Buenos_Aires`;

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

function renderForecast(daily, container) {
    if (!container || !daily?.time?.length) return;

    let html = `<div class="forecast-grid">`;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7 && i < daily.time.length; i++) {
        const [year, month, day] = daily.time[i].split("-").map(Number);
        const forecastDate = new Date(year, month - 1, day);
        forecastDate.setHours(0, 0, 0, 0);

        const isToday = forecastDate.getTime() === today.getTime();
        const dayName = forecastDate.toLocaleDateString("es-AR", { weekday: "short" });
        const weatherInfo = getWeatherInfo(daily.weather_code[i]);

        html += `
            <div class="forecast-day ${isToday ? "today" : ""}">
                <div class="forecast-date">${isToday ? "Hoy" : dayName}</div>
                <small class="forecast-day-number">${forecastDate.getDate()}</small>
                <div class="forecast-icon">${weatherInfo.emoji}</div>
                <div class="forecast-temp">
                    <span class="max">MAX <strong>${Math.round(daily.temperature_2m_max[i])}°</strong></span>
                    <span class="min">MIN <strong>${Math.round(daily.temperature_2m_min[i])}°</strong></span>
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

//  MAIN FUNCTION 

export function initFieldPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const field = fields.find(f => f.id === id);
    if (!field) {
        console.error("Field not found:", id);
        return;
    }

    document.title = `${field.name} | Fulbo 5`;

    // Cache DOM Elements
    const dom = {
        name: document.getElementById("field-name"),
        image: document.getElementById("field-image"),
        rating: document.getElementById("field-rating"),
        location: document.getElementById("field-location"),
        address: document.getElementById("field-address"),
        description: document.getElementById("field-description"),
        priceWeek: document.getElementById("price-week"),
        priceWeekend: document.getElementById("price-weekend"),
        priceFrom: document.getElementById("price-from"),
        scheduleWeek: document.getElementById("schedule-week"),
        scheduleWeekend: document.getElementById("schedule-weekend"),
        features: document.getElementById("features-container"),
        buffet: document.getElementById("buffet-container"),
        extraInfo: document.getElementById("extra-info-container"),
        mapEl: document.getElementById("field-map"),
        mapAddress: document.getElementById("map-address")
    };

    // Basic Info
    if (dom.name) dom.name.innerHTML = `${field.name}${field.type === "techada" ? '<span class="tag">Techada</span>' : ""}`;
    
    if (dom.image) {
        dom.image.loading = "lazy";
        dom.image.alt = `${field.name} - ${field.location}`;
        dom.image.src = field.image;
    }

    if (dom.rating) dom.rating.innerHTML = `<i class="fas fa-star"></i> ${field.rating}`;
    if (dom.location) dom.location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${field.location}`;
    if (dom.address) dom.address.textContent = field.address || "";
    if (dom.description) dom.description.textContent = field.description || "";

    // Prices & Schedule
    if (dom.priceWeek) dom.priceWeek.textContent = `$${field.priceFrom}`;
    if (dom.priceWeekend) dom.priceWeekend.textContent = `$${field.priceTo}`;
    if (dom.priceFrom) dom.priceFrom.textContent = `$${field.priceFrom}`;

    if (dom.scheduleWeek) dom.scheduleWeek.textContent = field.schedule.week;
    if (dom.scheduleWeekend) dom.scheduleWeekend.textContent = field.schedule.weekend;

    // Lists
    if (dom.features) dom.features.innerHTML = field.features?.map(f => `<span>${f}</span>`).join("") || "";
    if (dom.buffet) dom.buffet.innerHTML = field.buffet?.map(item => `<span>${item}</span>`).join("") || "";
    if (dom.extraInfo) dom.extraInfo.innerHTML = field.extraInfo?.map(info => `<p>${info}</p>`).join("") || "";

    // Render Sections
    renderFieldSizes(field);
    renderAllowedBoots(field);
    renderAvailableJerseys(field);

    // Booking
    const cleanPhone = field.booking.phone.replace(/\D/g, "");
    const message = `Hola! Quiero consultar disponibilidad para ${field.name} (${field.location})`;

    const phoneLink = document.getElementById("booking-phone");
    if (phoneLink) {
        phoneLink.href = `tel:+${cleanPhone}`;
        phoneLink.innerHTML = `<i class="fas fa-phone"></i> Llamar`;
    }

    const whatsappBtn = document.getElementById("booking-whatsapp");
    if (whatsappBtn) whatsappBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    // Map
    if (dom.mapEl) {
        dom.mapEl.dataset.lat = field.lat;
        dom.mapEl.dataset.lng = field.lng;
        dom.mapEl.dataset.name = field.name;
    }
    if (dom.mapAddress) dom.mapAddress.textContent = field.address || "";

    // Non-critical features (delayed for better initial load)
    setTimeout(() => {
        loadWeather(field);
        renderSimilarFields(field);
        initShareButtons(field);
    }, 80);


    // Calculate distance
    function showDistanceToField(field) {
    const distanceEl = document.getElementById("field-distance");
    if (!distanceEl || !field.lat || !field.lng) return;

    if (!navigator.geolocation) {
        distanceEl.style.display = "none";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            const distanceKm = calculateDistance(userLat, userLon, field.lat, field.lng);
            
            let displayText = "";

            if (distanceKm < 1) {
                const meters = Math.round(distanceKm * 1000);
                displayText = `Aprox. a ${meters} metros desde tu ubicación`;
            } else {
                displayText = `Aprox. a ${distanceKm} km desde tu ubicación`;
            }

            distanceEl.innerHTML = displayText;
            distanceEl.style.display = "inline-flex";
        },
        err => {
            console.warn("Geolocation error:", err);
            distanceEl.style.display = "none";
        },
        { enableHighAccuracy: true, timeout: 7000 }
    );
}

    
    function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1); 
}

        showDistanceToField(field);

}