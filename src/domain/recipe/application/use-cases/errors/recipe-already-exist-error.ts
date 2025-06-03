import { UseCaseError } from '@/core/errors/use-case-error';

export class RecipeAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Recipe "${identifier}" already exists.`);
  }
}
