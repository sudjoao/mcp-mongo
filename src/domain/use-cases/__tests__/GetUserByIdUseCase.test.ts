import { GetUserByIdUseCase } from '../GetUserByIdUseCase';
import { UserRepositoryPort } from '../../../application/ports/UserRepositoryPort';
import { User } from '../../entities/User';

describe('GetUserByIdUseCase', () => {
  const mockRepo: jest.Mocked<UserRepositoryPort> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  it('should return user by id', async () => {
    const useCase = new GetUserByIdUseCase(mockRepo);
    const user: User = { _id: '1', nome: 'John', idade: 30 };
    mockRepo.findById.mockResolvedValue(user);
    const result = await useCase.execute('1');
    expect(result).toEqual(user);
    expect(mockRepo.findById).toHaveBeenCalledWith('1');
  });

  it('should return null if user not found', async () => {
    const useCase = new GetUserByIdUseCase(mockRepo);
    mockRepo.findById.mockResolvedValue(null);
    const result = await useCase.execute('2');
    expect(result).toBeNull();
  });
});
