import { state } from "./state.js"
import { renderCards } from "./render.js";

export async function search(){
    const searchInput = document.getElementById("search-form__input");

    if (!searchInput) return;

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });

    searchInput.addEventListener('input', async (event) => {
        const searchValue = searchInput.value.trim().toLowerCase();
        state.cardsForRender = state.cardsData.filter((card) => {
            const cardTextLower = card.text.toLowerCase();
            return cardTextLower.includes(searchValue);
        });

        state.needsToUpdate = true;
        await renderCards()
    });
}