import { ListUsersUseCase } from '../ListUsersUseCase';
import { UserRepositoryPort } from '../../../application/ports/UserRepositoryPort';
import { User } from '../../entities/User';

describe('ListUsersUseCase', () => {
  const mockRepo: jest.Mocked<UserRepositoryPort> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  it('should list users', async () => {
    const useCase = new ListUsersUseCase(mockRepo);
    const users: User[] = [
      { _id: '1', nome: 'John', idade: 30 },
      { _id: '2', nome: 'Jane', idade: 25 },
    ];
    mockRepo.findAll.mockResolvedValue(users);
    const result = await useCase.execute({}, 1, 10);
    expect(result).toEqual(users);
    expect(mockRepo.findAll).toHaveBeenCalledWith({}, 1, 10);
  });
});
