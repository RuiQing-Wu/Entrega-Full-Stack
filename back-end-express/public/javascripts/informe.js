async function readImage() {
  // Leer databuffer da la imagen
  const response = await fetch("../../images/selloUMU.png");
  const blob = await response.arrayBuffer();
  return blob;
}

async function informe(informe) {
  // create a document and pipe to a blob

  // Parsear String a JSON
  var data = JSON.parse(informe);

  var doc = new PDFDocument();
  var stream = doc.pipe(blobStream());

  // Añadir metadatos al PDF
  doc.info["Title"] = "Informe Resumen PDF";
  doc.info["Author"] = "SolidarianID App";
  doc.info["Subject"] = "Informe de la Comunidad";
  doc.info["Keywords"] = "SolidarianID, Informe, Comunidad";
  doc.info["CreationDate"] = new Date();
  doc.info["ModDate"] = new Date();

  // AÑDIR IMAGEN SELLO UMU
  const img = await readImage();
  doc.image(img, 180, 0, { width: 300, align: "center", valign: "center" });

  // and some justified text wrapped into columns

  var start = 300;
  var plus = 0.5;
  var indent = 30;

  doc.fontSize(25);
  doc
    .fillColor("red")
    .text("Informe Resumen PDF", 100, start, { align: "center" });
  doc.moveDown(plus);

  doc.fontSize(10);
  doc.fillColor("black");
  doc.text("Informe Comunidad:");
  doc.moveDown(plus);
  doc.text("Id de comunidad: " + data.idComunidad, { indent: indent });
  doc.text("Nombre de comunidad: " + data.nombreComunidad, { indent: indent });

  // Descripción de la comunidad and ident all the lines after the first
  doc.text(
    "Descripción de la comunidad: " + data.descripcionComunidad,
    doc.x + indent,
    doc.y
  );
  doc.text(
    "Fecha de inicio de la comunidad: " + data.fechaInicioComunidad,
    doc.x - indent,
    doc.y,
    { indent: indent }
  );
  doc.text("Número de usuarios en la comunidad: " + data.numeroUsuarios, {
    indent: indent,
  });
  doc.text("Categorías de la comunidad:", { indent: indent });
  doc.list(data.categoriasComunidad, {
    listType: "bullet",
    indent: indent + 20,
    bulletIndent: 50,
    bulletRadius: 3, // use this value to almost hide the dots/bullets
    // textIndent: indent + 50,
  });
  doc.moveDown(plus);

  // Reset indent
  doc.text("Información de usuario Administrador:");
  doc.moveDown(plus);
  doc.text("Id de Administrador: " + data.idAdministrador, { indent: indent });
  doc.text("Nombre de Administrador: " + data.usernameAdministrador, {
    indent: indent,
  });
  doc.moveDown(plus);

  // Información de los usuarios
  doc.text("Información de ids de los Usuarios:");
  doc.moveDown(plus);
  doc.list(data.usuariosComunidad, {
    listType: "bullet",
    indent: indent + 20,
    bulletIndent: 50,
    bulletRadius: 3, // use this value to almost hide the dots/bullets
  });
  doc.moveDown(plus);

  // Información de las Causas
  doc.text("Información de las Causas:");
  doc.moveDown(plus);
  doc.text("Número de Causas Totales: " + data.numeroCausasTotales, {
    indent: indent,
  });
  doc.moveDown(plus);

  // Información de las Acciones
  doc.text("Información de las Acciones");
  doc.moveDown(plus);
  doc.text("Número de Acciones Totales: " + data.numeroAccionesTotales, {
    indent: indent,
  });
  doc.text("Número de Acciones Monetarias: " + data.tipoMonetario, {
    indent: indent,
  });
  doc.text("Número de Acciones de Voluntariado: " + data.tipoVoluntariado, {
    indent: indent,
  });
  doc.moveDown(plus);

  // Información de las Solicitudes
  doc.text("Información de las Solicitudes");
  doc.moveDown(plus);
  doc.text("Número de Solicitudes Totales: " + data.numeroTotalSolicitudes, {
    indent: indent,
  });
  doc.text(
    "Número de Solicitudes Pendientes: " + data.numeroSolicitudesPendientes,
    { indent: indent }
  );
  doc.text(
    "Número de Solicitudes Aceptadas: " + data.numeroSolicitudesAceptadas,
    { indent: indent }
  );
  doc.text(
    "Número de Solicitudes Rechazadas: " + data.numeroSolicitudesRechazadas,
    { indent: indent }
  );
  doc.moveDown(plus);

  // Información de los Apoyos a las Causas
  doc.text("Información de los Apoyos a las Causas");
  doc.moveDown(plus);
  doc.text("Número de Apoyos Totales: " + data.numeroTotalApoyos, {
    indent: indent,
  });

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    // get a blob you can do whatever you like with
    blob = stream.toBlob("application/pdf");

    const url = stream.toBlobURL("application/pdf");
    const iframe = document.querySelector("iframe");
    iframe.src = url;
  });
}

async function cargarGraficas(informe) {
  var data = JSON.parse(informe);

  var ctx = document
    .getElementById("miGraficoContribucionComunidad")
    .getContext("2d");

  const accionesData = {
    labels: ["Monetario", "Voluntariado"],
    datasets: [
      {
        data: [data.tipoMonetario, data.tipoVoluntariado],
        backgroundColor: [
          "rgb(255,0,0)", // red
          "rgb(0,128,0)", // green
        ],
        hoverOffset: 2,
      },
    ],
  };

  var myAccionChart = new Chart(ctx, {
    type: "pie",
    data: accionesData,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Gráfico de Acciones Comunidad",
        },
        subtitle: {
          display: true,
          text: "Total de Acciones: " + data.numeroAccionesTotales,
        },
      },
    },
  });

  var ctx2 = document
    .getElementById("miGraficoContribucionSolicitudes")
    .getContext("2d");

  const solicitudData = {
    labels: ["Rechazada", "Aceptada", "Pendiente"],
    datasets: [
      {
        data: [
          data.numeroSolicitudesRechazadas,
          data.numeroSolicitudesAceptadas,
          data.numeroSolicitudesPendientes,
        ],
        backgroundColor: [
          "rgb(255,0,0)", // red
          "rgb(0,128,0)", // green
          "rgb(255, 205, 86)", // yellow
        ],
        hoverOffset: 1,
      },
    ],
  };

  var mySolicitudChart = new Chart(ctx2, {
    type: "pie",
    data: solicitudData,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Gráfico de Solicitudes Comunidad",
        },
        subtitle: {
          display: true,
          text: "Total de Solicitudes: " + data.numeroTotalSolicitudes,
        },
      },
    },
  });
}
