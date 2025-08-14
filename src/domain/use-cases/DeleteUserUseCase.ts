import { UserRepositoryPort } from '../../application/ports/UserRepositoryPort';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
