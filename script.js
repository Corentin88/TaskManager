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
console.log(addTask("test", "medium"));
console.log(addTask("test2", "High"));
console.log(addTask("test3", "low"));

function renderTasks() {
  const taskList = document.querySelector("#taskList");
  taskList.textContent = "";
  tasks.forEach((task) => {
    const liElement = document.createElement("li");
    const titleElement = document.createElement("span");
    const priorityElement = document.createElement("span");
    const dateElement = document.createElement("span");
    titleElement.textContent = task.title;
    priorityElement.textContent = task.priority;
    dateElement.textContent = formatDate(task.createdAt);
    liElement.appendChild(titleElement);
    liElement.appendChild(priorityElement);
    liElement.appendChild(dateElement);

    taskList.appendChild(liElement);
  });
}

renderTasks();

function formatDate(date) {
    const dateObject = new Date(date)
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
