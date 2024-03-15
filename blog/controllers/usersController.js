const usersRepository = require("../repositories/usersRepository");

class loginController {
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

  static async getUserById(req, res) {
    try {
      const user = await usersRepository.getUserById(req);
      return user;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = loginController;
