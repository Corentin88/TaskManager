const tasks = [];

function addTask(title, priority) {
  const newTask = {
    id: crypto.randomUUID(),
    title: title,
    completed: false,
    priority: priority,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
}

function renderTasks() {
  const taskList = document.querySelector("#taskList");
  taskList.textContent = "";
  tasks.forEach((task) => {
    const liElement = document.createElement("li");
    const titleElement = document.createElement("span");
    const priorityElement = document.createElement("span");
    const dateElement = document.createElement("span");
    const checkbox = document.createElement("input");
    titleElement.textContent = task.title;
    priorityElement.textContent = task.priority;
    dateElement.textContent = formatDate(task.createdAt);
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    if (checkbox.checked === true){
      titleElement.style.textDecoration = "line-through"
    }
    liElement.appendChild(titleElement);
    liElement.appendChild(priorityElement);
    liElement.appendChild(dateElement);
    liElement.appendChild(checkbox);
    taskList.appendChild(liElement);

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      if (checkbox.checked === true) {
        titleElement.style.textDecoration = "line-through";
        
      } else {
        titleElement.style.textDecoration = "none";
      }
      saveTasks()
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

renderTasks();
