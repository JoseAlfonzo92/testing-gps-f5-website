import { initMenu } from "./components/menu.js";
import { initDropdown } from "./components/dropdown.js";
import { initHeader } from "./components/header.js";
import { initTheme } from "./components/theme.js";
import { initFieldsFilter } from "./components/fieldsFilter.js";
import { initFieldsMap } from "./components/fieldsMap.js";
import { initFieldDetailMap } from "./components/detailedMap.js";
import { initFieldPage } from "./pages-js/field.js";
import { initGlobalSearch } from "./components/globalSearch.js";

document.addEventListener("DOMContentLoaded", () => {
    // Global (runs everywhere)
    initMenu();
    initDropdown();
    initHeader();
    initTheme();
    initGlobalSearch();

    // All fields page
    if (document.querySelector("#fields-container")) {
        initFieldsFilter();
        initFieldsMap();
    }

    // Field detail page
    if (document.querySelector("#field-name")) {
        initFieldPage();
        initFieldDetailMap();
    }
});