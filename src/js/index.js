require("@babel/polyfill");
import Search from "./model/Search";
import { domElements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/SearchView";
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe } from "./view/recipeView";

const state = {};

/**
 * Хайлтын контроллер
 */

const controlSearch = async () => {
  // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
  const query = searchView.getInput();
  if (query) {
    // 2) Шинээр хайлтын обьектыг үүсгэж өгнө
    state.search = new Search(query);
    // 3) Хайлт хийхэд зориулж UI г бэлтгэнэ.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(domElements.searchResultDiv);

    // 4)  Хайтыг гүйцэтгэнэ
    await state.search.doSearch();
    //5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    clearLoader();
    if (state.search.result === undefined) alert("Хайлт илэрцгүй...");
    else searchView.renderRecipes(state.search.result);
  }
};

domElements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

domElements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search, gotoPageNumber);
  }
});

/**
 * Жорын контроллер
 */

const controlRecipe = async () => {
  // 1) URL - с ID -г салгаж авна
  const id = window.location.hash.replace("#", "");
  // 2) Жорын моделийг үүсгэж өгнө.
  state.recipe = new Recipe(id);
  // 3) UI  дэлгэцийг бэлтгэнэ
  clearRecipe();
  renderLoader(domElements.recipeDiv);
  // 4) Жороо татаж авч ирнэ
  await state.recipe.getRecipe();
  // 5) Жорын гүйцэтгэх хугацаа болон орцыг тооцоолно
  clearLoader();
  state.recipe.calcTime();
  state.recipe.calcPersonNum();
  // 6) Жороо дэлгэцэнд гаргана
  renderRecipe(state.recipe);
};
window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);
