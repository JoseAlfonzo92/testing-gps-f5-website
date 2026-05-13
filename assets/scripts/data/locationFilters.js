import { fields } from "../data/fields.js";

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

function getProvinces() {

    return unique(

        fields.map(
            field => field.province
        )
    );
}

// GET CITIES

function getCities(province) {

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

function getZones(
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

export function initLocationFilters() {

    const provinceSelect =
        document.getElementById(
            "filter-province"
        );

    const citySelect =
        document.getElementById(
            "filter-city"
        );

    const zoneSelect =
        document.getElementById(
            "filter-zone"
        );

    if (
        !provinceSelect ||
        !citySelect ||
        !zoneSelect
    ) return;

    // POPULATE SELECT

    function populateSelect(
        select,
        values = [],
        placeholder
    ) {

        // SAVE CURRENT VALUE
        const currentValue =
            select.value;

        // RESET OPTIONS
        select.innerHTML =
            `<option value="">${placeholder}</option>`;

        // CLEAN VALUES
        const cleanValues =
            unique(values);

        // CREATE OPTIONS
        cleanValues.forEach(value => {

            const option =
                document.createElement(
                    "option"
                );

            // KEEP ORIGINAL VALUE
            option.value = value;

            option.textContent =
                value;

            select.appendChild(
                option
            );
        });

        // RESTORE VALUE
        const hasValue =
            cleanValues.includes(
                currentValue
            );

        if (hasValue) {

            select.value =
                currentValue;
        }
    }

    // INITIAL LOAD

    populateSelect(
        provinceSelect,
        getProvinces(),
        "Provincia"
    );

    populateSelect(
        citySelect,
        getCities(),
        "Ciudad"
    );

    populateSelect(
        zoneSelect,
        getZones(),
        "Zona"
    );

    // PROVINCE CHANGE

    provinceSelect.addEventListener(
        "change",
        () => {

            const province =
                provinceSelect.value;

            // RESET VALUES
            citySelect.value = "";
            zoneSelect.value = "";

            // UPDATE CITIES
            populateSelect(
                citySelect,
                getCities(
                    province
                ),
                "Ciudad"
            );

            // UPDATE ZONES
            populateSelect(
                zoneSelect,
                getZones(
                    province
                ),
                "Zona"
            );

            // KEEP ENABLED
            citySelect.disabled =
                false;

            zoneSelect.disabled =
                false;

            // UPDATE FILTERS
            if (
                window.updateFields
            ) {

                window.updateFields();
            }
        }
    );

    // CITY CHANGE

    citySelect.addEventListener(
        "change",
        () => {

            const province =
                provinceSelect.value;

            const city =
                citySelect.value;

            // RESET ZONE
            zoneSelect.value = "";

            // UPDATE ZONES
            populateSelect(
                zoneSelect,
                getZones(
                    province,
                    city
                ),
                "Zona"
            );

            // KEEP ENABLED
            zoneSelect.disabled =
                false;

            // UPDATE FILTERS
            if (
                window.updateFields
            ) {

                window.updateFields();
            }
        }
    );

    // ZONE CHANGE

    zoneSelect.addEventListener(
        "change",
        () => {

            if (
                window.updateFields
            ) {

                window.updateFields();
            }
        }
    );
}