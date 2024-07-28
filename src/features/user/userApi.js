export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    console.log("userId: " + userId);
    const responce = await fetch("http://localhost:8080/users/" + userId);
    console.log("http://localhost:8080/users/" + userId);
    const data = await responce.json();
    console.log("data: " + data.email);
    resolve({ data });
  });
}

export function updateUser(update) {
  console.log("update: ", update);
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
