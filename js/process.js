import { products } from "./product.js";
import { dom } from "./dom.js";
import { isNou } from "./common.js";

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

function ElementsMaker(pageNum, count, id) {
    this.container = dom.getbyId(id)
    let from = (pageNum - 1) * count;
    let to = pageNum * count;
    this.RenderElements = function() {
        for (let i = from; i < to; i++) {
            let component = new ProductComponent(products[i]).GenerateData();
            dom.appendChild(component, this.container)
        }
    };
}

let productLoader = {
    _itemsPerPage: 8,
    _id: null,
    constructor: function(id) {
        this._id = id;
    },
    LoadTo: function(PageNumber, count) {
        if (!isNou(count)) count = this._itemsPerPage;
        let elMaker = new ElementsMaker(PageNumber, count, this._id);
        elMaker.RenderElements();

    },
    GeneratePaging: function(id) {
        let itemsCount = products.length;
        let paging = Math.ceil(itemsCount / this._itemsPerPage);
        let pagingWrapper = document.createElement("div");
        pagingWrapper.className = "col-12";
        for (let i = 1; i < paging; i++) {
            let button = dom.createElement("button", { innerText: i, cls: "btn btn-success" });
            button.addEventListener("click", () => {
                dom.clearById(this._id);
                productLoader.LoadTo(parseInt(button.innerText));
            });
            //pagingWrapper.appendChild(button);
            dom.appendChild(button, pagingWrapper)
        }
        document.getElementById(id).appendChild(pagingWrapper);
        dom.appendChild(pagingWrapper, dom.getbyId(id))
    },
};
console.log(dom.createElement("div", { innerText: "hello" }));
productLoader.constructor("dataContainer");
productLoader.LoadTo(1, 8);
productLoader.GeneratePaging("pagination");