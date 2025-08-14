import { z } from 'zod';

export const UserDTOSchema = z.object({
  nome: z.string().min(1),
  idade: z.number().int().nonnegative(),
});

export type UserDTO = z.infer<typeof UserDTOSchema>;
