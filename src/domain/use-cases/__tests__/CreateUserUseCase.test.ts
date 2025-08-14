import { UserDTO } from '../../../application/dtos/UserDTO';
import { UserRepositoryPort } from '../../../application/ports/UserRepositoryPort';
import { CreateUserUseCase } from '../CreateUserUseCase';

describe('CreateUserUseCase', () => {
  const mockRepo: jest.Mocked<UserRepositoryPort> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  it('should create a user with valid data', async () => {
    const useCase = new CreateUserUseCase(mockRepo);
    const input: UserDTO = { nome: 'John', idade: 30 };
    mockRepo.create.mockResolvedValue({ _id: '1', ...input });
    const result = await useCase.execute(input);
    expect(result).toEqual({ _id: '1', ...input });
    expect(mockRepo.create).toHaveBeenCalledWith(input);
  });

  it('should throw error for invalid data', async () => {
    const useCase = new CreateUserUseCase(mockRepo);
    await expect(useCase.execute({ nome: '', idade: -1 })).rejects.toThrow('Validation failed');
  });
});
