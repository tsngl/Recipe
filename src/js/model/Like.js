import { domElements } from "../view/base";

export default class Like {
  constructor() {
    this.likes = [];
  }
  addLike(id, title, publisher, img) {
    const like = { id, title, publisher, img };
    this.likes.push(like);
    return like;
  }
  removeLike(id) {
    // id гэдэг ID - тай like-ийн индэксийг массиваас хайж олно
    const index = this.likes.findIndex((el) => el.id === id);
    // Олсон индексийг ашиглан массиваас устгана
    this.likes.splice(index, 1);
  }
  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }
  getNumberOfLikes() {
    return this.likes.length;
  }
}
