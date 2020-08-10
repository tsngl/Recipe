require("@babel/polyfill");
import Search from "./model/Search";
import { domElements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/SearchView";
import Recipe from "./model/Recipe";
import List from "./model/List";
import Like from "./model/Like";
import * as listView from "./view/listView";
import {
  renderRecipe,
  clearRecipe,
  highligthSelectedRecipe,
} from "./view/recipeView";

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

/**
 * Хайлтын үр дүнгийн хуудаслалт
 */
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

  // URL- c id -г салгаж авсан тохиолдолд
  if (id) {
    // 2) Жорын моделийг үүсгэж өгнө.
    state.recipe = new Recipe(id);
    // 3) UI  дэлгэцийг бэлтгэнэ
    clearRecipe();
    renderLoader(domElements.recipeDiv);
    highligthSelectedRecipe(id);
    // 4) Жороо татаж авч ирнэ
    await state.recipe.getRecipe();
    // 5) Жорын гүйцэтгэх хугацаа болон орцыг тооцоолно
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcPersonNum();
    // 6) Жороо дэлгэцэнд гаргана
    renderRecipe(state.recipe);
  }
};
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

//  Сайжруулалт
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
/**
 *  Найрлагын контроллер
 */

const controlList = () => {
  // Найрлаганы моделийг үүсгэнэ
  state.list = new List();
  // Өмнө харагдаж байсан найрлагуудыг дэлгэцнээс устгана.
  listView.clearList();
  // Уг модел руу одоо харагдаж байгаа жорын бүх орцыг хийнэ
  state.recipe.ingredients.forEach((el) => {
    // Тухайн найрлагыг модел руу хийнэ
    const item = state.list.addItem(el);
    // Тухайн найрлагыг дэлгэц руу хийнэ
    listView.renderItem(item);
  });
};

/**
 * Like контроллер
 */

const controlLike = async () => {
  // 1) Лайкийн моделийг үүсгэнэ
  if (!state.like) state.like = new Like();
  // 2) Одоо харагдаж байгаа жорын ID -г олж авна
  const currentRecipeId = state.recipe.id;
  // 3) Энэ жорыг лайклсан эсэхийг шалгана
  if (state.like.isLiked(currentRecipeId)) {
    //Лайклсан бол лайкыг болиулна
    state.like.removeLike(currentRecipeId);
  } else {
    //Лайклаагүй бол лайклана
    state.like.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    console.log(state.like);
  }
};

domElements.recipeDiv.addEventListener("click", (el) => {
  if (el.target.matches(".recipe__btn , .recipe__btn *")) {
    controlList();
  } else if (el.target.matches(".recipe__love , .recipe__love *")) {
    controlLike();
  }
});

domElements.listDiv.addEventListener("click ", (el) => {
  // Клик хийсэн листийн itemid -г шүүж олно
  const id = el.target.closest(".shopping__item").dataset.itemid;
  // Олдсон ID -тай орцийг моделоос устгана
  state.list.deleteItem(id);
  // Мөн дэлгэцнээс устгана
  listView.deleteItem(id);
});
