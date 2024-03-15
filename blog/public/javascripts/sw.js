"use strict";
var version = "v1";
const currentCache = "cache-" + version;

// Incluimos esta cache para recuperar los recursos que queremos que se visualicen en el navegador sin conexion.
const files = [
  "/stylesheets/bootstrap.min.css",
  "/stylesheets/bootstrap.min.js",
  "/stylesheets/popper.min.js",
  "/stylesheets/jquery-3.5.1.slim.min.js",
  "/stylesheets/style.css",
  "/shell.html",
  "/javascripts/main.js",
  "/javascripts/sw.js",
];

// Cuando el Service Worker se ha instalado en el navegador, se activa y borran las caches antiguas
// Me quedo con la cache actual
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(currentCache).then((cache) => {
      return cache.addAll(files);
    })
  );
});

// Busca en la cache si existe el recurso solicitado, si no lo encuentra, lo busca en la red
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(currentCache).then((cache) => {
      return cache.addAll(files);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .map((c) => c.split("-"))
          .filter((c) => c[0] === "cache")
          .filter((c) => c[1] !== version)
          .map((c) => caches.delete(c.join("-")))
      )
    )
  );
});

//self.addEventListener("install", (event) => {
//  event.waitUntil()})

//self.addEventListener("activate", () => self.clients.claim());

/*self.addEventListener("fetch", function (event) {
  event.respondWith(fetch(event.request));
  //event.respondWith(fetch('/test.html'));
});*/

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      console.log(
        event.request.url + " " + (response ? "in cache" : "not in cache")
      );
      return response || fetch(event.request);
    })
  );
});

// mostrar notificaciones
/* self.addEventListener("push", function (event) {
  const payload = event.data ? event.data.text() : "no payload";
  event.waitUntil(
    self.registration.showNotification("ServiceWorker Cookbook", {
      body: payload,
    }),
  );
}); */

// Register event listener for the 'push' event.
self.addEventListener("push", function (event) {
  // Retrieve the textual payload from event.data (a PushMessageData object).
  // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
  // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
  const payload = event.data ? event.data.text() : "no payload";

  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    // Show a notification with title 'ServiceWorker Cookbook' and use the payload
    // as the body.
    self.registration.showNotification("ServiceWorker Cookbook", {
      body: payload,
    })
  );
});
