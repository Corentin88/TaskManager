import { tasks } from "./state.js";

// Numeric values used to compare task priorities when sorting.
const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};


export function addTask(title, priority) {
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

export function filterTasks(filter) {
  const filters = {
    completed: (task) => task.completed,
    pending: (task) => !task.completed,
  };
  // Use the selected filter or return all tasks if no filter matches.
  return filters[filter]
    ? tasks.filter(filters[filter])
    : tasks;
}

export function searchTasks(taskToSearch, search) {
  const searchValue = search.toLowerCase();
  return taskToSearch.filter((task) =>
    task.title.toLowerCase().includes(searchValue),
  );
}

export function sortTasksByPriority(tasksToSort, order) {
  const copyTasks = [...tasksToSort];
  // Determine sort direction based on the selected order.
  const direction = order === "asc" ? 1 : -1;

  return copyTasks.sort(
    (a, b) =>
      (priorityOrder[a.priority] - priorityOrder[b.priority]) * direction,
  );
}



