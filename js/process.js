import { products } from "./product.js";
import { dom } from "./dom.js";

function ProductComponent(data) {
    this._data = data;
    this._dataclass = "col-md-3";
    this.GenerateData = function() {
        let wrapper = dom.createElement("div", { cls: this._dataclass });
        let img = dom.createElement("img", { src: this._data.photo })
        let p1 = dom.createElement("p", { html: `<strong>${this._data.model}</strong> <em style='color:red'>${this._data.marka}</em>` });
        let p2 = dom.createElement("p", { html: `<em>${this._data.id}</em>---<strong>${this._data.price}</strong>` });
        dom.appendMultiple([img, p1, p2], wrapper);
        return wrapper;
    };
}

let productLoader = {
    _itemsPerPage: 8,
    _id: null,
    constructor: function(id) {
        this._id = id;
    },
    LoadTo: function(Page, count) {
        if (count == undefined || count == null) count = this._itemsPerPage;
        let container = document.getElementById(this._id);
        let from = (Page - 1) * count;
        let to = Page * count;
        for (let i = from; i < to; i++) {
            let component = new ProductComponent(products[i]).GenerateData();
            container.appendChild(component);
        }
    },
    GeneratePaging: function(id) {
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
console.log(dom.createElement("div", { innerText: "hello" }));
productLoader.constructor("dataContainer");
productLoader.LoadTo(1, 8);
productLoader.GeneratePaging("pagination");