// Abrir la base de datos
let db;
const request = indexedDB.open("notificaciones", 1);

request.onerror = function (event) {
  console.error("Error al abrir la base de datos:", event.target.errorCode);
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  const objectStore = db.createObjectStore("notificaciones", { keyPath: "id" });
  // Configurar el almacenamiento de objetos
  objectStore.createIndex("comunidad", "comunidad", { unique: false });
  objectStore.createIndex("vista", "vista", { unique: false });
};

request.onsuccess = function (event) {
  db = event.target.result;
  const transaction = db.transaction(["notificaciones"], "readonly");
  const objectStore = transaction.objectStore("notificaciones");
  const getAllRequest = objectStore.getAll();

  getAllRequest.onsuccess = function (event) {
    const notifications = event.target.result;
    const postsContainer = document.getElementById("postsContainer");
    notifications.forEach((notification) => {
      const postElement = document.createElement("div");
      if (
        Array.isArray(notification.usuarios) &&
        notification.usuarios.length > 0
      ) {
        const usersList = notification.usuarios
          .filter((u) => u.vista)
          .map((u) => u.usuario)
          .join(", ");

        postElement.innerHTML = `
        <div class="container-fluid my-3 p-3 bg-light rounded">
          <h3>${notification.message}</h3>
          <p><strong>Comunidad:</strong> ${notification.comunidad}</p>
          <p><strong>Usuario:</strong> ${notification.user}</p>
          <p><strong>Usuarios:</strong> ${usersList}</p>
        </div>
        <hr>
      `;
        postsContainer.appendChild(postElement);
      } else {
        console.log("No se encontraron usuarios o el formato es incorrecto.");
      }
    });
  };
};
