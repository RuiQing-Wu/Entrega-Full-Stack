const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const diasSemanaOrdenados = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

function getCadenaUltimaSemana() {
  const fechaHoy = new Date().toLocaleDateString();
  const fecha = new Date();
  const fechaSemanaPasada = new Date(
    fecha.setDate(fecha.getDate() - 7)
  ).toLocaleDateString();
  const cadenaUltimaSemana = fechaSemanaPasada + " - " + fechaHoy;

  return cadenaUltimaSemana;
}

async function getEstadistica() {
  // Obtener el contexto del canvas
  pintarGraficasUsuario();
  pintarGraficasComunidad();
  pintarGraficasCausas();
  pintarGraficasAcciones();
  pintarGraficasContribucion();
}

async function getEstadisticaUsuario() {
  try {
    const data = await fetch("/estadisticas/getEstadisticaUser");
    const dataJson = await data.json();
    // console.log(dataJson);
    return dataJson;
  } catch (error) {
    console.error("Error al obtener las estadisticas del usuario:", error);
  }
}

async function calcularEstadisticaUsuario() {
  const data = await getEstadisticaUsuario();

  const totalUsuarios = data.length;
  const mensajes = data.map((usuario) => JSON.parse(usuario.mensaje));
  const paises = mensajes.map((usuario) => usuario.pais);
  const paisesUnicos = [...new Set(paises)];

  // GET VALUE OF EACH COUNTRY
  const countPaises = paises.reduce((acc, pais) => {
    if (acc[pais]) {
      acc[pais] += 1;
    } else {
      acc[pais] = 1;
    }
    return acc;
  }, {});

  const lastWeek = data.filter((usuario) => {
    const fecha = new Date(usuario.fecha_evento);
    const hoy = new Date();
    const hoyCopy = new Date(hoy);
    const semanaPasada = new Date(hoyCopy.setDate(hoyCopy.getDate() - 7));
    return fecha > semanaPasada && fecha <= hoy;
  });

  // Clasificar usuarios por dias de la semana de la última semana de lunes a domingo
  const countDias = lastWeek.reduce((acc, usuario) => {
    const fecha = new Date(usuario.fecha_evento);
    const dia = diasSemana[fecha.getDay()];
    if (acc[dia]) {
      acc[dia] += 1;
    } else {
      acc[dia] = 1;
    }
    return acc;
  }, {});

  return {
    totalUsuarios,
    paisesUnicos,
    countPaises,
    lastWeek,
    countDias,
  };
}

async function pintarGraficasUsuario() {
  const { totalUsuarios, paisesUnicos, countPaises, lastWeek, countDias } =
    await calcularEstadisticaUsuario();
  // console.log(totalUsuarios, paisesUnicos, countPaises, lastWeek, countDias);

  var ctx = document.getElementById("usuarioRegistradoTotal").getContext("2d");
  const cadenaUltimaSemana = getCadenaUltimaSemana();

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: diasSemanaOrdenados,
      datasets: [
        {
          label: "",
          data: diasSemanaOrdenados.map((dia) => countDias[dia] || 0),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,128,128, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,128,128, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          // dias de la ultima semana
          text: "Gráfico de Usuarios ultima semana " + cadenaUltimaSemana,
        },
        subtitle: {
          display: true,
          text:
            "Total de Usuarios App: " +
            totalUsuarios +
            " \nTotal de Usuarios ultima semana: " +
            lastWeek.length,
        },
      },
    },
  });

  var ctx2 = document.getElementById("usuarioRegistradoPais").getContext("2d");
  var myChart2 = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: paisesUnicos,
      datasets: [
        {
          label: "# of Votes",
          data: paisesUnicos.map((pais) => countPaises[pais] || 0),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          // dias de la ultima semana
          text: "Gráfico de Usuarios por Países " + cadenaUltimaSemana,
        },
        subtitle: {
          display: true,
          text: "Total Paises: " + paisesUnicos.length,
        },
      },
    },
  });
}

async function getEstadisticaComunidad() {
  try {
    const data = await fetch("/estadisticas/getEstadisticaComunidad");
    const dataJson = await data.json();
    // console.log(dataJson);
    return dataJson;
  } catch (error) {
    console.error("Error al obtener las estadisticas de la comunidad:", error);
  }
}

