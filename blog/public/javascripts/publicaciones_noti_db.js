function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("notificaciones", 1);

    request.onerror = (event) => {
      reject("Error al abrir la base de datos");
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("notificaciones")) {
        const store = db.createObjectStore("notificaciones", {
          keyPath: "id",
          autoIncrement: true,
        });
        // Añadir un índice para el campo "vista"
        store.createIndex("vista", "vista", { unique: false });
      }
    };
  });
}

async function obtenerDatosNotificacion(idComunidad) {
  try {
    const usuarios = await obtenerUsuariosComunidad(idComunidad);
    const usuariosComunidad = [];

    for (const usuarioId of usuarios) {
      const username = await obtenerUsernameUsuario(usuarioId);
      if (username) {
        usuariosComunidad.push(username);
      }
    }

    return { usuariosComunidad, usuarios };
  } catch (error) {
    console.error("Error al obtener datos de notificación:", error);
    throw error;
  }
}

async function obtenerUsuariosComunidad(idComunidad) {
  try {
    const response = await fetch(`/comunidades/notificacion/${idComunidad}`);
    const comunidad = await response.json();
    return comunidad.usuarios;
  } catch (error) {
    console.error("Error al obtener los usuarios de la comunidad:", error);
    throw error;
  }
}

async function obtenerUsernameUsuario(idUsuario) {
  try {
    const response = await fetch(`/login/${idUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const usuario = await response.json();

      return usuario.username;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el nombre de usuario:", error);
    throw error;
  }
}

async function guardarNotificacion(
  notificacion,
  comunidad,
  usuario,
  idComunidad
) {
  try {
    obtenerDatosNotificacion(idComunidad)
      .then(async ({ usuariosComunidad }) => {
        notificacion.usuarios = usuariosComunidad.map((usuario) => ({
          usuario,
          vista: false,
        }));
        notificacion.comunidad = comunidad;
        notificacion.idComunidad = idComunidad;
        notificacion.user = usuario;
        notificacion.vista = false;

        const db = await openDB();
        const transaction = db.transaction(["notificaciones"], "readwrite");
        const store = transaction.objectStore("notificaciones");

        const addRequest = store.add(notificacion);

        addRequest.onsuccess = (event) => {
          console.log("Notificación agregada correctamente a IndexedDB");
        };

        addRequest.onerror = (event) => {
          console.error(
            "Error al agregar la notificación a IndexedDB:",
            event.target.error
          );
        };

        transaction.oncomplete = (event) => {
          console.log("Transacción completada correctamente");
        };

        transaction.onerror = (event) => {
          console.error("Error en la transacción:", event.target.error);
        };
      })
      .catch((error) => {
        console.error("Error al obtener datos de notificación:", error);
      });
  } catch (error) {
    console.error("Error al guardar la notificación:", error);
  }
}

// Función para marcar una notificación como vista
async function marcarNotificacionComoVista(idNotificacion, usuarioActual) {
  try {
    const db = await openDB();
    const transaction = db.transaction(["notificaciones"], "readwrite");
    const store = transaction.objectStore("notificaciones");

    const request = store.get(idNotificacion);
    request.onsuccess = async (event) => {
      const notification = event.target.result;
      if (notification) {
        const usuarios = notification.usuarios;

        // Encontrar el índice del usuario actual en el array de usuarios
        const index = usuarios.findIndex(
          (user) => user.usuario === usuarioActual
        );

        // Verificar si se encontró al usuario actual en la notificación
        if (index !== -1) {
          // Marcar la propiedad vista como true solo para el usuario actual
          usuarios[index].vista = true;

          // Actualizar la notificación en IndexedDB
          const putRequest = store.put(notification);
          putRequest.onsuccess = () => {
            console.log(
              `Notificación marcada como vista para el usuario ${usuarioActual}`
            );
          };
          putRequest.onerror = (event) => {
            console.error(
              "Error al actualizar la notificación:",
              event.target.error
            );
          };
        } else {
          console.error(
            "El usuario actual no tiene acceso a esta notificación"
          );
        }
      } else {
        console.error("Notificación no encontrada");
      }
    };

    request.onerror = (event) => {
      console.error("Error al obtener la notificación:", event.target.error);
    };
  } catch (error) {
    console.error("Error al marcar notificación como vista:", error);
  }
}

// Función para obtener todas las notificaciones almacenadas con su ID
function obtenerNotificaciones(callback) {
  openDB().then((db) => {
    const transaction = db.transaction(["notificaciones"], "readonly");
    const store = transaction.objectStore("notificaciones");
    const request = store.getAll();

    request.onsuccess = (event) => {
      const notificaciones = event.target.result;
      callback(notificaciones);
    };
  });
}

const PUBLIC_VAPID_KEY =
  "BKKHgssFoMid5s-LXpkGnbc3anGBjXlyMtcai3cyQ0-c9aD6vcz2XU_5w6f0fgWmjaaiVbAmaRW4AJhZQ8iWMI4";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscription = async () => {
  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }
  // Registrar el Service Worker
  const register = await navigator.serviceWorker.register(
    "http://localhost:3002/javascripts/sw.js"
  );

  // Obtener la suscripción
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });

  // Obtener las claves 'auth' y 'p256dh' de la suscripción
  const { keys } = subscription.toJSON();
  const { p256dh, auth } = keys;

  // Obtener el endpoint de la suscripción
  const endpoint = subscription.endpoint;

  // Enviar la suscripción al servidor
  await fetch("/subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ endpoint, p256dh, auth }),
  });

  console.log("Subscription sent");
};

// Lógica para enviar el formulario al servidor
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#formulario-publicaciones");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      var descripcionPublicacion = tinymce.get("publicaciones").getContent();
      var selectComunidad = document.getElementById("comunidad");
      var idComunidad =
        selectComunidad.options[selectComunidad.selectedIndex].value;
      var nombreComunidad =
        selectComunidad.options[selectComunidad.selectedIndex].getAttribute(
          "data-nombre"
        );
      var usuario = document.getElementById("user").value;

      if (!descripcionPublicacion.trim() || idComunidad === "") {
        var mensajeErrorPublicacion =
          document.getElementById("error-publicacion");
        mensajeErrorPublicacion.style.display = "block";
        var mensajeErrorComunidad = document.getElementById("error-comunidad");
        mensajeErrorComunidad.style.display = "block";
        return;
      }

      // Obtener el mensaje del formulario
      const message = `Nueva publicación en la comunidad ${nombreComunidad}`;

      const data = {
        publicaciones: descripcionPublicacion,
        idComunidad: idComunidad,
        comunidad: nombreComunidad,
        usuario: usuario,
      };

      try {
        const response = await fetch("/publicaciones", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });

        // Guardar la notificación en IndexedDB
        guardarNotificacion({ message }, nombreComunidad, usuario, idComunidad);

        location.reload();
      } catch (error) {
        alert.log("Error al guardar la publicación");
      }

      // Enviar el mensaje al servidor para que envíe la notificación push
      /*await fetch("/subscription/new-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });*/
    });
  }
});

// Ejecutar la función de suscripción al cargar la página
subscription();

// En el evento load, obtener las notificaciones y marcarlas como vistas

document.addEventListener("DOMContentLoaded", async function () {
  obtenerNotificaciones(async function (notificaciones) {
    var usuario = document.getElementById("name-user");
    if (usuario) {
      var usuarioActual = usuario.textContent.trim();
      const notificacionesUsuarioActual = notificaciones.filter(
        (notificacion) => notificacion.user !== usuarioActual
      );
      for (const notificacion of notificacionesUsuarioActual) {
        const usuariosNotificacion = notificacion.usuarios;

        for (let i = 1; i < usuariosNotificacion.length; i++) {
          // Accede a la propiedad 'vista' de cada usuario en la notificación
          const usuario = usuariosNotificacion[i];

          // Verifica si el usuario ha visto la notificación
          if (usuario.usuario === usuarioActual && !usuario.vista) {
            await fetch("/subscription/new-message", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ message: notificacion.message }),
            });
            await marcarNotificacionComoVista(notificacion.id, usuarioActual);
          }
        }
      }
    }
  });
});

/*
    
    obtenerNotificaciones(async function (notificaciones) {
      var usuario = document.getElementById("user");
      if (usuario) {
        var usuario = usuario.value;
        for (const notificacion of notificaciones) {
          if (notificacion.user === usuario) {
            await marcarNotificacionComoVista(notificacion.id);
          } else if (!notificacion.vista) {
            const { message, id } = notificacion;
            await fetch("/subscription/new-message", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ message }),
            });
            // Marcar la notificación como vista después de enviarla
            await marcarNotificacionComoVista(id);
          }
        }
      }
    });
  });
});*/
