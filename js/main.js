import { loadTasks, saveTasks } from "./storage.js";
import { addTask, filterTasks, searchTasks, sortTasksByPriority } from "./tasks.js";
import { taskFilter, taskSearch, taskSort,form, titleInput, priorityInput, submitButton, renderTasks, renderCompletedCount } from "./ui.js";
import { tasks, setTaskToEdit, taskToEdit } from "./state.js";



function refreshTasks() {
  const tasksToRender = getTasksToRender();

  renderTasks(tasksToRender, updateUI);
}

export function updateUI() {
  saveTasks();
  renderCompletedCount(tasks);
  refreshTasks();
}

function getTasksToRender() {
  const filteredTasks = filterTasks(taskFilter.value);
  const searchedTasks = searchTasks(filteredTasks, taskSearch.value);

  return sortTasksByPriority(searchedTasks, taskSort.value);
}

const loadedTasks = loadTasks();
tasks.push(...loadedTasks);

refreshTasks();
renderCompletedCount(tasks);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const priority = priorityInput.value;

  if (title === "") {
    return alert("Veuillez entrer un titre");
  }

  if (taskToEdit) {
    const task = tasks.find((item) => item.id === taskToEdit);

    task.title = title;
    task.priority = priority;

    setTaskToEdit(null);

    submitButton.textContent = "Valider";
  } else {
    addTask(title, priority);
  }

  updateUI();

  titleInput.value = "";
  priorityInput.value = "low";
});

taskFilter.addEventListener("change", () => {
  refreshTasks();
});

taskSort.addEventListener("change", () => {
  refreshTasks();
});

taskSearch.addEventListener("input", () => {
  refreshTasks();
});