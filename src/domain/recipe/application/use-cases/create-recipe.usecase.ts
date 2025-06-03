import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '../repositories/recipe-repository.interface';
import { Either, left, right } from 'src/core/either';
import { Recipe } from '../../enterprise/entities/recipe';
import { RecipeAlreadyExistsError } from './errors/recipe-already-exist-error';

interface CreateRecipeUseCaseRequest {
  title: string;
  description: string;
  ingredients: string[];
}

type CreateRecipeUseCaseResponse = Either<
  RecipeAlreadyExistsError,
  {
    recipe: Recipe;
  }
>;

@Injectable()
export class CreateRecipeUseCase {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async execute({
    title,
    description,
    ingredients,
  }: CreateRecipeUseCaseRequest): Promise<CreateRecipeUseCaseResponse> {
    const recipeAlreadyExists =
      await this.recipesRepository.getRecipeByTitle(title);

    if (recipeAlreadyExists) {
      return left(new RecipeAlreadyExistsError(title));
    }

    const recipe = Recipe.create({
      title,
      description,
      ingredients,
    });

    await this.recipesRepository.create(recipe);

    return right({
      recipe,
    });
  }
}
