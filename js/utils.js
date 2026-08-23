
export function formatDate(date) {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year} à ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
