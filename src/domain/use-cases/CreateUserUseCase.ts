import { User } from '../entities/User';
import { UserDTO, UserDTOSchema } from '../../application/dtos/UserDTO';
import { UserRepositoryPort } from '../../application/ports/UserRepositoryPort';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(input: UserDTO): Promise<User> {
    const parsed = UserDTOSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error('Validation failed');
    }
    return this.userRepository.create(parsed.data);
  }
}
