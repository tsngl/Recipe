import uniqid from "uniqid";

// npm i uniqid хийгээрэй !!!
export default class List {
  constructor() {
    this.items = [];
  }
  deleteItem(id) {
    // id гэдэг ID - тай орцийн индэксийг массиваас хайж олно
    const index = this.items.findIndex((el) => el.id === id);
    // Олсон индексийг ашиглан массиваас устгана
    this.items.splice(index, 1);
  }

  addItem(item) {
    let newItem = {
      id: uniqid(),
      // item: item,
      // Хэрвээ property-н түлхүүр болон утга нь адилхан бол зөвхөн түлхүүрийн нэрийг бичиж болно
      item,
    };
    this.items.push(newItem);

    return newItem;
  }
}
