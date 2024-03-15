document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", function (event) {
    if (!validarFormulario()) {
      event.preventDefault(); // Evitar que se envíe el formulario si no pasa la validación
    }
  });

  function validarFormulario() {
    const publicacionInput = document.getElementById("publicaciones");
    const comunidadSelect = document.getElementById("comunidad");

    // Reiniciar mensajes de error
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

    return valido;
  }

  function mostrarError(message, tipo) {
    const errorDivComunidad = document.getElementById("error-comunidad");

    if (tipo === "publicacion") {
      const errorMessagePublicacion = document.getElementById(
        "error-message-publicacion"
      );
      errorMessagePublicacion.textContent = message;
      errorMessagePublicacion.style.display = "block"; // Mostrar mensaje de error
    }

    if (tipo === "comunidad") {
      const errorMessageComunidad = document.getElementById(
        "error-message-comunidad"
      );
      errorMessageComunidad.textContent = message;
      errorDivComunidad.style.display = "block"; // Mostrar mensaje de error
    }
  }

  function ocultarError(tipo) {
    const errorDivComunidad = document.getElementById("error-comunidad");
    const errorMessagePublicacion = document.getElementById(
      "error-message-publicacion"
    );
    const errorMessageComunidad = document.getElementById(
      "error-message-comunidad"
    );

    if (tipo === "publicacion") {
      errorMessagePublicacion.style.display = "none"; // Ocultar mensaje de error
    }

    if (tipo === "comunidad") {
      errorMessageComunidad.style.display = "none"; // Ocultar mensaje de error
      errorDivComunidad.style.display = "none"; // Ocultar contenedor de error
    }
  }
});
