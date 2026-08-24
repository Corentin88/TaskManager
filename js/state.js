// Centralized application state shared between modules.
export const tasks = [];

// ID of the task currently being edited.
export let taskToEdit = null;

export function setTaskToEdit(taskId) {
  taskToEdit = taskId;
}