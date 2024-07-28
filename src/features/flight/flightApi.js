export function fetchAllFlights(item) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/flights");
    const data = await responce.json();
    resolve({ data });
  });
}

export function updateFlightSchedule(update) {
  return new Promise(async (resolve) => {
    const responce = await fetch(
      "http://localhost:8080/flights/" + update._id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await responce.json();
    resolve({ data });
  });
}
