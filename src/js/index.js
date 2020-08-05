require("@babel/polyfill");
import Search from "./model/Search";
import { domElements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/SearchView";
const state = {};

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
