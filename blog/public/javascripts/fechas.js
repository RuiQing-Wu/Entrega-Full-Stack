//Accede al span con id="fecha_publicacion" y cambia el formato de la fecha para cada una de las publicaciones
document.addEventListener("DOMContentLoaded", () => {
  const fechaPublicaciones = document.querySelectorAll("#fecha_publicacion");
  fechaPublicaciones.forEach((fecha) => {
    fecha.textContent = formatDate(fecha.textContent);
  });
  const fechaComentarios = document.querySelectorAll("#fecha_comentario");
  fechaComentarios.forEach((fecha) => {
    fecha.textContent = formatDate(fecha.textContent);
  });
});

// Función para formatear la fecha
function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return dateObj.toLocaleDateString(undefined, options);
}
