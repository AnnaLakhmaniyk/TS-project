//drag & drop interfaces

namespace App {
  export interface Draggable {
    dragOverHendler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHendler(event: DragEvent): void;
    dragHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
  }
}
