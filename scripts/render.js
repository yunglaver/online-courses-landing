import { state } from "./state.js"

export async function renderCards(){

    if (state.needsToUpdate) {

        const cardsContainer = document.querySelector('.courses');
        cardsContainer.innerHTML = "";

        for (let i = 0; i < state.cardsForRender.length; i++) {

            const currentCard = state.cardsForRender[i]

            const cardContainer = document.createElement("button")
            const cardPhoto = document.createElement("img")
            const textContainer = document.createElement("div")
            const category = document.createElement("span")
            const courseTitle = document.createElement("span")
            const price = document.createElement("span")


            cardsContainer.append(cardContainer)
            cardContainer.append(cardPhoto, textContainer)
            textContainer.append(category, courseTitle, price)

            cardContainer.classList.add("card");
            cardPhoto.classList.add("card-photo");
            category.classList.add("card-category__title");

            textContainer.classList.add("card-text__container");
            cardPhoto.src = currentCard.photo_src
            category.textContent = currentCard.category
            courseTitle.textContent = currentCard.text
            price.textContent = currentCard.price + " | " + currentCard.speaker_name

        }

        state.needsToUpdate = false

    }
}