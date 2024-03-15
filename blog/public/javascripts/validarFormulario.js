document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
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

  function mostrarError(message, tipo) {
    const errorDiv =
      tipo === "publicacion" ? errorDivPublicacion : errorDivComunidad;
    const errorMessage =
      tipo === "publicacion" ? errorMessagePublicacion : errorMessageComunidad;

    errorMessage.textContent = message;
    errorDiv.style.display = "block";
  }

  function ocultarError(tipo) {
    const errorDiv =
      tipo === "publicacion" ? errorDivPublicacion : errorDivComunidad;
    errorDiv.style.display = "none";
  }
});
