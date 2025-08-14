import express from 'express';
import { userRoutes } from './interface/http/routes/userRoutes';
import { errorMiddleware } from './config/errorMiddleware';
import { UserController } from './interface/http/controllers/UserController';
import { CreateUserUseCase } from './domain/use-cases/CreateUserUseCase';
import { ListUsersUseCase } from './domain/use-cases/ListUsersUseCase';
import { GetUserByIdUseCase } from './domain/use-cases/GetUserByIdUseCase';
import { UpdateUserUseCase } from './domain/use-cases/UpdateUserUseCase';
import { DeleteUserUseCase } from './domain/use-cases/DeleteUserUseCase';
import { UserRepository } from './infrastructure/repository/UserRepository';
import { getUserCollection } from './infrastructure/db/mongoClient';

async function bootstrap() {
  const app = express();
  app.use(express.json());

  const userCollection = await getUserCollection();
  const userRepository = new UserRepository(userCollection);
  const userController = new UserController(
    new CreateUserUseCase(userRepository),
    new ListUsersUseCase(userRepository),
    new GetUserByIdUseCase(userRepository),
    new UpdateUserUseCase(userRepository),
    new DeleteUserUseCase(userRepository)
  );

  app.use(userRoutes(userController));
  app.use(errorMiddleware);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
