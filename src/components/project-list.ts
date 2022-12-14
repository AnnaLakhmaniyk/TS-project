import { Component } from "./base-component";
import { ProjectItem } from "./project-item";
import { autobind } from "../decorators/autobind";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project-state";
import { DragTarget } from "../models/drag-drop";

//class project list
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assingProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assingProjects = [];

    this.configure();
    this.renderContent();
  }
  @autobind
  dragOverHendler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autobind
  dragHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData("text/plain");

    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHendler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dragHandler);

    projectState.addListener((project: Project[]) => {
      const relevantProjects = project.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });

      this.assingProjects = relevantProjects;
      this.renderProject();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private renderProject() {
    const list = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    list.innerHTML = "";
    for (const prjItem of this.assingProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }
}
