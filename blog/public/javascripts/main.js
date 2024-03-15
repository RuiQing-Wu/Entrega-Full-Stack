if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    if (registrations.length > 0)
      console.log("Service Worker previamente instalado.");
    else
      navigator.serviceWorker
        .register("javascripts/sw.js")
        .then((resultado) => console.log("Service Worker instalado."));
  });
}
