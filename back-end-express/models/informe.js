class Informe {
    constructor({
        idAdministrador,
        usernameAdministrador,

        idComunidad,
        nombreComunidad,
        descripcionComunidad,
        fechaInicioComunidad,
        usuariosComunidad,
        categoriasComunidad,

        // Usuarios
        numeroUsuarios,

        // Causas
        numeroCausasTotales,
        tituloCausa,

        // Acciones
        numeroAccionesTotales,
        tipoMonetario,
        tipoVoluntariado,

        // Solicitudes
        numeroTotalSolicitudes,
        numeroSolicitudesPendientes,
        numeroSolicitudesAceptadas,
        numeroSolicitudesRechazadas,

        // Apoyo-Causas
        numeroTotalApoyos,
    }) {
        this.idAdministrador = idAdministrador;
        this.usernameAdministrador = usernameAdministrador;
        this.idComunidad = idComunidad;
        this.nombreComunidad = nombreComunidad;
        this.descripcionComunidad = descripcionComunidad;
        this.fechaInicioComunidad = fechaInicioComunidad;
        this.usuariosComunidad = usuariosComunidad;
        this.categoriasComunidad = categoriasComunidad;
        this.numeroUsuarios = numeroUsuarios;
        this.numeroCausasTotales = numeroCausasTotales;
        this.tituloCausa = tituloCausa;
        this.numeroAccionesTotales = numeroAccionesTotales;
        this.tipoMonetario = tipoMonetario;
        this.tipoVoluntariado = tipoVoluntariado;
        this.numeroTotalSolicitudes = numeroTotalSolicitudes;
        this.numeroSolicitudesPendientes = numeroSolicitudesPendientes;
        this.numeroSolicitudesAceptadas = numeroSolicitudesAceptadas;
        this.numeroSolicitudesRechazadas = numeroSolicitudesRechazadas;
        this.numeroTotalApoyos = numeroTotalApoyos;
    }
}

module.exports = Informe;