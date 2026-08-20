
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
