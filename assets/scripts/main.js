import { initMenu } from "./components/menu.js";
import { initDropdown } from "./components/dropdown.js";
import { initHeader } from "./components/header.js";
import { initTheme } from "./components/theme.js";
import { initFieldsFilter } from "./components/fieldsFilter.js";
import { initFieldsMap } from "./components/fieldsmap.js";
import {  initFieldDetailMap } from "./components/detailedMap.js";

document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initDropdown();
    initHeader();
    initTheme();
    initFieldsFilter();
    initFieldsMap();
    initFieldDetailMap();
});