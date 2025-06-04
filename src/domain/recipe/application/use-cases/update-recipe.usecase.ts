import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '../repositories/recipe-repository.interface';
import { Either, left, right } from '@/core/either';
import { Recipe } from '../../enterprise/entities/recipe';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface UpdateRecipeUseCaseRequest {
  id: string;
  title?: string;
  description?: string;
  ingredients?: string[];
}

type UpdateRecipeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipe: Recipe;
  }
>;

@Injectable()
export class UpdateRecipeUseCase {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async execute({
    id,
    title,
    description,
    ingredients,
  }: UpdateRecipeUseCaseRequest): Promise<UpdateRecipeUseCaseResponse> {
    const recipe = await this.recipesRepository.getRecipeById(id);

    if (!recipe) {
      return left(new ResourceNotFoundError());
    }

    if (title) recipe.title = title;
    if (description) recipe.description = description;
    if (ingredients) recipe.ingredients = ingredients;

    await this.recipesRepository.update(recipe);

    return right({ recipe });
  }
}