async function calcularEstadisticaComunidad() {
  const data = await getEstadisticaComunidad();
  const totalComunidad = data.length;

  // Get the last week data
  const lastWeek = data.filter((comunidad) => {
    const fecha = new Date(comunidad.fecha_evento);
    const hoy = new Date();
    const hoyCopy = new Date(hoy);
    const semanaPasada = new Date(hoyCopy.setDate(hoyCopy.getDate() - 7));
    return fecha > semanaPasada && fecha <= hoy;
  });

  // Sort the last week data by day of the week from Monday to Sunday
  const countDias = lastWeek.reduce((acc, comunidad) => {
    const fecha = new Date(comunidad.fecha_evento);
    const dia = diasSemana[fecha.getDay()];
    if (acc[dia]) {
      acc[dia] += 1;
    } else {
      acc[dia] = 1;
    }
    return acc;
  }, {});

  return {
    totalComunidad,
    lastWeek,
    countDias,
  };
}

async function pintarGraficasComunidad() {
  const { totalComunidad, lastWeek, countDias } =
    await calcularEstadisticaComunidad();
  // console.log(totalComunidad, lastWeek, countDias);

  var ctx = document
    .getElementById("comunidadRegistradoTotal")
    .getContext("2d");
  const cadenaUltimaSemana = getCadenaUltimaSemana();

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: diasSemanaOrdenados,
      datasets: [
        {
          label: "",
          data: diasSemanaOrdenados.map((dia) => countDias[dia] || 0),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,128,128, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,128,128, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          // dias de la ultima semana
          text: "Gráfico de Comunidades ultima semana " + cadenaUltimaSemana,
        },
        subtitle: {
          display: true,
          text:
            "Total de Comunidad App: " +
            totalComunidad +
            " \nTotal de Comunidad ultima semana: " +
            lastWeek.length,
        },
      },
    },
  });
}

async function getEstadisticaCausas() {
  try {
    const data = await fetch("/estadisticas/getEstadisticaCausas");
    const dataJson = await data.json();
    // console.log(dataJson);
    return dataJson;
  } catch (error) {
    console.error("Error al obtener las estadisticas de la causa:", error);
  }
}

async function calcularEstadisticaCausas() {
  const data = await getEstadisticaCausas();
  const totalCausas = data.length;

  const lastWeek = data.filter((causa) => {
    const fecha = new Date(causa.fecha_evento);
    const hoy = new Date();
    const hoyCopy = new Date(hoy);
    const semanaPasada = new Date(hoyCopy.setDate(hoyCopy.getDate() - 7));
    return fecha > semanaPasada && fecha <= hoy;
  });

  const countDias = lastWeek.reduce((acc, causa) => {
    const fecha = new Date(causa.fecha_evento);
    const dia = diasSemana[fecha.getDay()];
    if (acc[dia]) {
      acc[dia] += 1;
    } else {
      acc[dia] = 1;
    }
    return acc;
  }, {});

  // Coger todos los objetivos de las causas
  const causas = data.map((causa) => JSON.parse(causa.mensaje));
  const objetivos = causas.map((causa) => causa.objetivos).flat();

  const objetivosUnicos = [...new Set(objetivos)];

  // Contar
  const countObjetivos = objetivos.reduce((acc, objetivo) => {
    if (acc[objetivo]) {
      acc[objetivo] += 1;
    } else {
      acc[objetivo] = 1;
    }
    return acc;
  }, {});

  return {
    totalCausas,
    lastWeek,
    countDias,
    objetivosUnicos,
    countObjetivos,
  };
}

