export function addIdToLocal(id) {
  const sessionId = localStorage.getItem("performanceCartId");
  if (!sessionId) {
    localStorage.setItem("performanceCartId", JSON.stringify(id));
  } else {
    localStorage.removeItem("performanceCartId");
    localStorage.setItem("performanceCartId", JSON.stringify(id));
  }
  return;
}
