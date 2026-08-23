const tasks = [];
let taskToEdit = null;
const taskFilter = document.querySelector("#taskFilter");
const submitButton = document.querySelector("#submit");
const taskSort = document.querySelector("#taskSort");
const taskSearch = document.querySelector("#taskSearch");
const countTasks = document.querySelector("#countTask");
const form = document.querySelector("#taskForm");
const titleInput = document.querySelector("#taskTitle");
const priorityInput = document.querySelector("#taskPriority");
const taskList = document.querySelector("#taskList");
const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

function addTask(title, priority) {
  const newTask = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    priority,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
}
function createTaskElement(task) {
  const liElement = document.createElement("li");
  const titleElement = document.createElement("span");
  const priorityElement = document.createElement("span");
  const dateElement = document.createElement("span");
  const checkbox = document.createElement("input");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  deleteButton.textContent = "Supprimer";
  titleElement.textContent = task.title;
  priorityElement.textContent = task.priority;
  dateElement.textContent = formatDate(task.createdAt);
  editButton.textContent = "Modifier";

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  liElement.appendChild(titleElement);
  liElement.appendChild(priorityElement);
  liElement.appendChild(dateElement);
  liElement.appendChild(checkbox);
  liElement.appendChild(deleteButton);
  liElement.appendChild(editButton);

  styleRender(checkbox, titleElement);

  checkbox.addEventListener("change", () => {
    handleTaskCompletion(task, checkbox);
  });
  deleteButton.addEventListener("click", () => {
    handleTaskDeletion(task);
  });
  editButton.addEventListener("click", () => {
    handleTaskEdit(task);
  });
  return liElement;
}

function renderTasks(filterToRender) {
  taskList.textContent = "";

  filterToRender.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
  });
}
function handleTaskCompletion(task, checkbox) {
  task.completed = checkbox.checked;
  updateUI();
}
function handleTaskDeletion(task) {
  const taskIndex = tasks.findIndex((item) => item.id === task.id);
  const result = confirm("Etes vous sur de vouloir supprimer");
  if (result === false) {
    return;
  }
  tasks.splice(taskIndex, 1);
  updateUI();
}
function handleTaskEdit(task) {
  submitButton.textContent = "Modifier";
  titleInput.value = task.title;
  priorityInput.value = task.priority;
  taskToEdit = task.id;
}
function refreshTasks() {
  renderTasks(getTasksToRender());
}
function updateUI() {
  saveTasks();
  renderCompletedCount();
  refreshTasks();
}
function formatDate(date) {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year} à ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  return JSON.parse(data) ?? [];
}

const loadedTasks = loadTasks();
tasks.push(...loadedTasks);

refreshTasks();
renderCompletedCount();

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
    taskToEdit = null;
    submitButton.textContent = "Valider";
  } else {
    addTask(title, priority);
  }
  updateUI();
  titleInput.value = "";
  priorityInput.value = "low";
});

function styleRender(checkbox, titleElement) {
  titleElement.style.textDecoration = checkbox.checked
    ? "line-through"
    : "none";
}

function filterTasks(filter) {
  const filters = {
    completed: (task) => task.completed,
    pending: (task) => !task.completed,
  };

  return filters[filter]
    ? tasks.filter(filters[filter])
    : tasks;
}

taskFilter.addEventListener("change", () => {
  refreshTasks();
});

function sortTasksByPriority(tasksToSort, order) {
  const copyTasks = [...tasksToSort];
  const direction = order === "asc" ? 1 : -1;

  return copyTasks.sort(
    (a, b) =>
      (priorityOrder[a.priority] - priorityOrder[b.priority]) * direction,
  );
}

taskSort.addEventListener("change", () => {
  refreshTasks();
});

function getTasksToRender() {
  const filteredTasks = filterTasks(taskFilter.value);
  const searchedTasks = searchTasks(filteredTasks, taskSearch.value);
  return sortTasksByPriority(searchedTasks, taskSort.value);
}

taskSearch.addEventListener("input", () => {
  refreshTasks();
});

function searchTasks(taskToSearch, search) {
  const searchValue = search.toLowerCase();
  return taskToSearch.filter((task) =>
    task.title.toLowerCase().includes(searchValue),
  );
}

function countCompletedTasks() {
  return tasks.filter((task) => task.completed).length;
}

function renderCompletedCount() {
  const tasksLength = tasks.length;
  countTasks.textContent = ` ${countCompletedTasks()} /  ${tasksLength} tâche(s) terminée(s)`;
}
