const usersRepository = require("../repositories/usersRepository");

class usersController {
  static async userLogin(req, res) {
    try {
      const user = await usersRepository.userLogin(
        req.body.username,
        req.body.password
      );
      return user;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getUserById(res, req, id) {
    try {
      const user = await usersRepository.getUserById(res, req, id);

      return user;
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
    }
  }
}

module.exports = usersController;
