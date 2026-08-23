import { tasks } from "./state.js";

export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks() {
  const data = localStorage.getItem("tasks");
  return JSON.parse(data) ?? [];
}