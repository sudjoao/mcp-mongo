import { Request, Response, NextFunction } from 'express';
import { CreateUserUseCase } from '../../../domain/use-cases/CreateUserUseCase';
import { ListUsersUseCase } from '../../../domain/use-cases/ListUsersUseCase';
import { GetUserByIdUseCase } from '../../../domain/use-cases/GetUserByIdUseCase';
import { UpdateUserUseCase } from '../../../domain/use-cases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../../domain/use-cases/DeleteUserUseCase';

export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.createUser.execute(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, ...filter } = req.query;
      const users = await this.listUsers.execute(
        filter,
        Number(page),
        Number(limit),
      );
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.getUserById.execute(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.updateUser.execute(req.params.id, req.body);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const success = await this.deleteUser.execute(req.params.id);
      if (!success) return res.status(404).json({ error: 'User not found' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
