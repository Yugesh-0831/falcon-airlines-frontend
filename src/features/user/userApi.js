export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/users/" + userId);
    const data = await responce.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/users/" + update._id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await responce.json();
    resolve({ data });
  });
}
