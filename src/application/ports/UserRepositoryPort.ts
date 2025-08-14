import { User } from '../../domain/entities/User';
import { UserDTO } from '../dtos/UserDTO';

export interface UserRepositoryPort {
  create(user: UserDTO): Promise<User>;
  findAll(
    filter?: Partial<UserDTO>,
    page?: number,
    limit?: number,
  ): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<UserDTO>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
