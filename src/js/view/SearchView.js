import { domElements } from "./base";

const renderRecipe = (recipe) => {
  const markup = `
  <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author"${recipe.publisher}</p>
                        </div>
                    </a>
    </li>`;

  // UI рүү нэмнэ
  domElements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
export const clearSearchQuery = () => {
  domElements.searchInput.value = " ";
};
export const clearSearchResult = () => {
  domElements.searchResultList.innerHTML = " ";
  domElements.pageButtons.innerHTML = " ";
};
export const getInput = () => domElements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  //Хайлтын үр дүнг хуудаслаж үзүүлэх
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;
  recipes.slice(start, end).forEach((el) => renderRecipe(el));

  // Хуудаслалтын товчуудыг гаргаж ирэх
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

// type===> 'prev' , 'next'
const createButton = (page, type, direction) => `
<button class="btn-inline results__btn--${type}" data-goto = ${page}>
  <span>Хуудас ${page}</span>
  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${direction}"></use>
  </svg>
</button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHtml;

  if ((currentPage = 1 && totalPages > 1)) {
    // 1-р хуудсан дээр байна. 2-р хуудас руу шилжих товчийг гарга
    buttonHtml = createButton(2, "next", "right");
  } else if (currentPage > totalPages) {
    // Өмнөх болон дараачийн хуудсыг үзүүлэх товчнудыг үзүүл
    buttonHtml = createButton(currentPage - 1, "prev", "left");
    buttonHtml += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    // Хамгийн сүүлийн хуудсан дээр байна. Өмнөх хуудас руу шилжих товчийг гарга
    buttonHtml = createButton(currentPage - 1, "prev", "left");
  }

  domElements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};
