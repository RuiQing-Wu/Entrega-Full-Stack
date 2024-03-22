document.addEventListener("DOMContentLoaded", async function () {
  // Función para inicializar la base de datos IndexedDB
  async function initDB() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("seenCommentsDB", 1);

      request.onerror = function (event) {
        console.error("Error opening IndexedDB:", event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = function (event) {
        const db = event.target.result;
        resolve(db);
      };

      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        const store = db.createObjectStore("seenComments", {
          autoIncrement: true,
        });
      };
    });
  }

  // Función para guardar el ID de comentario visto en IndexedDB
  async function saveSeenComment(commentId, userId) {
    const db = await initDB();
    const transaction = db.transaction(["seenComments"], "readwrite");
    const store = transaction.objectStore("seenComments");
    store.add({ id: commentId, user: userId });
  }

  // Función para verificar si un comentario ha sido visto
  // Función para verificar si un comentario ha sido visto por un usuario específico
  async function isCommentSeen(commentId, userId) {
    const db = await initDB();
    const transaction = db.transaction(["seenComments"], "readonly");
    const store = transaction.objectStore("seenComments");

    return new Promise((resolve, reject) => {
      // Combinar commentId y userId para formar una clave única
      const key = `${commentId}_${userId}`;

      const request = store.get(key); // Usar la clave única para buscar en IndexedDB

      request.onsuccess = function (event) {
        const result = event.target.result;
        resolve(!!result); // Devuelve true si el comentario ha sido visto por el usuario
      };

      request.onerror = function (event) {
        console.error("Error checking comment:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  // Función para verificar y mostrar notificaciones
  async function checkAndNotify() {
    const response = await fetch("/", {
      headers: {
        accept: "application/json",
      },
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    const usuario = document.getElementById("name-user").textContent.trim();
    data.publicaciones.forEach(async (publicacion) => {
      if (publicacion.comentarios && publicacion.comentarios.length > 0) {
        publicacion.comentarios.forEach(async (comentario) => {
          const commentId = comentario._id;
          const isSeen = await isCommentSeen(commentId, usuario);
          console.log(comentario.usuario);
          if (!isSeen && comentario.idUsuario !== usuario) {
            const message = `Nuevo comentario en la publicación de la comunidad ${publicacion.comunidad}`;
            await fetch("/subscription/new-message", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ message }),
            });

            // Guardar el comentario visto en IndexedDB
            await saveSeenComment(commentId, usuario);
          }
        });
      }
    });
  }

  // Llamar a la función al cargar la página
  checkAndNotify();
});
