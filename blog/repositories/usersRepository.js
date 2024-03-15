const mongoClient = require("../config/mongoClient");
let db = mongoClient.connectMongo();
const modelUsers = require("../models/users");

class usersRepository {
  static async userLogin(username, password) {
    try {
      const user = await modelUsers.findOne({ username, password });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(req) {
    try {
      const user = await modelUsers.findById(req);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = usersRepository;
