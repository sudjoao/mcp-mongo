import { DeleteUserUseCase } from '../DeleteUserUseCase';
import { UserRepositoryPort } from '../../../application/ports/UserRepositoryPort';

describe('DeleteUserUseCase', () => {
  const mockRepo: jest.Mocked<UserRepositoryPort> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  it('should delete user by id', async () => {
    const useCase = new DeleteUserUseCase(mockRepo);
    mockRepo.delete.mockResolvedValue(true);
    const result = await useCase.execute('1');
    expect(result).toBe(true);
    expect(mockRepo.delete).toHaveBeenCalledWith('1');
  });

  it('should return false if user not found', async () => {
    const useCase = new DeleteUserUseCase(mockRepo);
    mockRepo.delete.mockResolvedValue(false);
    const result = await useCase.execute('2');
    expect(result).toBe(false);
  });
});
