import { loadCourses } from "./services.js";
import { renderCards } from "./render.js";
import { search } from "./search.js";
import { state } from "./state.js";

async function init() {

    await loadCourses('./data/courses-data.json');
    search()
    state.cardsForRender = state.cardsData;


    state.needsToUpdate = true;

    await renderCards();
}

// Запуск всего приложения
await init();
