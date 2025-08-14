import { User } from '../entities/User';
import { UserRepositoryPort } from '../../application/ports/UserRepositoryPort';

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(
    filter: Partial<User> = {},
    page = 1,
    limit = 10,
  ): Promise<User[]> {
    return this.userRepository.findAll(filter, page, limit);
  }
}
