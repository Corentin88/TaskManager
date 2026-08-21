const tasks = [];
const taskFilter = document.querySelector("#taskFilter");

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

function renderTasks(filterToRender) {
  const taskList = document.querySelector("#taskList");
  taskList.textContent = "";
  filterToRender.forEach((task) => {
    const liElement = document.createElement("li");
    const titleElement = document.createElement("span");
    const priorityElement = document.createElement("span");
    const dateElement = document.createElement("span");
    const checkbox = document.createElement("input");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    titleElement.textContent = task.title;
    priorityElement.textContent = task.priority;
    dateElement.textContent = formatDate(task.createdAt);
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    styleRender(checkbox, titleElement);
    liElement.appendChild(titleElement);
    liElement.appendChild(priorityElement);
    liElement.appendChild(dateElement);
    liElement.appendChild(checkbox);
    liElement.appendChild(deleteButton);
    taskList.appendChild(liElement);

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      styleRender(checkbox, titleElement);
      saveTasks();
      renderTasks(filterTasks(taskFilter.value));
    });
    deleteButton.addEventListener("click", () => {
      const taskId = task.id;
      const taskIndex = tasks.findIndex((item) => taskId === item.id);
      const result = confirm("Etes vous sur de vouloir supprimer");
      if (result === false) {
        return;
      }
      tasks.splice(taskIndex, 1);

      saveTasks();
      renderTasks(filterTasks(taskFilter.value));
    });
  });
}

function formatDate(date) {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  return (
    String(day).padStart(2, "0") +
    "/" +
    String(month).padStart(2, "0") +
    "/" +
    year +
    " à " +
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0")
  );
}

function saveTasks() {
  const data = JSON.stringify(tasks);
  localStorage.setItem("tasks", data);
  console.log(data);
  console.log(localStorage);
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  const loadedTasks = JSON.parse(data) ?? [];
  return loadedTasks;
}

const loadedTasks = loadTasks();
tasks.push(...loadedTasks);

renderTasks(filterTasks(taskFilter.value));

const form = document.querySelector("#taskForm");
const titleInput = document.querySelector("#taskTitle");
const priorityInput = document.querySelector("#taskPriority");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const priority = priorityInput.value;
  if (title === "") {
    return alert("Veuillez entrer un titre");
  }
  addTask(title, priority);
  saveTasks();
  renderTasks(filterTasks(taskFilter.value));
  titleInput.value = "";
  priorityInput.value = "low";
  console.log(tasks);
});

function styleRender(checkbox, titleElement) {
  titleElement.style.textDecoration = checkbox.checked
    ? "line-through"
    : "none";
}

function filterTasks(filter) {
  if (filter === "completed") {
    return tasks.filter((task) => task.completed === true);
  } else if (filter === "pending") {
    return tasks.filter((task) => !task.completed);
  } else {
    return tasks;
  }
}

taskFilter.addEventListener("change", () => {
  renderTasks(filterTasks(taskFilter.value));
});
