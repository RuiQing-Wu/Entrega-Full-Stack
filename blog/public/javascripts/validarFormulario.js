document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario-publicaciones");
  const publicacionInput = document.getElementById("publicaciones");
  const comunidadSelect = document.getElementById("comunidad");
  const errorDivComunidad = document.getElementById("error-comunidad");
  const errorDivPublicacion = document.getElementById("error-publicacion");
  const errorMessagePublicacion = document.getElementById(
    "error-message-publicacion"
  );
  const errorMessageComunidad = document.getElementById(
    "error-message-comunidad"
  );
  const formularioComentario = document.getElementById("comentario-form");
  const comentario = document.getElementById("comentario");
  const errorDivComentario = document.getElementById("error-comentario");
  const errorMessageComentario = document.getElementById(
    "error-message-comentario"
  );

  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío automático del formulario

    ocultarError("comunidad");
    ocultarError("publicacion");

    let valido = true;

    if (publicacionInput.value.trim() === "") {
      mostrarError("Debes ingresar una publicación.", "publicacion");
      valido = false;
    }

    if (comunidadSelect.value === "") {
      mostrarError("Debes seleccionar una comunidad.", "comunidad");
      valido = false;
    }

    if (valido) {
      formulario.submit();
    }
  });

  formularioComentario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío automático del formulario

    ocultarError("comentario");

    let valido = true;

    if (comentario.value.trim() === "") {
      mostrarError("Debes ingresar un comentario.", "comentario");
      valido = false;
    }

    if (valido) {
      formularioComentario.submit();
    }
  });

  function mostrarError(message, tipo) {
    const errorDiv =
      tipo === "publicacion" ? errorDivPublicacion : errorDivComunidad;
    const errorMessage =
      tipo === "publicacion" ? errorMessagePublicacion : errorMessageComunidad;

    errorMessage.textContent = message;
    errorDiv.style.display = "block";

    if (tipo === "comentario") {
      errorMessageComentario.textContent = message;
      errorDivComentario.style.display = "block";
    }
  }

  function ocultarError(tipo) {
    const errorDiv =
      tipo === "publicacion" ? errorDivPublicacion : errorDivComunidad;
    errorDiv.style.display = "none";

    if (tipo === "comentario") {
      errorDivComentario.style.display = "none";
    }
  }
});
