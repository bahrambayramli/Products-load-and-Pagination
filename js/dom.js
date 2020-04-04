let KeyValues = {
    text: "innerText",
    html: "innerHtml",
    val: "value",
    cls: "className",
    clsList: "classList"
}
let dom = {
    createEelement: function(elementName, elementProperties) {

        let element = document.createElement(elementName);
        for (let prop in elementProperties) {
            let value = (KeyValues[prop] == null || KeyValues[prop] == undefined) ? prop : KeyValues[prop];
            element[value] = elementProperties[prop];
        }
        return element;
    }
}

export { dom };