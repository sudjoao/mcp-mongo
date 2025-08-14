import { Request, Response, NextFunction } from 'express';
import { AppError } from './appError';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
}
