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

  static async getUserById(res, req, id) {
    try {
      const user = await modelUsers.findById(id).lean();
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = usersRepository;
