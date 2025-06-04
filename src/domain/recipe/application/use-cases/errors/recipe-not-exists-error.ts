import { UseCaseError } from '@/core/errors/use-case-error';

export class RecipeNotExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Recipe "${identifier}" not exists.`);
  }
}
