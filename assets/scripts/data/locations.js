// js/data/locations.js

import { fields } from "./fields.js";

// UNIQUE VALUES

function unique(values) {

    return [...new Set(values)]
        .filter(value =>
            typeof value === "string" &&
            value.trim() !== ""
        )
        .sort((a, b) =>
            a.localeCompare(b)
        );
}

// GET PROVINCES

export function getProvinces() {

    return unique(
        fields.map(
            field => field.province
        )
    );
}

// GET CITIES

export function getCities(province) {

    const filtered = province

        ? fields.filter(
            field =>
                field.province === province
        )

        : fields;

    return unique(
        filtered.map(
            field => field.city
        )
    );
}

// GET ZONES

export function getZones(
    province,
    city
) {

    let filtered = fields;

    if (province) {

        filtered = filtered.filter(
            field =>
                field.province === province
        );
    }

    if (city) {

        filtered = filtered.filter(
            field =>
                field.city === city
        );
    }

    return unique(
        filtered.map(
            field => field.zone
        )
    );
}