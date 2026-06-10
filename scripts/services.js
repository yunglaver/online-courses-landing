import { state } from "./state.js"

export async function loadCourses(url) {

    try {

        const response = await fetch(url);
        const data = await response.json();
        await new Promise(resolve => setTimeout(resolve, 200));
        state.cardsData = data;

    } catch (error) {
        console.error('fetch error', error);
        return []
    }
}
