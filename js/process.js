import { products } from './product.js'

function ProductComponent(data) {
    this._data = data;
    this._dataclass = "col-md-3";
    this.GenerateData = function() {
        let wrapper = document.createElement("div");
        wrapper.className = this._dataclass;

        let img = document.createElement("img");
        img.src = this._data.photo;

        let p1 = document.createElement("p");
        p1.innerHTML = `<strong>${this._data.model}</strong> `;
        p1.innerHTML += `<em>${this._data.marka}</em>`;

        let p2 = document.createElement("p");
        p2.innerHTML = `<strong>${this._data.price}</strong>`;

        wrapper.appendChild(img);
        wrapper.appendChild(p1);
        wrapper.appendChild(p2);
        return wrapper;
    }
}
let productLoader = {
    _itemsPerPage: 8,
    _id: null,
    LoadTo: function(id, count) {
        this._id = id;
        if (count == undefined || count == null) count = this._itemsPerPage;
        let container = document.getElementById(id);
        for (let i = 0; i < count; i++) {
            let component = new ProductComponent(products[i]).GenerateData();
            container.appendChild(component);
        }
    },
    GeneratePaging: function() {
        let itemsCount = products.length;
        let paging = Math.ceil(itemsCount / this._itemsPerPage);
        let pawingWrapper = document.createElement("div")
        pawingWrapper.className = "col-12";
        for (let i = 1; i < paging; i++) {
            let anchor = document.createElement("a");
            anchor.href = i;
            anchor.innerText = i;
            anchor.className = "btn btn-primary"
            pawingWrapper.appendChild(anchor);
        }
        document.getElementById(this._id).appendChild(pawingWrapper);
    }
}
productLoader.LoadTo("container", 24);
productLoader.GeneratePaging()