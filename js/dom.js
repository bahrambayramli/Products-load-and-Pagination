let KeyValues = {
    text: "innerText",
    html: "innerHTML",
    val: "value",
    cls: "className",
    clsList: "classList"
}
let dom = {
    createElement: function(elementName, elementProperties) {

        let element = document.createElement(elementName);
        for (let prop in elementProperties) {
            let value = (KeyValues[prop] == null || KeyValues[prop] == undefined) ? prop : KeyValues[prop];
            element[value] = elementProperties[prop];
        }
        return element;
    },
    appendChild: function(element, to) {
        to.appendChild(element);
    },
    appendMultiple: function(elements, to) {
        for (let element of elements) {
            this.appendChild(element, to);
        }
    },
    getbyId: function(id) {
        return document.getElementById(id);
    },
    clearById: function(id) {
        document.getElementById(id).innerHTML = "";
    }
}

export { dom };