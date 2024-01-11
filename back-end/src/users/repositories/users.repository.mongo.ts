import { HydratedDocument, Model } from 'mongoose';
import { UserMongoModel } from '../schemas/user.schema';
import { UsersRepository } from './users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../domain/user.domain';

export class UsersRepositoryMongo implements UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserMongoModel>,
  ) {

  }

  private toUserDomain(userMongo: HydratedDocument<UserMongoModel>): User {
    if (userMongo) {
      const user = new User({
        id: userMongo._id.toString(),
        username: userMongo.username,
        password: userMongo.password,
        nombre: userMongo.nombre,
        telefono: userMongo.telefono,
        ciudad: userMongo.ciudad,
        pais: userMongo.pais,
        role: userMongo.role,
      });

      return user;
    }
  }

  async create(item: User): Promise<User> {
    const createdUserMongo = await this.userModel.create(item); // modelo mongo

    const newUser = new User({
      ...item,
      id: createdUserMongo._id.toString(), // obtenido tras la inserción
    });
    // se factoriza para las siguientes operaciones

    return newUser;
  }

  async get(id: string): Promise<User> {
    const userMongo = await this.userModel.findById(id).exec();
    return this.toUserDomain(userMongo);
  }

  getAll(): Promise<User[]> {
    const usersMongo = this.userModel.find().exec();
    return usersMongo.then((users) => users.map((user) => this.toUserDomain(user)));
  }

  async update(id: string, item: User): Promise<User> {
    const updatedUserMongo = await this.userModel
      .findOneAndUpdate({ _id: id }, item, { new: true }) // Aquí va el filtro y los datos a actualizar
      .exec();

    if (!updatedUserMongo) {
      throw new Error('Usuario no encontrado'); // Manejo si el usuario no existe
    }

    const updateUser = new User({
      ...item,
      id: updatedUserMongo._id.toString(),
    });

    return updateUser;
  }

  delete(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async getByName(name: string): Promise<User> {
    const userMongo = await this.userModel.findOne({ username: name }).exec();
    return this.toUserDomain(userMongo);
  }
}
