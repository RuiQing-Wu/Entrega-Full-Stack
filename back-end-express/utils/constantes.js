const SERVICE = {
  USER_MODULE: 'user_created',
  COMUNIDAD_MODULE: 'comunidad_created',
  CAUSAS_MODULE: 'causa_created',
  ACCION_MODULE : 'accion_created',
  SOLICITUD_MODULE: 'solicitud_created',
  APOYO_MODULE: 'apoyo_created',
  CONTRIBUCION_MODULE: 'contribucion_created',
}

const API_BACK_NEST = {
  API_COMUNIDADES: "http://localhost:3001/comunidades",
  API_USERS: "http://localhost:3001/users",
  API_CAUSAS: "http://localhost:3001/causas",
  API_ACCIONES: "http://localhost:3001/acciones",
  API_SOLICITUDES: "http://localhost:3001/solicitud",
  API_APOYO_CAUSAS: "http://localhost:3001/apoyo-causa",
}

module.exports = {
  SERVICE,
  API_BACK_NEST,
};
