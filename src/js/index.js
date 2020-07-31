require("@babel/polyfill");
import Search from "./model/Search";

const state = {};

const controlSearch = async () => {
  // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
  const query = "pizza";
  if (query) {
    // 2) Шинээр хайлтын обьектыг үүсгэж өгнө
    state.search = new Search(query);
    // 3) Хайлт хийхэд зориулж UI г бэлтгэнэ.
    // 4)  Хайтыг гүйцэтгэнэ
    await state.search.doSearch();
    //5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
