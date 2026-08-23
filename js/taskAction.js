import { tasks, setTaskToEdit } from "./state.js";
import { updateUI } from "./main.js";

export function handleTaskCompletion(task, checkbox, updateUI) {
  task.completed = checkbox.checked;

  updateUI();
}

export function handleTaskDeletion(task, updateUI) {
  const taskIndex = tasks.findIndex((item) => item.id === task.id);

  const result = confirm("Etes vous sûr de vouloir supprimer");

  if (result === false) {
    return;
  }

  tasks.splice(taskIndex, 1);

  updateUI();
}

export function handleTaskEdit(task) {
  submitButton.textContent = "Modifier";
  titleInput.value = task.title;
  priorityInput.value = task.priority;

  setTaskToEdit(task.id);
}