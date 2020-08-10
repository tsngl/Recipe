import { domElements } from "./base";

export const renderItem = (item) => {
  const html = `
    <li class="shopping__item">
        <div class="shopping__count">
            <input type="number" value="500" step="100">
            <p>g</p>
        </div>
        <p class="shopping__description">${item}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li> `;
  domElements.listDiv.insertAdjacentHTML("beforeend", html);
};

export const clearList = () => {
  domElements.listDiv.innerHTML = " ";
};
