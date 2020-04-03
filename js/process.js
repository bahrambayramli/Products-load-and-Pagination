import { products } from "./product.js";

function ProductComponent(data) {
  this._data = data;
  this._dataclass = "col-md-3";
  this.GenerateData = function () {
    let wrapper = document.createElement("div");
    wrapper.className = this._dataclass;

    let img = document.createElement("img");
    img.src = this._data.photo;

    let p1 = document.createElement("p");
    p1.innerHTML = `<strong>${this._data.model}</strong> `;
    p1.innerHTML += `<em style='color:red'>${this._data.marka}</em>`;

    let p2 = document.createElement("p");
    p2.innerHTML = `<em>${this._data.id}</em>---<strong>${this._data.price}</strong>`;

    wrapper.appendChild(img);
    wrapper.appendChild(p1);
    wrapper.appendChild(p2);
    return wrapper;
  };
}

let productLoader = {
  _itemsPerPage: 8,
  _id: null,
  constructor: function (id) {
    this._id = id;
  },
  LoadTo: function (Page, count) {
    if (count == undefined || count == null) count = this._itemsPerPage;
    let container = document.getElementById(this._id);
    let from = (Page - 1) * count;
    let to = Page * count;
    for (let i = from; i < to; i++) {
      let component = new ProductComponent(products[i]).GenerateData();
      container.appendChild(component);
    }
  },
  GeneratePaging: function (id) {
    let itemsCount = products.length;
    let paging = Math.ceil(itemsCount / this._itemsPerPage);
    let pagingWrapper = document.createElement("div");
    pagingWrapper.className = "col-12";
    for (let i = 1; i < paging; i++) {
      let button = document.createElement("button");
      button.innerText = i;
      button.className = "btn btn-primary mx-1 my-2";
      button.addEventListener("click", () => {
        document.getElementById(this._id).innerHTML = "";
        productLoader.LoadTo(parseInt(button.innerText));
      });
      pagingWrapper.appendChild(button);
    }
    document.getElementById(id).appendChild(pagingWrapper);
  },
};

productLoader.constructor("dataContainer");
productLoader.LoadTo(1, 8);
productLoader.GeneratePaging("pagination");
