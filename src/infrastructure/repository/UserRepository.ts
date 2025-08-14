import { User } from '../../domain/entities/User';
import { UserDTO } from '../../application/dtos/UserDTO';
import { UserRepositoryPort } from '../../application/ports/UserRepositoryPort';
import { Collection, ObjectId, Document } from 'mongodb';

export class UserRepository implements UserRepositoryPort {
  constructor(private readonly collection: Collection<Document>) {}

  async create(user: UserDTO): Promise<User> {
    const result = await this.collection.insertOne(user);
    return { _id: result.insertedId.toString(), ...user };
  }

  async findAll(
    filter: Partial<UserDTO> = {},
    page = 1,
    limit = 10,
  ): Promise<User[]> {
    const skip = (page - 1) * limit;
    const users = await this.collection
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();
    return users.map((u: Document) => ({
      _id: u._id?.toString(),
      nome: u.nome,
      idade: u.idade,
    }));
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.collection.findOne({ _id: new ObjectId(id) });
    return user
      ? {
          _id: user._id?.toString(),
          nome: user.nome,
          idade: user.idade,
        }
      : null;
  }

  async update(id: string, user: Partial<UserDTO>): Promise<User | null> {
    await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: user });
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
