import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '../repositories/recipe-repository.interface';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface DeleteRecipeUseCaseRequest {
  id: string;
}

type DeleteRecipeUseCaseResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class DeleteRecipeUseCase {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async execute({
    id,
  }: DeleteRecipeUseCaseRequest): Promise<DeleteRecipeUseCaseResponse> {
    const recipe = await this.recipesRepository.getRecipeById(id);

    if (!recipe) {
      return left(new ResourceNotFoundError());
    }

    await this.recipesRepository.delete(id);

    return right(null);
  }
}
