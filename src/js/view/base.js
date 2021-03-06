export const domElements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultList: document.querySelector(".results__list"),
  searchResultDiv: document.querySelector(".results"),
  pageButtons: document.querySelector(".results__pages"),
  recipeDiv: document.querySelector(".recipe"),
  listDiv: document.querySelector(".shopping__list"),
};

export const elementString = {
  loader: "loader",
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementString.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};

export const renderLoader = (parent) => {
  const loader = `
    <div class="${elementString.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"</use>
      </svg>
    </div>
  `;

  parent.insertAdjacentHTML("afterbegin", loader);
};
