const mongoClient = require("../config/mongoClient");
const Informe = require("../models/informe");
// let db = mongoClient.connectMongo();
const { API_BACK_NEST } = require("../utils/constantes");

class ComunidadesRepository {
  static async getAllComunidades() {
    try {
      const response = await fetch(API_BACK_NEST.API_COMUNIDADES);
      return await response.json();
    } catch (error) {
      console.error("Error al obtener todas las comunidades:", error);
      throw error;
    }
  }

  static async getInfoComunidad(id) {
    try {
      const comunidad = await fetch(API_BACK_NEST.API_COMUNIDADES + "/" + id);
      const comunidadData = await comunidad.json();

      const adminComunidad = await fetch(
        API_BACK_NEST.API_USERS + "/" + comunidadData.idAdministrador
      );
      const adminData = await adminComunidad.json();

      const causasComunidad = await fetch(API_BACK_NEST.API_CAUSAS);
      const causasData = await causasComunidad.json();
      const causasComunidadFiltradas = causasData.filter(
        (causa) => causa.comunidad === comunidadData.id
      );

      const causasTitulo = causasComunidadFiltradas.map((causa) => causa.titulo);

      const causasIds = causasComunidadFiltradas.map((causa) => causa.id);

      const accionesComunidad = await fetch(API_BACK_NEST.API_ACCIONES);
      const accionesData = await accionesComunidad.json();
      const accionesComunidadFiltradas = accionesData.filter((accion) =>
        causasIds.includes(accion.causa)
      );

      const solicitudes = await fetch(API_BACK_NEST.API_SOLICITUDES);
      const solicitudesData = await solicitudes.json();
      const solicitudesComunidadFiltradas = solicitudesData.filter(
        (solicitud) => solicitud.idComunidad === comunidadData.id
      );

      const apoyoCausas = await fetch(API_BACK_NEST.API_APOYO_CAUSAS);
      const apoyoCausasData = await apoyoCausas.json();
      const apoyoCausasComunidadFiltradas = apoyoCausasData.filter((apoyo) =>
        causasIds.includes(apoyo.idCausa)
      );

      const totalApoyos = apoyoCausasComunidadFiltradas.reduce(
        (acc, apoyo) => acc + apoyo.numApoyo,
        0
      );

      const informe = new Informe({
        idAdministrador: adminData.id,
        usernameAdministrador: adminData.username,

        idComunidad: comunidadData.id,
        nombreComunidad: comunidadData.nombre,
        descripcionComunidad: comunidadData.descripcion,
        fechaInicioComunidad: comunidadData.fechaInicio,
        usuariosComunidad: comunidadData.usuarios,
        categoriasComunidad: comunidadData.categorias,

        numeroUsuarios: comunidadData.usuarios.length,

        // Causas
        numeroCausasTotales: causasComunidadFiltradas.length,
        tituloCausa: causasTitulo,

        // Acciones
        numeroAccionesTotales: accionesComunidadFiltradas.length,
        tipoMonetario: accionesComunidadFiltradas.filter(
          (accion) => accion.tipo === "monetario"
        ).length,
        tipoVoluntariado: accionesComunidadFiltradas.filter(
          (accion) => accion.tipo === "voluntariado"
        ).length,

        // Solicitudes
        numeroTotalSolicitudes: solicitudesComunidadFiltradas.length,
        numeroSolicitudesPendientes: solicitudesComunidadFiltradas.filter(
          (solicitud) => solicitud.estado === "pendiente"
        ).length,
        numeroSolicitudesAceptadas: solicitudesComunidadFiltradas.filter(
          (solicitud) => solicitud.estado === "aceptada"
        ).length,
        numeroSolicitudesRechazadas: solicitudesComunidadFiltradas.filter(
          (solicitud) => solicitud.estado === "rechazada"
        ).length,

        // Apoyo-Causas
        numeroTotalApoyos: totalApoyos,
      });
      
      return informe;
    } catch (error) {
      console.error("Error al obtener informe comunidad por ID:", error);
      throw error;
    }
  }
}

module.exports = ComunidadesRepository;
