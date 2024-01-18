import { HydratedDocument, Model } from 'mongoose';
import { UserMongoModel } from '../schemas/user.schema';
import { UsersRepository } from './users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../domain/user.domain';
import { RepositoryError } from 'src/base/repositoryError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

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
    try {
      const createdUserMongo = await this.userModel.create(item); // modelo mongo

      const newUser = new User({
        ...item,
        id: createdUserMongo._id.toString(), // obtenido tras la inserción
      });
      // se factoriza para las siguientes operaciones

      return newUser;
    } catch (error) {
      throw new RepositoryError('Error al crear el usuario');
    }
  }

  async get(id: string): Promise<User> {
    try {
      const userMongo = await this.userModel.findById(id).exec();

      if (userMongo === null) {
        throw new EntityNotFoundError('Usuario no encontrado con id ' + id);
      }

      return this.toUserDomain(userMongo);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError('Error al obtener el usuario con id ' + id);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const usersMongo = await this.userModel.find().exec();

      const users = usersMongo.map((userMongo) => {
        return this.toUserDomain(userMongo);
      });

      return users;
    } catch (error) {
      throw new RepositoryError('Error al obtener los usuarios');
    }
  }

  async update(id: string, item: User): Promise<User> {
    try {
      // TODOD QUE ES ESTE PARAMETRO NEW
      const updatedUserMongo = await this.userModel
        .findOneAndUpdate({ _id: id }, item, { new: true }) // Aquí va el filtro y los datos a actualizar
        .exec();

      const updateUser = new User({
        ...item,
        id: updatedUserMongo._id.toString(),
      });

      return updateUser;
    } catch (error) {
      throw new RepositoryError('Error al actualizar el usuario con id ' + id);
    }
  }

  async delete(id: string): Promise<User> {
    const user = await this.get(id);

    try {
      if (user) {
        await this.userModel.findByIdAndDelete(id).exec();
        return user;
      }
    } catch (error) {
      throw new RepositoryError('Error al eliminar el usuario con id ' + id);
    }
  }

  async getByName(name: string): Promise<User> {
    try {
      const userMongo = await this.userModel.findOne({ username: name }).exec();

      if (userMongo === null) {
        throw new EntityNotFoundError('Usuario no encontrado con nombre ' + name);
      }

      return this.toUserDomain(userMongo);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError('Error al obtener el usuario con nombre ' + name);
    }
  }
}
