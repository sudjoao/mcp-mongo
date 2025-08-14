import { User } from '../entities/User';
import { UserDTO, UserDTOSchema } from '../../application/dtos/UserDTO';
import { UserRepositoryPort } from '../../application/ports/UserRepositoryPort';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(id: string, input: Partial<UserDTO>): Promise<User | null> {
    if (input.nome !== undefined || input.idade !== undefined) {
      const parsed = UserDTOSchema.partial().safeParse(input);
      if (!parsed.success) {
        throw new Error('Validation failed');
      }
      return this.userRepository.update(id, parsed.data);
    }
    return this.userRepository.update(id, input);
  }
}
