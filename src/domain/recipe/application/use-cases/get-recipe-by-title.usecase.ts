import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '../repositories/recipe-repository.interface';
import { Either, left, right } from 'src/core/either';
import { Recipe } from '../../enterprise/entities/recipe';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface GetRecipeByTitleUseCaseRequest {
  title: string;
}

type GetRecipeByTitleUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipe: Recipe;
  }
>;

@Injectable()
export class GetRecipeByTitleUseCase {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async execute({
    title,
  }: GetRecipeByTitleUseCaseRequest): Promise<GetRecipeByTitleUseCaseResponse> {
    const recipe = await this.recipesRepository.getRecipeByTitle(title);

    if (!recipe) {
      return left(new ResourceNotFoundError());
    }

    return right({
      recipe,
    });
  }
}
