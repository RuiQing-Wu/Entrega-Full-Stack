"use strict";

const CACHE_VERSION = "v1";
const CACHE_NAME = "my-cache-" + CACHE_VERSION;

// Archivos a cachear
const filesToCache = [
  "/stylesheets/bootstrap.min.css",
  "/stylesheets/bootstrap.min.js",
  "/stylesheets/popper.min.js",
  "/stylesheets/jquery-3.5.1.slim.min.js",
  "/stylesheets/style.css",
  "/shell.html",
  "/javascripts/main.js",
  "/index.html",
];

// Instalación del Service Worker y cacheo de archivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(filesToCache);
      })
      .then(() => {
        console.log("Service Worker installed and files cached");
      })
      .catch((error) => {
        console.error("Cache installation failed:", error);
      })
  );
});

// Eliminación de caches antiguas al activar el nuevo Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de cacheo y red para las solicitudes fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener("push", (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "../images/blog-24.png",
  });
});
