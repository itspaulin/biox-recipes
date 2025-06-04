import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '../repositories/recipe-repository.interface';
import { Either, left, right } from 'src/core/either';
import { Recipe } from '../../enterprise/entities/recipe';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface GetRecipeByIdUseCaseRequest {
  recipeId: string;
}

type GetRecipeByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipe: Recipe;
  }
>;

@Injectable()
export class GetRecipeByIdUseCase {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async execute({
    recipeId,
  }: GetRecipeByIdUseCaseRequest): Promise<GetRecipeByIdUseCaseResponse> {
    const recipe = await this.recipesRepository.getRecipeById(recipeId);

    if (!recipe) {
      return left(new ResourceNotFoundError());
    }

    return right({
      recipe,
    });
  }
}
