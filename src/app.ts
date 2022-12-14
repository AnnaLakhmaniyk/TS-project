class ProjectInput {
  templateElem: HTMLTemplateElement;
  hostElem: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElem = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    this.hostElem = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElem.content, true);

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    this.hostElem.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
