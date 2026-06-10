import { state } from "./state.js";
import { renderCards } from "./render.js";

export async function navigationButtons(){

    const buttons = document.querySelectorAll("[data-category]");

    buttons.forEach((button) => {
        button.addEventListener("click", async (event) => {

            buttons.forEach((btn) => {
                btn.classList.remove("active");
            });

            event.currentTarget.classList.add("active");

            const category = event.currentTarget.dataset.category;

            state.currentCategory = category;

            if (category === "All") {
                state.cardsForRender = state.cardsData;
            } else {
                state.cardsForRender = state.cardsData.filter((card) => {
                    return card.category === category;
                });
            }

            state.needsToUpdate = true;
            await renderCards();
        });
    });
}