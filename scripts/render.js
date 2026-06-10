import { state } from "./state.js";

const categoryColors = {
    "Marketing": "#03CEA4",
    "Management": "#5A87FC",
    "HR & Recruting": "#F89828",
    "Design": "#F52F6E",
    "Development": "#7772F1"
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function createCard(currentCard) {
    const cardContainer = document.createElement("button");
    const cardPhoto = document.createElement("img");
    const textContainer = document.createElement("div");
    const category = document.createElement("span");
    const courseTitle = document.createElement("span");
    const cardInfo = document.createElement("div");
    const price = document.createElement("span");
    const speaker = document.createElement("span");

    cardContainer.classList.add("card");
    cardPhoto.classList.add("card-photo");
    textContainer.classList.add("card-text__container");
    category.classList.add("card-category__title");
    courseTitle.classList.add("card-title");
    cardInfo.classList.add("card-info");
    price.classList.add("card-price");
    speaker.classList.add("card-speaker");

    cardPhoto.src = currentCard.photo_src;
    cardPhoto.alt = currentCard.text;

    category.textContent = currentCard.category;
    category.style.backgroundColor =
        categoryColors[currentCard.category] || "#9A9CA5";

    courseTitle.textContent = currentCard.text;
    price.textContent = currentCard.price;
    speaker.textContent = " | " + currentCard.speaker_name;

    cardInfo.append(price, speaker);
    textContainer.append(category, courseTitle, cardInfo);
    cardContainer.append(cardPhoto, textContainer);

    return cardContainer;
}

export async function renderCards() {
    if (!state.needsToUpdate) return;

    const cardsContainer = document.querySelector(".courses");
    if (!cardsContainer) return;

    cardsContainer.classList.add("courses-is-changing");

    await wait(150);

    cardsContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < state.cardsForRender.length; i++) {
        const card = createCard(state.cardsForRender[i]);
        fragment.append(card);
    }

    cardsContainer.append(fragment);

    requestAnimationFrame(() => {
        cardsContainer.classList.remove("courses-is-changing");
    });

    state.needsToUpdate = false;
}

export function renderCategoryCounts() {
    const buttons = document.querySelectorAll("[data-category]");

    buttons.forEach((button) => {
        const category = button.dataset.category;
        const countElement = button.querySelector(".category-count");

        if (!countElement) return;

        if (category === "All") {
            countElement.textContent = state.cardsData.length;
            return;
        }

        const count = state.cardsData.filter((card) => {
            return card.category === category;
        }).length;

        countElement.textContent = count;
    });
}