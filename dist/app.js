"use strict";
class ProjectInput {
    constructor() {
        this.templateElem = document.getElementById("project-input");
        this.hostElem = document.getElementById("app");
        const importedNode = document.importNode(this.templateElem.content, true);
        this.element = importedNode.firstElementChild;
        this.attach();
    }
    attach() {
        this.hostElem.insertAdjacentElement("afterbegin", this.element);
    }
}
const prjInput = new ProjectInput();
//# sourceMappingURL=app.js.map