async function pintarGraficasCausas() {
  const { totalCausas, lastWeek, countDias, objetivosUnicos, countObjetivos } =
    await calcularEstadisticaCausas();
  // console.log(totalCausas, lastWeek, countDias, objetivosUnicos, countObjetivos);

  var ctx = document.getElementById("causasRegistradoTotal").getContext("2d");
  const cadenaUltimaSemana = getCadenaUltimaSemana();

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: diasSemanaOrdenados,
      datasets: [
        {
          label: "",
          data: diasSemanaOrdenados.map((dia) => countDias[dia] || 0),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,128,128, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,128,128, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          // dias de la ultima semana
          text: "Gráfico de Causas ultima semana " + cadenaUltimaSemana,
        },
        subtitle: {
          display: true,
          text:
            "Total de Causas App: " +
            totalCausas +
            " \nTotal de Causas ultima semana: " +
            lastWeek.length,
        },
      },
    },
  });

  var ctx2 = document.getElementById("causasPorObjetivos").getContext("2d");

  const top = objetivosUnicos.sort(
    (a, b) => countObjetivos[b] - countObjetivos[a]
  );
  const topObjetivos = top.slice(0, 10);
  const causasData = {
    labels: topObjetivos,
    datasets: [
      {
        data: topObjetivos.map((objetivo) => countObjetivos[objetivo] || 0),
        backgroundColor: [
          "rgb(255,0,0)", // red
          "rgb(0,128,0)", // green
          "rgb(255, 205, 86)", // yellow
          "rgb(75, 192, 192)", // green
          "rgb(153, 102, 255)", // purple
          "rgb(255, 159, 64)", // orange
          "rgb(128,128,128)", // gray
          "rgb(255, 99, 132)", // pink
          "rgb(54, 162, 235)", // blue
          "rgb(255, 206, 86)", // yellow
        ],
        hoverOffset: 2,
      },
    ],
  };

  var myAccionChart = new Chart(ctx2, {
    type: "pie",
    data: causasData,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Gráfico de Top 10 Objetivos Comunidad",
        },
        subtitle: {
          display: true,
          text: "Total de Objetivos distintos: " + objetivosUnicos.length,
        },
        legend: {
          display: false,
          position: "right",
        },
      },
    },
  });
}

async function getEstadisticaAcciones() {
  try {
    const data = await fetch("/estadisticas/getEstadisticaAcciones");
    const dataJson = await data.json();
    // console.log(dataJson);
    return dataJson;
  } catch (error) {
    console.error("Error al obtener las estadisticas de las acciones:", error);
  }
}

async function calcularEstadisticaAcciones() {
  const data = await getEstadisticaAcciones();
  const totalAcciones = data.length;

  const lastWeek = data.filter((accion) => {
    const fecha = new Date(accion.fecha_evento);
    const hoy = new Date();
    const hoyCopy = new Date(hoy);
    const semanaPasada = new Date(hoyCopy.setDate(hoyCopy.getDate() - 7));
    return fecha > semanaPasada && fecha <= hoy;
  });

  const countDias = lastWeek.reduce((acc, accion) => {
    const fecha = new Date(accion.fecha_evento);
    const dia = diasSemana[fecha.getDay()];
    if (acc[dia]) {
      acc[dia] += 1;
    } else {
      acc[dia] = 1;
    }
    return acc;
  }, {});

  // Coger todos los tipos de acciones
  const acciones = data.map((accion) => JSON.parse(accion.mensaje));
  const tipos = acciones.map((accion) => accion.tipo);
  const tiposUnicos = [...new Set(tipos)];

  // Contar
  const countTipos = tipos.reduce((acc, tipo) => {
    if (acc[tipo]) {
      acc[tipo] += 1;
    } else {
      acc[tipo] = 1;
    }
    return acc;
  }, {});

  return {
    totalAcciones,
    lastWeek,
    countDias,
    tiposUnicos,
    countTipos,
  };
}

async function pintarGraficasAcciones() {
  const { totalAcciones, lastWeek, countDias, tiposUnicos, countTipos } =
    await calcularEstadisticaAcciones();

  // console.log(totalAcciones, lastWeek, countDias, tiposUnicos, countTipos);

  var ctx = document.getElementById("accionesRegistradoTotal").getContext("2d");
  const cadenaUltimaSemana = getCadenaUltimaSemana();

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: diasSemanaOrdenados,
      datasets: [
        {
          label: "",
          data: diasSemanaOrdenados.map((dia) => countDias[dia] || 0),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,128,128, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,128,128, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          // dias de la ultima semana
          text: "Gráfico de Acciones ultima semana " + cadenaUltimaSemana,
        },
        subtitle: {
          display: true,
          text:
            "Total de Acciones App: " +
            totalAcciones +
            " \nTotal de Acciones ultima semana: " +
            lastWeek.length,
        },
      },
    },
  });

  var ctx2 = document.getElementById("accionesPorTipo").getContext("2d");

  // Utilziar chart pie para todos los tipos de acciones
  const accionesData = {
    labels: tiposUnicos,
    datasets: [
      {
        data: tiposUnicos.map((tipo) => countTipos[tipo] || 0),
        backgroundColor: [
          "rgb(255,0,0)", // red
          "rgb(0,128,0)", // green
        ],
        hoverOffset: 2,
      },
    ],
  };

  var myAccionChart = new Chart(ctx2, {
    type: "pie",
    data: accionesData,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Gráfico de Top 10 Tipos de Acciones Comunidad",
        },
        subtitle: {
          display: true,
          text: "Total de Tipos distintos: " + tiposUnicos.length,
        },
        legend: {
          display: false,
          position: "right",
        },
      },
    },
  });
}

