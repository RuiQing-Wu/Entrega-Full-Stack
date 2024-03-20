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

// Función para guardar una notificación en IndexedDB
async function guardarNotificacion(notificacion, comunidad, usuario) {
  const db = await openDB();
  const transaction = db.transaction(["notificaciones"], "readwrite");
  const store = transaction.objectStore("notificaciones");

  notificacion.comunidad = comunidad;
  notificacion.user = usuario;
  notificacion.vista = false;

  store.add(notificacion);
}

// Función para marcar una notificación como vista
async function marcarNotificacionComoVista(idNotificacion) {
  const db = await openDB();
  const transaction = db.transaction(["notificaciones"], "readwrite");
  const store = transaction.objectStore("notificaciones");

  const request = store.get(idNotificacion);
  request.onsuccess = async (event) => {
    const notification = event.target.result;
    if (notification) {
      notification.vista = true;
      const putRequest = store.put(notification);
      putRequest.onsuccess = () => {
        //console.log("Notificación actualizada:", notification);
      };
      putRequest.onerror = (event) => {
        alert.error("Error al actualizar la notificación:", event.target.error);
      };
    } else {
      alert.error("Notificación no encontrada");
    }
  };
  request.onerror = (event) => {
    alert.error("Error al obtener la notificación:", event.target.error);
  };
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
        comunidad: idComunidad,
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

        location.reload();
      } catch (error) {
        alert.log("Error al guardar la publicación");
      }

      // Guardar la notificación en IndexedDB
      guardarNotificacion({ message }, nombreComunidad, usuario);

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
window.addEventListener("load", async function () {
  document.addEventListener("DOMContentLoaded", async function () {
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
});
