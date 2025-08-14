import { UpdateUserUseCase } from '../UpdateUserUseCase';
import { UserRepositoryPort } from '../../../application/ports/UserRepositoryPort';
import { User } from '../../entities/User';

describe('UpdateUserUseCase', () => {
  const mockRepo: jest.Mocked<UserRepositoryPort> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  it('should update user with valid data', async () => {
    const useCase = new UpdateUserUseCase(mockRepo);
    const user: User = { _id: '1', nome: 'John', idade: 31 };
    mockRepo.update.mockResolvedValue(user);
    const result = await useCase.execute('1', { nome: 'John', idade: 31 });
    expect(result).toEqual(user);
    expect(mockRepo.update).toHaveBeenCalledWith('1', { nome: 'John', idade: 31 });
  });

  it('should throw error for invalid data', async () => {
    const useCase = new UpdateUserUseCase(mockRepo);
    await expect(useCase.execute('1', { nome: '', idade: -1 })).rejects.toThrow('Validation failed');
  });
});
