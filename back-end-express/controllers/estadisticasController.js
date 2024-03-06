const EstadisticasRepository = require('../repositories/estadisticasRepository');

class EstadisticasController {

    static async getEstadisticasAllComunidades() {
        // ...
        const estadisticas = await EstadisticasRepository.getEstadisticasAllComunidades();
        console.log("estadisticas" + estadisticas);
        return estadisticas;
    }

    async getEstadisticasComunidad(req, res) {
        const { id } = req.params;
        const estadisticas = await EstadisticasRepository.getEstadisticas(id);
        res.json(estadisticas);
    }
}

module.exports = EstadisticasController;