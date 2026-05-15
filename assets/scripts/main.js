import { initMenu } from "./components/menu.js";
import { initDropdown } from "./components/dropdown.js";
import { initHeader } from "./components/header.js";
import { initTheme } from "./components/theme.js";
import { initFieldsFilter } from "./components/fieldsFilter.js";
import { initFieldsMap } from "./components/fieldsMap.js";
import { initFieldDetailMap } from "./components/detailedMap.js";
import { initFieldPage } from "./pages-js/field.js";
import { initGlobalSearch } from "./components/globalSearch.js";
import { initLocationFilters } from "./data/locationFilters.js";
import { renderFields } from "./pages-js/fieldsRenderer.js";
import { renderFeaturedFields, renderHomeFields } from "./pages-js/cardRenderer.js";

document.addEventListener("DOMContentLoaded",() => {

        // GLOBAL
        initMenu();
        initDropdown();
        initHeader();
        initTheme();
        initGlobalSearch();
        renderFeaturedFields();
        renderHomeFields();

        // FIELDS PAGE
        if (
            document.querySelector("#fields-container")
        ) {

            renderFields();
            initLocationFilters();
            initFieldsFilter();
            initFieldsMap();
        }

        // FIELD DETAIL PAGE
        if (
            document.querySelector("#field-name")
        ) {

            initFieldPage();
            initFieldDetailMap();
        }
    }
);