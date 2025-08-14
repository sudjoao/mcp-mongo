import { User } from '../entities/User';
import { UserRepositoryPort } from '../../application/ports/UserRepositoryPort';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
