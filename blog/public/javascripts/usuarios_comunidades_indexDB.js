// usuarios_comunidades_indexDB.js

// Función para abrir o crear la base de datos IndexedDB
async function openDB() {
  try {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("notificaciones", 1);

      request.onerror = (event) => {
        reject("Error al abrir la base de datos");
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  } catch (error) {
    console.error("Error al abrir la base de datos:", error);
    throw error;
  }
}

// Función para obtener las comunidades guardadas en IndexDB y compararlas con select de comunidades
async function obtenerComunidadesDeIndexDB() {
  try {
    const db = await openDB();
    const transaction = db.transaction(["notificaciones"], "readonly");
    const comunidadesStore = transaction.objectStore("notificaciones");
    const request = comunidadesStore.getAll();

    request.onsuccess = (event) => {
      const notificaciones = event.target.result;

      var selectComunidad = document.getElementById("comunidad");
      for (let i = 1; i < selectComunidad.options.length; i++) {
        var opcion = selectComunidad.options[i];
        var nombreComunidad =
          selectComunidad.options[i].getAttribute("data-nombre");
        // Verificar si la comunidad del select existe en las notificaciones
        const comunidadEnNotif = notificaciones.find(
          (not) => not.comunidad === nombreComunidad
        );

        if (comunidadEnNotif) {
          console.log(`${opcion.textContent} existe en las notificaciones`);
        }
      }
    };
  } catch (error) {
    console.error("Error al obtener comunidades de IndexDB:", error);
    throw error;
  }
}

obtenerComunidadesDeIndexDB();
