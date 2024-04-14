const InformesRepository = require("../repositories/informesRespository");

class InformesController {
    static async getAllComunidades() {
        const comunidades = await InformesRepository.getAllComunidades();
        return comunidades;
    }

    static async getInfoComunidad(id) {
        const comunidad = await InformesRepository.getInfoComunidad(id);
        return comunidad;
    }
} 

module.exports = InformesController;