async function getEstadisticasContribucion() {
  try {
    const data = await fetch("/estadisticas/getEstadisticaContribucion");
    const dataJson = await data.json();
    // console.log(dataJson);
    return dataJson;
  } catch (error) {
    console.error(
      "Error al obtener las estadisticas de la contribución:",
      error
    );
  }
}

async function calcularEstadisticasContribucion() {
  const data = await getEstadisticasContribucion();
  const totalContribucion = data.length;

  const lastWeek = data.filter((contribucion) => {
    const fecha = new Date(contribucion.fecha_evento);
    const hoy = new Date();
    const hoyCopy = new Date(hoy);
    const semanaPasada = new Date(hoyCopy.setDate(hoyCopy.getDate() - 7));
    return fecha > semanaPasada && fecha <= hoy;
  });

  const countDias = lastWeek.reduce((acc, contribucion) => {
    const fecha = new Date(contribucion.fecha_evento);
    const dia = diasSemana[fecha.getDay()];
    if (acc[dia]) {
      acc[dia] += 1;
    } else {
      acc[dia] = 1;
    }
    return acc;
  }, {});

  // Coger las cantidades de contribuciones por fecha de la última semana y sumarlas
  const amountPerDay = lastWeek.reduce((acc, contribucion) => {
    const fecha = new Date(contribucion.fecha_evento);
    const dia = diasSemana[fecha.getDay()];
    const cantidad = JSON.parse(contribucion.mensaje).contribucion;
    if (acc[dia]) {
      acc[dia] += cantidad;
    } else {
      acc[dia] = cantidad;
    }
    return acc;
  }, {});

  const total = lastWeek.reduce((acc, contribucion) => {
    const cantidad = JSON.parse(contribucion.mensaje).contribucion;
    return acc + cantidad;
  } , 0); 

  return {
    totalContribucion,
    lastWeek,
    countDias,
    amountPerDay,
    total,
  };
}

async function pintarGraficasContribucion() {
  const { totalContribucion, lastWeek, countDias, amountPerDay, total } =
    await calcularEstadisticasContribucion();

  console.log(totalContribucion, lastWeek, countDias, amountPerDay, total);
  var ctx = document
    .getElementById("cotribucionRegistradoTotal")
    .getContext("2d");
  const cadenaUltimaSemana = getCadenaUltimaSemana();

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: diasSemanaOrdenados,
      datasets: [
        {
          label: "",
          data: diasSemanaOrdenados.map((dia) => countDias[dia] || 0),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,128,128, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,128,128, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          // dias de la ultima semana
          text: "Gráfico de Contribuciones ultima semana " + cadenaUltimaSemana,
        },
        subtitle: {
          display: true,
          text:
            "Total de Contribuciones App: " +
            totalContribucion +
            " \nTotal de Contribuciones ultima semana: " +
            lastWeek.length,
        },
      },
    },
  });

  var ctx2 = document.getElementById("contribucionPorDiaSemana").getContext("2d");

  // Utilizar line chart to show the amount of contributions per day
  const contribucionData = {
    labels: diasSemanaOrdenados,
    datasets: [
      {
        label: "Contribución",
        data: diasSemanaOrdenados.map((dia) => amountPerDay[dia] || 0),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  var myContribucionChart = new Chart(ctx2, {
    type: "line",
    data: contribucionData,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Gráfico de Contribuciones por día de la semana " + cadenaUltimaSemana,
        },
        subtitle: {
          display: true,
          text: "Total de Contribuciones Ultima Semana: " + total,
        },
      },
    },
  });
}
