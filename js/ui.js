import { formatDate } from "./utils.js";
import {
  handleTaskCompletion,
  handleTaskDeletion,
  handleTaskEdit,
} from "./taskAction.js";

// DOM elements used to interact with and update the user interface.
export const taskFilter = document.querySelector("#taskFilter");
export const submitButton = document.querySelector("#submit");
export const taskSort = document.querySelector("#taskSort");
export const taskSearch = document.querySelector("#taskSearch");
export const countTasks = document.querySelector("#countTask");
export const form = document.querySelector("#taskForm");
export const titleInput = document.querySelector("#taskTitle");
export const priorityInput = document.querySelector("#taskPriority");
export const taskList = document.querySelector("#taskList");

export function createTaskElement(task, updateUI) {
  const liElement = document.createElement("li");
  const titleElement = document.createElement("span");
  const priorityElement = document.createElement("span");
  const dateElement = document.createElement("span");
  const checkbox = document.createElement("input");
  const checkboxLabel = document.createElement("label");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  deleteButton.textContent = "Supprimer";
  titleElement.textContent = task.title;
  priorityElement.textContent = task.priority;
  priorityElement.classList.add(task.priority);
  dateElement.textContent = formatDate(task.createdAt);
  editButton.textContent = "Modifier";
  checkboxLabel.textContent = " Tâche terminée";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkboxLabel.prepend(checkbox);

  liElement.appendChild(titleElement);
  liElement.appendChild(priorityElement);
  liElement.appendChild(dateElement);
  liElement.appendChild(checkboxLabel);
  liElement.appendChild(deleteButton);
  liElement.appendChild(editButton);

  styleRender(checkbox, titleElement);

  checkbox.addEventListener("change", () => {
    handleTaskCompletion(task, checkbox, updateUI);
  });

  deleteButton.addEventListener("click", () => {
    handleTaskDeletion(task, updateUI);
  });

  editButton.addEventListener("click", () => {
    handleTaskEdit(task, submitButton, titleInput, priorityInput);
  });

  return liElement;
}

export function renderTasks(filterToRender, updateUI) {
  taskList.textContent = "";

  filterToRender.forEach((task) => {
    const taskElement = createTaskElement(task, updateUI);
    taskList.appendChild(taskElement);
  });
}

export function styleRender(checkbox, titleElement) {
  titleElement.style.textDecoration = checkbox.checked
    ? "line-through 3px"
    : "none";
}

export function renderCompletedCount(tasks) {
  const tasksLength = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  countTasks.textContent = ` ${completedTasks} / ${tasksLength} tâche(s) terminée(s)`;
}