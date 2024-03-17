// usuarios_comunidades_indexDB.js

// Función para abrir o crear la base de datos IndexedDB
async function openDB() {
  try {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("usuarios_comunidades", 1);

      request.onerror = (event) => {
        reject("Error al abrir la base de datos");
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("usuarios")) {
          db.createObjectStore("usuarios", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
        if (!db.objectStoreNames.contains("comunidades")) {
          db.createObjectStore("comunidades", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };
    });
  } catch (error) {
    console.error("Error al abrir la base de datos:", error);
    throw error;
  }
}

// Función para guardar usuarios y comunidades en IndexDB
async function guardarUsuariosComunidadesEnIndexDB(usuarios, comunidades, db) {
  try {
    const transaction = db.transaction(
      ["usuarios", "comunidades"],
      "readwrite"
    );
    const usuariosStore = transaction.objectStore("usuarios");
    const comunidadesStore = transaction.objectStore("comunidades");

    for (const usuario of usuarios) {
      await usuariosStore.add(usuario);
    }

    for (const comunidad of comunidades) {
      await comunidadesStore.add(comunidad);
    }

    console.log("Usuarios y comunidades guardados en IndexDB correctamente.");
  } catch (error) {
    console.error("Error al guardar en IndexDB:", error);
    throw error;
  }
}

// Función para obtener las publicaciones por fetch
async function obtenerPublicacionesPorFetch() {
  try {
    const response = await fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }); // Endpoint en tu servidor Express para obtener las publicaciones
    if (!response.ok) {
      throw new Error("Error al obtener las publicaciones");
    }
    const data = await response.json();
    console.log("Publicaciones obtenidas por fetch:", data);

    // Abre la base de datos y guarda las publicaciones y comunidades
    const db = await openDB();
    await guardarUsuariosComunidadesEnIndexDB(
      data.usuarios,
      data.comunidades,
      db
    );

    console.log(
      "Publicaciones obtenidas y guardadas en IndexDB correctamente."
    );
  } catch (error) {
    console.error("Error al obtener las publicaciones por fetch:", error);
    throw error;
  }
}

obtenerPublicacionesPorFetch();
