import { state } from "./state.js"

export async function loadCourses(url) {

    try {

        const response = await fetch(url);
        const data = await response.json();
        state.cardsData = data;

    } catch (error) {
        console.error('fetch error', error);
        return []
    }
}
